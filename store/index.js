import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
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
        });
      },
      setPosts(context, posts) {
        context.commit('setPosts', posts);
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
