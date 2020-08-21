<template>
  <form @submit.prevent="onSave">
    <AppInputControl v-model="editedPost.author">Author Name</AppInputControl>
    <AppInputControl v-model="editedPost.title">Title</AppInputControl>
    <AppInputControl v-model="editedPost.thumbnail">Thumbnail Link</AppInputControl>
    <AppInputControl control-type="textarea" v-model="editedPost.previewText">Preview</AppInputControl>
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
        author: 'Hiram X',
        title: 'Title X',
        thumbnail: 'https://placeimg.com/640/480/any',
        content: 'lorem ipsum......',
        previewText: 'preview!',
      },
    }
  },
  methods: {
    onSave() {
      //Save the post
      this.$emit('submit', this.editedPost);
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
