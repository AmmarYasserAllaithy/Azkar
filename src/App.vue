<template>
  <section class="container">
    <Header :isSabah="isSabah" />

    <Controller @search="search" />

    <div class="progress-wrapper" v-if="progress > 0">
      <p class="progress" :style="{ width: progress + '%' }"></p>
    </div>

    <section class="azkar">
      <Zekr v-for="zekr in azkar" :key="zekr.id" :zekr="zekr" @read="read" />
    </section>

    <Footer />

    <Alert v-if="progress == 100" :isSabah="isSabah" class="alert" />
  </section>
</template>

<script lang="ts">
import Header from "./components/Header";
import Controller from "./components/Controller";
import Zekr from "./components/Zekr";
import Footer from "./components/Footer";

import Alert from "./views/Alert";

import azkarData from "/res/azkar.json";

export default {
  name: "App",

  components: {
    Header,
    Controller,
    Zekr,
    Footer,
    Alert,
  },

  data() {
    return {
      data: [],
      azkar: [],
      readAzkar: [],
      progress: 0,
    };
  },

  methods: {
    read(id) {
      if (!this.readAzkar.includes(id)) {
        this.readAzkar.push(id);
        navigator.vibrate(150);
      }
    },

    search(regex) {
      this.azkar =
        regex == ""
          ? this.data
          : this.data.filter(
            ({ zekr, reference, description, count }) =>
              zekr.satisfy(regex) ||
              count.toString().satisfy(regex) ||
              (reference && reference.satisfy(regex)) ||
              (description && description.satisfy(regex))
          );

      this.updateProgress;
    },
  },

  computed: {
    isSabah() {
      let h = new Date().getHours();
      return h >= 5 && h <= 15;
    },
  },

  watch: {
    readAzkar(list) {
      this.progress = (list.length / this.data.length) * 100;
    },
  },

  created() {
    this.data = azkarData.azkar
      .filter((zekr) => zekr.sabah == this.isSabah)
      .sort((z1, z2) => z1.viewOrder - z2.viewOrder);
    this.azkar = this.data;
  },
};
</script>

<style type="text/css" media="all" scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
@import "/res/style/base.css";

.container {
  text-align: center;
  padding: 0 1rem;
}

.progress-wrapper {
  margin: 1rem .3rem;
  height: 1.4rem;
  border-radius: var(--headerRadius);
  color: var(--textColor);
  background: var(--zekrBgColor);
  box-shadow: 1px 1px 10px var(--shadowColor);

  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 999;
}

.progress {
  position: absolute;
  border-radius: inherit;
  top: .2rem;
  right: .2rem;
  bottom: .2rem;


  transition: 1s linear;
  background: var(--progressColor);
  opacity: .25;
  height: 1rem;
}

.alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  z-index: 10;
  background: var(--shadowColor);
}

.azkar {
  margin: 1rem auto;
}

@media screen and (min-width: 768px) {
  .azkar {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
  }

  .azkar>* {
    flex-basis: 350px;
    flex-grow: 1;
  }
}
</style>
