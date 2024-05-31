<template>
  <article @click="e => !read && updateCount()">

    <p class="zekr" v-html="zekr.body.replace('\n', '<br>')"></p>

    <div class="flex-sb" dir="rtl">
      <p class="ref" v-if="zekr.reference">
        {{ zekr.reference }}
      </p>

      <p class="count" v-if="progress < 100">
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
        width: `calc(100% - ${this.progressMargin} * 2)`,
        height: `calc(${this.progress}% - ${this.progressMargin} * 2)`
      }
    }
  },

  watch: {
    count(value) {
      this.progress = 100 - value / this.zekr.count * 100
    },
  },

  created() {
    this.count = this.readCookie() || this.count
    this.updateUI()
  },

  emits: ['read'],
}
</script>


<style type="text/css" media="all" scoped>
article {
  margin: .25rem;
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

.zekr {
  font-weight: bold;
}

.ref,
.count,
.virtue {
  opacity: .6;
}

.progress {
  position: absolute;
  border-radius: inherit;
  bottom: 0;
  right: 0;

  transition: 1s linear;
  background: var(--progressColor);
  opacity: .15;
}
</style>