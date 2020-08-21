<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts"/>
    <!--<PostList :posts="this.$store.getters.loadedPosts"/>-->
  </div>
</template>

<script>

import PostList from "~/components/Posts/PostList";

export default {
  name: "index",
  components: {PostList},
  /*asyncData(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          loadedPosts: [
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
          ],
        });
        //reject(new Error());
      }, 500)
    }).then(data => {
      return data;
    }).catch(e => {
      context.error(e);
    });
  },*/
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  }
  // created() {
  //   this.$store.dispatch('setPosts', this.loadedPosts);
  // }
}
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
