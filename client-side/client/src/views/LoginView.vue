<script>
import { mapState, mapActions } from 'pinia'
import { useTravelStore } from '../stores/travel'
export default {
  name: 'LoginView',
  data() {
        return {
            form: {
                email:'',
                password:''
            }
        }
    },
    methods: {
        ...mapActions(useTravelStore,['handleLogin', 'handleGithub']),
        login() {
            this.handleLogin(this.form.email, this.form.password)
        }
    }
}
</script>

<template>
    <div class="d-flex justify-content-sm-center d-flex align-items-center" style="background-image: url('https://images.unsplash.com/photo-1515268064940-5150b7c29f35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'); height: 100vh; background-size: cover;" >
        <form @submit.prevent="login(form.email, form.password)">
            <div class="mb-3">
                <label class="form-label">Email address</label>
                <input v-model="form.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-dark">LOGIN</button>
            <button style="margin-left: 6px;" @click.prevent="handleGithub" type="submit" class="btn btn-dark"><i class="bi bi-github"></i></button>
            <p style="margin-top: 2px;">Create an account here,
                <a @click.prevent="$router.push('/register')" style="text-decoration: none; color: red;" href=""> register!</a></p>
            </form>
        </div>
        
</template>