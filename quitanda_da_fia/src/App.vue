<template>
  <div id="app">
    <Header/>
    <div id="main_content">
        <a href="https://wa.me/+5561998468405" target="_blank">
          <img id="whatsapp_icon" src="/img/whatsapp.png" alt="Entre em contato pelo nosso WhatsApp: (61) 99846-8405">
        </a>
        <router-view></router-view>
    </div>
    <Footer/>
    <ProductModalVue v-if="showModal" @close="showModal = false"/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from './components/Footer.vue';
import ProductModalVue from './components/ProductModal.vue';

export default {
  name: "App",
  data() {
    return {
      showModal: false // Variável para controlar a visibilidade do modal
    }
  },
  components: {
    Header,
    Footer,
    ProductModalVue
  },
  methods: {
    openProductModal() {
      this.showModal = true;
    }
  }
}
</script>

<style>
@import url('https://fonts.cdnfonts.com/css/rawline');

p, h1, h2, h3 {
  font-family: 'Rawline', sans-serif;                                              
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #ffffff;
  position: relative;
}

#main_content {
  max-width: 1400px;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  z-index: 1;
}

Header, Footer {
  z-index: 2;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

#whatsapp_icon {
  position: fixed;
  bottom: 1em;
  right: 0.6em;
  width: 3em;
  height: 3em;
  z-index: 999;
  cursor: pointer;
}

#whatsapp_icon:hover {
  opacity: 0.5;
}

html {
  scroll-behavior: smooth;
}
</style>
