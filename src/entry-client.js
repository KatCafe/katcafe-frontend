import Vue from 'vue'
import { createApp } from './app'


// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
});


// usage of tooltips https://stackoverflow.com/questions/37078423/how-can-add-bootstrap-tooltip-inside-vue-js
Vue.directive('tooltip', function(el, binding){
    $(el).attr('data-toggle', 'tooltip')
        .attr('data-placement', binding.arg)
        .attr('trigger', 'hover').tooltip({title: binding.value})
});

Vue.directive('popover', function(el, binding){

    $(el).attr('data-toggle', 'popover')
        .attr('data-placement', binding.arg)
        .attr('data-html', binding.value.html||false)
        .attr('trigger', 'hover').popover({title: binding.value.title, content: binding.value.content});

    $(el).data('bs.popover').options.content = binding.value.content;
    $(el).popover('show');
});

let handleOutsideClick
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});


const { app, router, store } = createApp('client');

if (typeof window !== "undefined")
  store.dispatch('DIGITAL_SIGNATURE_INIT');

//send the store and dispatch to the FetchService (SocketClient needs store.socketStatus

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.

  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')

})

