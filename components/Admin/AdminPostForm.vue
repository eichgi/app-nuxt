<template>
  <form @submit.prevent="onSave">
    <AppInputControl v-model="editedPost.author">Author Name</AppInputControl>
    <AppInputControl v-model="editedPost.title">Title</AppInputControl>
    <AppInputControl v-model="editedPost.thumbnailLink">Thumbnail Link</AppInputControl>
    <AppInputControl control-type="textarea" v-model="editedPost.content">Content</AppInputControl>
    <AppButton type="submit">Save</AppButton>
    <AppButton type="button" style="margin-left: 10px" btn-style="cancel" @click="onCancel">Cancel</AppButton>
  </form>
</template>

<script>
import AppInputControl from "~/components/UI/AppControlInput";
import AppButton from "~/components/UI/AppButton";

export default {
  name: "AdminPostForm",
  components: {AppButton, AppInputControl},
  props: {
    post: {
      type: Object,
      required: false,
    }
  },
  data() {
    return {
      editedPost: this.post ? {...this.post} : {
        author: '',
        title: '',
        thumbnailLink: '',
        content: '',
      },
    }
  },
  methods: {
    onSave() {
      //Save the post
    },
    onCancel() {
      //Go back
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped>

</style>
