<template>
  <div>
    <Nuxt />
    <client-only>
    <notifications group="all" position="bottom center">
        <template slot="body" slot-scope="props">
          <div class="custom-noti">
              <div class="text-noti" v-html="props.item.text">
              </div>
              <a class="btn-close" @click="props.close">
               OK
              </a>

          </div>
        </template>
    </notifications>
    </client-only>
  </div>
</template>
<script>
import Vue from 'vue'
import mixins from '../mixins';
import VueCurrencyInput from 'vue-currency-input'
  // import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Treeselect from '@riophae/vue-treeselect'
Vue.mixin(mixins);
Vue.component('treeselect',Treeselect)

const pluginOptions = {
  globalOptions: { currency: {},precision:0}
}
Vue.use(VueCurrencyInput, pluginOptions)
Vue.prototype.$checkDragDrop = (classSelector) => {
  let arrImg = Array.from(document.querySelectorAll(classSelector))
  arrImg.forEach(item => {
    let drag = false
    item.addEventListener('mousedown', () =>{
      drag = false
    })
    item.addEventListener('mousemove', () =>{
      drag = true
    })
    item.addEventListener('mouseup', () =>{
      return drag
    })
  })
}
export default {
  async asyncData(context) {

  },
  mounted(){
        var textAreas = document.getElementsByTagName('textarea');
        Array.prototype.forEach.call(textAreas, function(elem) {
            elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
        });
    },
}
</script>

