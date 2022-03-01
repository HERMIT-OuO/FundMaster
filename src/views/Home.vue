<!--  -->
<template>
    <all-funds />
</template>

<script lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import AllFunds from '@/components/AllFunds.vue';
interface DataProps {
    fund: string;
}
export default {
    name: "Home",
    components: {
        AllFunds,
    },
    
        AllFundssetup() {
        const data: DataProps = reactive({
            fund: ""
        });
        onBeforeMount(() => {});
        onMounted(() => {});
        const refData = toRefs(data);
        return {
            ...refData,
        };
    },
};
</script>
<style scoped>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
}

.home-title {
    margin-bottom: 5rem;

    font-size: 32px;
    font-weight: bold;
    
    text-align: center;
}

.home-panel {
    /* display: flex;
    justify-content: center;
    align-items: center; */

    position: absolute;
    top: 15%;

    width: 80%;
}
</style>