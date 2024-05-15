import Vue from 'vue'
import App from './App'

new Vue({
  el: '#app',
  render: h => h(App),
});

String.prototype.satisfy = function (regex) {
  return this.search(regex) > -1
}