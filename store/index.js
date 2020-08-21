import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
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
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxtapp-e69a7.firebaseio.com/posts.json')
          .then(res => {
            console.log(res.data);
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
          const response = await axios.post('https://nuxtapp-e69a7.firebaseio.com/posts.json', createdPost);
          console.log(response);
          await vuexContext.commit('addPost', {...createdPost, id: response.data.name});
          return response;
        } catch (error) {
          console.log(error);
        }
      },
      editPost(vuexContext, post) {
        return axios.put('https://nuxtapp-e69a7.firebaseio.com/posts/' + post.id + '.json', post)
          .then(res => {
            console.log(res);
            vuexContext.commit('editPost', post);
          }).catch(e => {
          console.log(e);
        });
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    },
  });
}

export default createStore;
