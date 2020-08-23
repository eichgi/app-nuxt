<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>
    <AppControlInput control-type="textarea" v-model="editedPost.previewText">Preview</AppControlInput>
    <AppControlInput control-type="textarea" v-model="editedPost.content">Content</AppControlInput>
    <AppButton type="submit">Save</AppButton>
    <AppButton type="button" style="margin-left: 10px" btn-style="cancel" @click="onCancel">Cancel</AppButton>
  </form>
</template>

<script>

export default {
  name: "AdminPostForm",
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
