<template>
    <canvas id="Lesson0" width="400" height="400" style="border:1px solid #d3d3d3;"></canvas>
</template>

<style lang="scss">
    @import './index.scss';
</style>

<script>
import { draw } from "./index";

export default {
    name: 'Lesson0',
    data() {
        return {
            
        };
    },
    
    methods: {
        
    },
    mounted() {
        draw();
    },
};
</script>
