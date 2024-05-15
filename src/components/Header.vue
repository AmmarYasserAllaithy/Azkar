<template>
  <section class="header-container">
    <header>
      <h1> {{ name }} </h1>

      <h3>
        <label :class="{ active: isSabah }">
          {{ alsabah }}
        </label>

        {{ w }}

        <label :class="{ active: !isSabah }">
          {{ almasaa }}
        </label>
      </h3>

      <p> {{ ayah }} </p>
    </header>
  </section>
</template>


<script>
export default {
  name: 'Header',

  props: {
    isSabah: Boolean,
  },

  data() {
    return {
      name: 'أذكـــار',
      alsabah: 'الــصــبــاح',
      w: 'و',
      almasaa: 'الــمــســاء',
      ayah: '﴿ وَٱذۡكُر رَّبَّكَ كَثِیرࣰا وَسَبِّحۡ بِٱلۡعَشِیِّ وَٱلۡإِبۡكَـٰرِ ﴾',
    }
  },
}
</script>


<style type="text/css" media="all" scoped>
@import '/res/style/header-footer.css';

.header-container {
  background: var(--zekrBgColor);
}

header>* {
  margin: 1rem auto;
}

h1 {
  font-size: 48pt;
}

label {
  display: inline-block;
}

.active {
  background: var(--white);
  background-image: var(--bgUrl);
  color: var(--headerBgColor);
  padding: .05em .2em;
  border-radius: 4pt;
}
</style>