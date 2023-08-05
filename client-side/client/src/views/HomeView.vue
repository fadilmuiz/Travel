<script>
import { mapState, mapActions } from 'pinia'
import { useTravelStore } from '../stores/travel'
import Navbar from '../components/Navbar.vue'
export default {
  name: 'HomeView',
  methods: {
    ...mapActions(useTravelStore, ['readTravel', 'handleAddFavorite'])
  },
  created() {
    this.readTravel()
  },
  computed: {
    ...mapState(useTravelStore, ["travel"])
  },
  components: {
    Navbar
  }

}
</script>
<template>
  <Navbar />
  <div style="background-color: aliceblue;">
    <div
      style="background-image: url('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');background-size: cover;"
      class="p-4 p-md-5 mb-4 text-body-emphasis bg-body-secondary">
      <div class="col-lg-6 px-0">
        <h1 style="color: azure;" class="display-4 fst-italic">Travel and Healing</h1>
        <p style="color: azure;" class="lead my-3">Forgiveness: Release any grudges or resentments, as forgiveness brings
          inner peace and healing to both the giver and receiver. Love: Embrace love and spread it to others. Love has the
          power to heal and unite.</p>
        <p class="lead mb-0"><a href="#" class="text-body-emphasis fw-bold">Continue your search...</a></p>
      </div>
    </div>
    <div style="margin-top: 100px;" class="container">
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <div v-for="el in travel" :key="el.id" class="col">
          <div class="card" style="height: 420px; cursor: pointer;">
            <img style="height: 270px;" :src="el.mainPhotoSrc" class="card-img-top" alt=""/>
            <div style="height: auto;" class="card-body">
              <h5 style="margin-top: 5px;" class="card-title"> <i class="bi bi-pin-fill"></i>..{{ el.name }}</h5>
              <p class="card-text">{{ el.address.street }} {{ el.address.locality }}</p>
              <a @click.prevent="handleAddFavorite(el.id, el.name, el.mainPhotoSrc, el.address.street, el.address.locality, )" href="#" class="btn btn-outline-primary"><i class="bi bi-bookmark"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
