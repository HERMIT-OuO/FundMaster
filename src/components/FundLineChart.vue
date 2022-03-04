<!--  -->
<template>
    <div class="fund-line-chart">
        <el-card shadow="hover"
            ><v-chart :option="worth" style="margin-top: 2rem; height: 400px"
        /></el-card>
    </div>
</template>

<script lang='ts'>
import {
    reactive,
    toRefs,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    watch,
} from "vue";
import VChart from "vue-echarts";
import { getFundDetail } from "@/api/fund";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";
interface DataProps {
    worth: any;
    fund: object;
    time: any;
    dateList: any[];
}
export default {
    name: "FundLineChart",
    components: {
        VChart,
    },
    props: {
        fund: Object,
    },
    setup(props: any) {
        const data: DataProps = reactive({
            worth: {
                visualMap: [
                    {
                        show: false,
                        type: "continuous",
                        seriesIndex: 0,
                        min: 1,
                        max: 2,
                    },
                ],
                title: [
                    {
                        text: "历史单位净值",
                        left: "center",
                    },
                ],
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category",
                    axisTick: {
                        alignWithLabel: true,
                    },
                    data: [],
                },
                yAxis: [
                    {
                        type: "value",
                        name: "单位净值",
                        position: "left",
                    },
                ],
                dataZoom: [
                    {
                        type: "inside",
                        start: 0,
                        end: 100,
                    },
                ],
                series: [
                    {
                        name: "单位净值",
                        type: "line",
                        showSymbol: false,
                        data: [],
                    },
                ],
            },
            fund: {},
            time: [],
            dateList: [],
        });
        onBeforeMount(() => {});
        onMounted(() => {
            updateChart(props.fund);
        });
        const watchFund = watch(
            () => props.fund,
            (newValue, oldValue) => {
                // console.log("watchFund");
                // console.log(newValue);
                updateChart(newValue);
            },
            { deep: true }
        );
        onBeforeUpdate(() => {});
        const updateChart = (list: any) => {
            // 更新图表
            // console.log("执行了更新图表");
            data.worth.xAxis.data = list.netWorthData.map((item: any) => {
                return item[0];
            });
            data.worth.series[0].data = list.netWorthData.map((item: any) => {
                return item[1];
            });
            const max = Math.max(...data.worth.series[0].data);
            const min = Math.min(...data.worth.series[0].data);

            data.worth.yAxis[0].max = (max + 0.01).toFixed(4);
            data.worth.visualMap[0].max = max + 0.01;
            data.worth.visualMap[0].min = min - 0.01;
            data.worth.yAxis[0].min = (min - 0.01).toFixed(4);

            const nowWorth =
                data.worth.series[0].data[data.worth.series[0].data.length - 1];
            const increase = nowWorth - data.worth.series[0].data[0];

            data.worth.title[0].text =
                list.name +
                "（历史单位净值）  " +
                data.worth.xAxis.data[0] +
                " 至 " +
                data.worth.xAxis.data[data.worth.series[0].data.length - 1] +
                " 增长 " +
                increase.toFixed(4);
        };
        const refData = toRefs(data);
        return {
            ...refData,
            updateChart,
        };
    },
};
</script>
<style scoped>
</style>