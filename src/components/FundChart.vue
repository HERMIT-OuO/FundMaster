<!--  -->
<template>
    <div class="fund-chart">
        <div class="fund-chart-time">
            <el-config-provider :locale="locale">
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="起始时间"
                    end-placeholder="结束时间"
                    :shortcuts="shortcuts"
                >
                </el-date-picker>
                <el-button
                    type="primary"
                    @click="handleSearch"
                    style="margin-left: 1rem"
                    >查询</el-button
                >
            </el-config-provider>
        </div>
        <div class="chart-item">
            <el-card shadow="hover">
                <!-- <div class="chart-item-title">历史净值</div> -->
                <div class="char-item-body">
                    <v-chart :option="worth" style="height: 400px" />
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang='ts'>
import {
    reactive,
    toRefs,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
} from "vue";
import VChart from "vue-echarts";
import { ElConfigProvider } from "element-plus";
import { getFundDetail } from "@/api/fund";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";

interface DataProps {
    worth: any;
    fund: object;
    time: any;
    dataList: any[];
    netWorthList: any[];
    netWorthList2: any[];
}
export default {
    name: "",
    components: {
        ElConfigProvider,
        VChart,
    },
    props: {
        fundCode: String,
    },
    setup(props: any) {
        const moment = require("moment");
        const data: DataProps = reactive({
            worth: {
                title: [
                    {
                        text: "历史单位净值",
                        left: "center",
                    },
                ],
                tooltip: {
                    trigger: "item",
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
                        splitNumber: 10,
                        position: "left",
                    },
                    {
                        type: "value",
                        name: "净值涨幅",
                        splitNumber: 10,
                        position: "right",
                        min: -1,
                        max: 1,
                        axisLabel: {
                            formatter: "{value} %",
                        },
                    },
                ],
                series: [
                    {
                        name: "单位净值",
                        type: "line",
                        data: [],
                    },
                    {
                        name: "净值涨幅",
                        type: "line",
                        data: [],
                    },
                ],
            },
            fund: {},
            time: [],
            locale: zhCn,
            dataList: [],
            netWorthList: [],
            netWorthList2: [],
        });
        onBeforeMount(() => {});
        onMounted(() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            data.time[0] = start;
            data.time[1] = end;
        });
        onBeforeUpdate(() => {
            handleSearch();
        });
        const handleSearch = () => {
            const _data = {
                code: props.fundCode,
                startDate: moment(data.time[0]).format("YYYY-MM-DD"),
                endDate: moment(data.time[1]).format("YYYY-MM-DD"),
            };
            getFundDetail(_data).then((res: any) => {
                if (res.code === 200) {
                    data.fund = res.data;
                    data.dataList = res.data.netWorthData.map((item: any) => {
                        return item[0];
                    });
                    data.netWorthList = res.data.netWorthData.map(
                        (item: any) => {
                            return item[1];
                        }
                    );
                    data.netWorthList2 = res.data.netWorthData.map(
                        (item: any) => {
                            return item[2];
                        }
                    );
                    data.worth.xAxis.data = data.dataList;
                    data.worth.series[0].data = data.netWorthList;
                    data.worth.series[1].data = data.netWorthList2;
                } else {
                    ElMessage.error(res.message);
                }
            });
        };
        const shortcuts = [
            {
                text: "本周",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    return [start, end];
                },
            },
            {
                text: "本月",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    return [start, end];
                },
            },
            {
                text: "三个月",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    return [start, end];
                },
            },
            {
                text: "一年",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                    return [start, end];
                },
            },
        ];
        const refData = toRefs(data);
        return {
            ...refData,
            shortcuts,
            handleSearch,
        };
    },
};
</script>
<style scoped>
.fund-chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.fund-chart-time {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chart-item {
    margin-top: 3rem;
    width: 100%;
}

.char-item-body {
    margin-top: 1rem;
}
</style>