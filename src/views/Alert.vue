<template>
  <section class="container" :class="{ hide: hide }">
    <section class="alert">

      <h2>
        <i class="fa fa-3x fa-check-circle"></i>
      </h2>

      <h2> أحــســنــت </h2>

      <h3>
        لقد اكملت أذكار
        {{ currentCategory }}
        <i class="fa fa-hands-clapping"></i>
      </h3>

      <p>
        نراك في
        {{ otherCategory }}
        <i class="fa fa-hand-peace"></i>
      </p>

      <span class="close" @click="hideAlert">
        <i class="fa fa-lg fa-xmark"></i>
      </span>

    </section>
  </section>
</template>


<script lang="ts">
export default {
  name: 'Alert',

  props: {
    isSabah: Boolean,
  },

  data() {
    return {
      alsabah: 'الصباح',
      almasaa: 'المساء',
      hide: false,
    }
  },

  methods: {
    calcCategory(cur) {
      return !(this.isSabah ^ cur) ? this.alsabah : this.almasaa
    },

    hideAlert() {
      this.hide = true
    },
  },

  computed: {
    currentCategory() {
      return this.calcCategory(true)
    },

    otherCategory() {
      return this.calcCategory(false)
    },
  },
}
</script>


<style type="text/css" media="all" scoped>
@import '/res/style/base.css';

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert {
  width: 100%;
  margin: 1rem;
  padding: 1rem;
  background: var(--zekrBgColor);
  border-radius: var(--headerRadius);
  box-shadow: 1pt 1pt 10pt var(--bodyBgColor);

  text-align: center;
  position: relative;
}

.alert>* {
  margin: 1rem;
}

.close {
  position: absolute;
  top: 0;
  right: 0;

  padding: 1rem;
  color: var(--bodyBgColor);
}

.hide {
  display: none;
}
</style>