<template>
  <div class="admin-new-post-page">
    <div class="new-post-form">
      <AdminPostForm @submit="onSubmitted"/>
    </div>
  </div>
</template>

<script>
import AdminPostForm from "~/components/Admin/AdminPostForm";
import axios from 'axios';

export default {
  name: "index",
  layout: 'admin',
  components: {AdminPostForm},
  data() {
    return {}
  },
  methods: {
    async onSubmitted(postData) {
      await this.$store.dispatch('addPost', postData);
      await this.$router.push('/admin');
    },
  }
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
