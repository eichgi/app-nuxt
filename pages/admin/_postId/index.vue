<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from "~/components/Admin/AdminPostForm";
import axios from 'axios';

export default {
  name: "index",
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {AdminPostForm},
  asyncData(context) {
    return axios.get('https://nuxtapp-e69a7.firebaseio.com/posts/' + context.params.postId + '.json')
      .then(res => {
        console.log(res);
        return {
          loadedPost: {...res.data, id: context.params.postId},
        }
      }).catch(e => context.error(e));
  },
  methods: {
    onSubmitted(editedPost) {
      console.log(editedPost)
      this.$store.dispatch('editPost', editedPost)
        .then(res => {
          this.$router.push('/admin');
        });
    }
  }
  /*data() {
    return {
      loadedPost: {
        author: 'Hiram',
        title: 'My Post X',
        content: 'lorem ipsum...',
        thumbnailLink: 'https://placeimg.com/640/480/tech',
      }
    }
  },*/
}
</script>

<style scoped>

</style>
