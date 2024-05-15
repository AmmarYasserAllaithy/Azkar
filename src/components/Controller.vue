<template>
  <section class="ctrl">

    <button @click="toggleTheme">
      <i class="fa fa-lg fa-circle-half-stroke"></i>
      <span v-if="showInfo"> اضاءة </span>
    </button>

    <button @click="e => fontSize > 0 && updateFontSize(-1)">
      <i class="fa fa-lg fa-magnifying-glass-minus"></i>
      <span v-if="showInfo"> تصغير </span>
    </button>

    <button @click="updateFontSize(1)">
      <i class="fa fa-lg fa-magnifying-glass-plus"></i>
      <span v-if="showInfo"> تكبير </span>
    </button>

    <input type="text" @keyup="search" class="searchTF" placeholder="بــحــث" />

  </section>
</template>


<script>
export default {
  name: 'Controller',

  data() {
    return {
      DARK: 'dark',
      fontSize: 12,
      showInfo: false,
    }
  },

  methods: {
    updateFontSize(n) {
      document.body.style.fontSize = `${this.fontSize += n}pt`
    },

    search(e) {
      let query = e.target.value.trim()

      // Handle all ta4keel occurrence 
      if (!query.satisfy(/\d+/g))
        query = query
          .split('')
          .map(ar7arf => ar7arf == ' ' ? ar7arf : [
            ar7arf,
            '([',
            this.charsOf(1617),
            ']?[',
            this.charsOf(1614, 1615, 1616, 1618, 1619, 1611, 1612, 1613),
            ']?[ـ]?)'
          ]
            .join('')
          )
          .join('')

      let regex = new RegExp(query, 'g')

      this.$emit('search', regex)
    },

    charsOf(...asciis) {
      return asciis
        .map(ascii =>
          String.fromCharCode(ascii))
        .join('')
    },

    toggleTheme() {
      if (document.body.classList.contains(this.DARK))
        document.body.classList.remove(this.DARK)
      else document.body.classList.add(this.DARK)
    },
  },
}
</script>


<style type="text/css" media="all" scoped>
@import '/res/style/base.css';

.ctrl {
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  background: var(--zekrBgColor);
  border-radius: 0 0 20pt 20pt;
  box-shadow: 1px 2px 2px var(--shadowColor);

  position: sticky;
  top: 0;
  left: 0;
  z-index: 3;
}

button,
.searchTF {
  padding: .75rem;
  background: inherit;
  color: var(--textColor);
  font-size: 12pt;
}

.searchTF {
  width: 100%;
  text-align: center;
  border-left: 1px solid var(--shadowColor);
}

.searchTF::placeholder {
  color: var(--textColor);
  opacity: .5;
}
</style>