import Vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => editedPost.id === post.id);
        state.loadedPosts[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxtapp-e69a7.firebaseio.com/posts.json')
          .then(res => {
            const posts = [];
            for (const key in res.data) {
              posts.push({...res.data[key], id: key});
            }
            vuexContext.commit('setPosts', posts);
          }).catch(e => context.error(e));
        /*return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexContext.commit('setPosts', [
                {
                  id: '1',
                  title: 'Awesome Pozt!',
                  previewText: 'lorem ipsum....',
                  thumbnail: 'https://placeimg.com/640/480/tech',
                },
                {
                  id: '2',
                  title: 'Zwitte Pozt!',
                  previewText: 'lorem ipsum....',
                  thumbnail: 'https://placeimg.com/640/480/tech',
                }
              ]);
            resolve();
          }, 500);
        });*/
      },
      setPosts(context, posts) {
        context.commit('setPosts', posts);
      },
      async addPost(vuexContext, postData) {
        const createdPost = {
          ...postData,
          updatedDate: new Date(),
        };

        try {
          console.log("TOKEN: ", vuexContext.state);
          const response = await axios.post('https://nuxtapp-e69a7.firebaseio.com/posts.json?auth=' + vuexContext.state.token, createdPost);
          await vuexContext.commit('addPost', {...createdPost, id: response.data.name});
          return response;
        } catch (error) {
          console.log(error);
        }
      },
      editPost(vuexContext, post) {
        return axios.put('https://nuxtapp-e69a7.firebaseio.com/posts/' + post.id + '.json?auth=' + vuexContext.state.token, post)
          .then(res => {
            vuexContext.commit('editPost', post);
          }).catch(e => {
            console.log(e);
          });
      },
      async authenticateUser(vuexContext, authData) {
        let authUrl = '';

        if (!authData.isLogin) {
          authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbAPIKey;
        } else {
          authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbAPIKey;
        }

        try {
          const response = await axios.post(authUrl, authData);
          const {idToken, expiresIn} = response.data;
          console.log(response);
          await vuexContext.commit('setToken', response.data.idToken);

          localStorage.setItem('token', response.data.idToken);
          localStorage.setItem('tokenExpiration', new Date().getTime() + +response.data.expiresIn * 1000);
          Cookie.set('jwt', idToken);
          Cookie.set('expirationDate', new Date().getTime() + +expiresIn * 1000)

          await axios.post('http://localhost:3000/api/track-data', {data: 'Authenticated'});
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      initAuth(vuexContext, req) {

        let token, expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }

          const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));

          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split('=')[1];
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1];

        } else {
          token = localStorage.getItem('token');
          expirationDate = localStorage.getItem('tokenExpiration');
        }

        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token');
          vuexContext.dispatch('logout');
          return;
        }

        vuexContext.commit('setToken', token);
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken');
        Cookie.remove('jwt');
        Cookie.remove('expirationDate');
        if (process.client) {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    },
  });
}

export default createStore;
