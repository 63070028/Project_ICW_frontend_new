<template>
    <p class="is-size-1 has-text-centered mt-3">Program Page {{route.params.id}}</p>
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute(); 
 
        return{
            router,
            route
        }     
    },
})
</script>
