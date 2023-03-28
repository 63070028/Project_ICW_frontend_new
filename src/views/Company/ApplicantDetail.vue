<template>
    <div class="card">
  <img src="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/bryan-cranston-900x506.jpg" alt="Avatar" style="width:500px; height: 500px;">
  <div class="container">
    <h4><b>John Doe</b></h4> 
    <p>Architect & Engineer</p> 
  </div>
</div>
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

