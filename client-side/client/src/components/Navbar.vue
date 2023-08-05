<script>
import { mapState, mapActions } from 'pinia'
import { useTravelStore } from '../stores/travel'
export default {
  name: 'Navbar',
  methods: {
    ...mapActions(useTravelStore, ['logout','subscribe'])
  },
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="">Traveling</a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" @click.prevent="$router.push('/')" href="#">Destination</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="$router.push('/favorite')" href="">Favorite</a>
          </li>
          <li class="nav-item">
            <a @click.prevent="subscribe" class="nav-link" href="">Subkrep</a>
          </li>
        </ul>
        <li style="color: red;" class="d-flex">
          <a class="nav-link" @click.prevent="logout" href=""><i class="bi bi-box-arrow-right"></i></a>
        </li>
      </div>
    </div>
  </nav>
</template>

<style>
  
</style>