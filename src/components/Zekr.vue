<template>
  <article @click="e => !read && updateCount()" ref="articleRef">

    <p class="zekr" v-html="zekr.body.replace('\n', '<br>')"></p>

    <div class="flex-sb" dir="rtl">
      <p class="ref" v-if="zekr.reference">
        {{ zekr.reference }}
      </p>

      <p class="count" v-if="count">
        {{ count }}
      </p>
    </div>

    <p class="virtue" v-if="zekr.virtue">
      {{ zekr.virtue }}
    </p>

    <p class="progress" :style="progressStyle"></p>

  </article>
</template>


<script>
export default {
  name: 'Zekr',

  props: {
    zekr: Object,
    isMorning: Boolean
  },

  data() {
    return {
      count: this.zekr.count,
      read: false,
      hypotenuse: '100%',
      deg: 0,
      progress: 0,
      progressMargin: '.25rem'
    }
  },

  methods: {
    updateCount() {
      --this.count
      this.updateUI()
      this.updateCookie()
    },

    updateUI() {
      this.read = this.count == 0

      if (this.read) {
        setTimeout(() => this.count = '', 500)
        this.$emit('read', this.zekr.id)
      }
    },

    updateCookie() {
      document.cookie = `${this.key}=${this.count};expires=${this.exDate}`
    },

    readCookie() {
      return document.cookie
        .split(/\s?;\s?/g)
        .find(item => item.startsWith(this.key))
        ?.split('=')[1]
    },

    calcHypotenuse(width, height) {
      return parseInt(Math.sqrt(Math.pow(parseInt(width), 2) + Math.pow(parseInt(height), 2)))
    },
  },

  computed: {
    key() {
      return `Z${this.isMorning ? 'M' : 'E'}_${this.zekr.id}`
    },

    exDate() {
      let date = new Date()

      date.setHours(date.getHours() + 11)
      date.setMinutes(date.getMinutes() + 30)

      return date.toUTCString()
    },

    progressStyle() {
      return {
        margin: this.progressMargin,
        width: this.hypotenuse + 'px',
        height: this.progress + 'px',
        transform: `rotate(-${90 - this.deg}deg) translateX(50%)`
      }
    }
  },

  watch: {
    count(value) {
      this.progress = (this.zekr.count - value) / this.zekr.count * this.hypotenuse
    },
  },

  created() {
    this.count = this.readCookie() || this.count
    this.updateUI()
  },

  mounted() {
    const computedStyle = getComputedStyle(this.$refs.articleRef)
    this.hypotenuse = this.calcHypotenuse(computedStyle.width, computedStyle.height)
    this.deg = Math.acos(parseInt(computedStyle.width) / this.hypotenuse) * 180 / Math.PI
  },

  emits: ['read'],
}
</script>


<style type="text/css" media="all" scoped>
article {
  margin: .5rem;
  padding: 1rem;
  border-radius: 9pt;
  color: var(--textColor);
  background: var(--zekrBgColor);
  box-shadow: 1px 1px 10px var(--shadowColor);

  overflow: hidden;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .75rem;

}

article>*:not(.progress) {
  pointer-events: none;
}

.ref,
.count,
.virtue {
  opacity: .6;
}

.progress,
article::after {
  position: absolute;
  border-radius: inherit;
  bottom: 0;
  right: 0;
}

.progress {
  transition: 1s linear;
  background: var(--progressColor);
  opacity: .15;
  transform-origin: 100% 100%;
}

article::after {
  content: '';
  top: 0;
  left: 0;
  border: .25rem solid var(--zekrBgColor);
}
</style>