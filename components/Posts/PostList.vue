<template>
  <section class="post-list">
    <PostPreview id="1"
                 :is-admin="isAdmin"
                 title="¿Donde están perros?"
                 thumbnail="https://placeimg.com/640/480/tech"
                 preview-text="First post"/>
    <PostPreview id="1"
                 :is-admin="isAdmin"
                 title="¿Donde están perros?"
                 thumbnail="https://placeimg.com/640/480/tech"
                 preview-text="First post"/>
  </section>
</template>

<script>
import PostPreview from "~/components/Posts/PostPreview";

export default {
  name: "PostList",
  components: {PostPreview},
  props: {
    isAdmin: Boolean,
    default: false,
  }
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
