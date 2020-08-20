<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from "~/components/Admin/AdminPostForm";

export default {
  name: "index",
  layout: 'admin',
  components: {AdminPostForm},
  data() {
    return {
      loadedPost: {
        author: 'Hiram',
        title: 'My Post X',
        content: 'lorem ipsum...',
        thumbnailLink: 'https://placeimg.com/640/480/tech',
      }
    }
  },
}
</script>

<style scoped>

</style>
