<!--  -->
<template>
    <div class="home">
        <div class="home-panel">
            <!-- <el-input v-model="fund" placeholder="Please input" />
            <el-button type="primary" @click="handleClick">提交</el-button> -->
            <all-funds />
        </div>
    </div>
</template>

<script lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import AllFunds from '@/components/AllFunds.vue';
interface DataProps {
    fund: string;
}
export default {
    name: "",
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
.home-panel {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 20%;

    width: 80%;
}
</style>