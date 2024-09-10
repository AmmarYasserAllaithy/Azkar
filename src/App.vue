<template>
  <section class="container">
    <Header :isSabah="isMorning" />

    <Controller @search="search" />

    <div class="progress-wrapper" v-if="progress > 0">
      <p class="progress" :style="{ width: progress + '%' }"></p>
    </div>

    <section class="azkar">
      <Zekr v-for="zekr in azkar" :key="zekr.id" :zekr="zekr" @read="read" :isMorning="isMorning" />
    </section>

    <Footer />

    <Alert v-if="progress == 100" :isSabah="isMorning" class="alert" />
  </section>
</template>


<script lang="ts">
import Header from "./components/Header";
import Controller from "./components/Controller";
import Zekr from "./components/Zekr";
import Footer from "./components/Footer";

import Alert from "./views/Alert";

import azkarDb from "/res/azkar.db.json";

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
      this.azkar = regex == "" ?
        this.data :
        this.data.filter(({ body, count, virtue, reference }) =>
          body.satisfy(regex) ||
          count.toString().satisfy(regex) ||
          (virtue && virtue.satisfy(regex)) ||
          (reference && reference.satisfy(regex))
        )

      this.updateProgress;
    },
  },

  computed: {
    isMorning() {
      let h = new Date().getHours();
      return h >= 4 && h <= 16
    },
  },

  watch: {
    readAzkar(list) {
      this.progress = (list.length / this.data.length) * 100;
    },
  },

  created() {
    this.data = azkarDb
      .filter((zekr) => this.isMorning ? zekr.viewOrderInMorning : zekr.viewOrderInEvening)
      .sort((z1, z2) => this.isMorning ? z1.viewOrderInMorning - z2.viewOrderInMorning : z1.viewOrderInEvening - z2.viewOrderInEvening)
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
  z-index: 9;
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
