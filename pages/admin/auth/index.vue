<template>
  <div class="admin-auth page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <AppControlInput type="email" v-model="form.email">E-Mail Address</AppControlInput>
        <AppControlInput type="password" v-model="form.password">Password</AppControlInput>
        <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
        <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "index",
  layout: 'admin',
  data() {
    return {
      isLogin: false,
      form: {
        email: 'hiram@email.com',
        password: 'password',
        returnSecureToken: true,
      }
    }
  },
  methods: {
    async onSubmit() {
      const response = await this.$store.dispatch('authenticateUser', {...this.form, isLogin: this.isLogin});
      console.log(response);
      await this.$router.push('/admin');
    }
  }
}
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
