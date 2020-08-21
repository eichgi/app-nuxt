<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">Last updated on {{ loadedPost.updatedDate }}</div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid eum iure nostrum quis, quisquam quos ullam!
        Accusamus beatae consectetur hic id ipsa ipsum iusto nam omnis optio veritatis. Dignissimos, nulla! <a
          href="#">Send me an email!</a></p>
    </section>
  </div>
</template>

<script>
export default {
  name: "index",
  asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
        loadedPost: {
          id: '1',
          title: 'Awesome Pozt! (ID: ' + context.params.id + ')',
          previewText: 'lorem ipsum....',
          author: 'User X',
          updatedDate: new Date(),
          content: 'lorem ipsum looooooooooong',
          thumbnail: 'https://placeimg.com/640/480/tech',
        },
      });
    }, 1000);
  }
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
