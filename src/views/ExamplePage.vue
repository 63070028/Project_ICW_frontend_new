<template>
    <h1 v-if="show">{{text}}</h1>
    <button class="button" @click="showText()">show</button>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue'

export default defineComponent({
    setup() {
      const text = ref<string>("Hello Word");
      const show = ref<boolean>(false);
      const showText = () => {
        show.value = !show.value;
      };
      return{text, showText, show} 
    },


  // data() {
  // return {
  //     text:"Hello World",
  //     show:false,
  // }
  // },
  // methods: {
  //   showText(){
  //     this.show = !this.show;
  //   }
  // }


})
</script>

