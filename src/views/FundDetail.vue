<!--  -->
<template>
    <div class="fund-detail">
        <div class="fund-bar">
            <fund-bar :fund-code="fundCode" />
        </div>
        <div class="fund-chart">
            <fund-chart :fund-code="fundCode" />
        </div>
    </div>
</template>

<script lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import FundBar from "@/components/FundBar.vue";
import FundChart from "@/components/FundChart.vue";
import { useRoute } from "vue-router";
interface DataProps {
    fundCode: any;
}
export default {
    name: "FundDetail",
    components: {
        FundBar,
    },
    setup() {
        const route = useRoute();
        const data: DataProps = reactive({
            fundCode: "",
        });
        onBeforeMount(() => {});
        onMounted(() => {
            data.fundCode = route.query.fundCode;
            // console.log('1', data.fundCode);
        });
        const refData = toRefs(data);
        
        return {
            ...refData,
        };
    },
};
</script>
<style scoped>
.fund-chart {
    margin-top: 3rem;
}
</style>