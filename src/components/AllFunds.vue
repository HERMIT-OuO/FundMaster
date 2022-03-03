<!--  -->
<template>
    <div class="all-funds">
        <div class="all-funds-add">
            <!-- <el-autocomplete
                v-model="inputFund"
                :fetch-suggestions="querySearchAsync"
                :select-when-unmatched="true"
                placeholder="在这里输入基金的名称或代码"
                @select="handleSelect"
            /> -->
            <el-input
                class="all-funds-add-input"
                v-model="inputFund"
                placeholder="在这里输入基金代码"
            />
            <el-button
                class="all-funds-add-button"
                type="primary"
                @click="handleAdd"
                >提交</el-button
            >
        </div>
        <el-row :gutter="24">
            <el-col v-for="(item, index) in funds" :key="index" :span="6">
                <el-card
                    class="fund-card"
                    @click="goDetail(item.code)"
                    shadow="hover"
                >
                    <div class="fund-title">
                        <div>
                            <span class="fund-title-name">{{ item.name }}</span>
                            <span class="fund-title-code"
                                >[{{ item.code }}]</span
                            >
                        </div>
                        <div class="fund-card-del">
                            <el-button
                                type="danger"
                                :auto-insert-space="true"
                                @click.stop="doDel(index)"
                            >
                                移除
                            </el-button>
                        </div>
                    </div>
                    <div class="fund-body">
                        <div class="fund-body-left">
                            <div class="fund-body-left-title">单位净值</div>
                            <div
                                class="fund-body-left-num"
                                :class="upOrDown(item.dayGrowth)"
                            >
                                {{ item.netWorth }}
                            </div>
                        </div>
                        <div class="fund-body-right">
                            <div class="fund-body-left-title">净值涨幅</div>
                            <div
                                class="fund-body-left-num"
                                :class="upOrDown(item.dayGrowth)"
                            >
                                {{ item.dayGrowth }}%
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

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

        <div
            v-for="(item, index) in funds"
            :key="index"
            class="fund-line-chart"
        >
            <FundLineChart :fund="item"></FundLineChart>
        </div>
    </div>
</template>

<script lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted, computed } from "vue";
import { getAllFund, getFundDetail, fund, getFundDetailList } from "@/api/fund";
import { getAllFunds, setAllFunds } from "@/utils/doStorage";
import { useRouter } from "vue-router";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import FundLineChart from "./FundLineChart.vue";

interface DataProps {
    funds: any[];
    inputFund: string;
    stroage: any[];
    time: any[];
}
export default {
    name: "AllFunds",
    components: {
        Delete,
        FundLineChart,
    },
    setup() {
        const moment = require("moment");
        const router = useRouter();
        const data: DataProps = reactive({
            funds: [],
            stroage: [],
            inputFund: "",
            time: [],
        });
        const upOrDown = (num: number) => {
            return {
                up: num >= 0,
                down: num < 0,
            };
        };
        const querySearchAsync = (
            queryString: string,
            cb: (arg: any) => void
        ) => {
            const _data = {
                keyWord: queryString,
            };
            getAllFund(_data).then((res: any) => {
                if (res.code === 200) {
                    let _res = [];
                    for (let i = 0; i < res.data.length; i++) {
                        _res.push({
                            value: res.data[i][2] + "(" + res.data[i][0] + ")",
                            id: res.data[i][0],
                        });
                        console.log(_res);
                    }
                    cb(res.data);
                } else {
                    cb([]);
                }
            });
        };

        const handleSelect = () => {};
        const handleAdd = () => {
            const _data = {
                code: data.inputFund,
            };
            getFundDetail(_data).then((res: any) => {
                if (res.code === 200) {
                    console.log(res);
                    data.funds.push(res.data);
                    data.stroage.push(res.data.code);
                    setAllFunds(data.stroage);
                    ElMessage.success("添加成功");
                } else {
                    ElMessage.error(res.message);
                }
            });
        };
        const goDetail = (item: any) => {
            router.push({
                path: "/funddetail",
                query: {
                    fundCode: item,
                },
            });
        };
        const doDel = (index: any) => {
            data.funds.splice(index, 1);
            data.stroage.splice(index, 1);
            setAllFunds(data.stroage);
            ElMessage.success("删除成功");
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
            {
                text: "两年",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 2);
                    return [start, end];
                },
            },
            {
                text: "三年",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3);
                    return [start, end];
                },
            },
        ];
        const handleSearch = () => {
            // 获取所有基金
            const _data = getAllFunds();
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
            data.time[0] = start;
            data.time[1] = end;
            if (_data) {
                data.stroage = _data;
                const request = {
                    code: data.stroage.toString(),
                    startDate: moment(data.time[0]).format("YYYY-MM-DD"),
                    endDate: moment(data.time[1]).format("YYYY-MM-DD"),
                };
                getFundDetailList(request).then((res: any) => {
                    if (res.code === 200) {
                        data.funds = res.data;
                        console.log(res);
                    }
                });
            }
        };
        onBeforeMount(() => {});
        onMounted(() => {
            handleSearch();
        });
        const refData = toRefs(data);
        return {
            ...refData,
            upOrDown,
            querySearchAsync,
            handleSelect,
            handleAdd,
            goDetail,
            doDel,
            shortcuts,
            handleSearch,
        };
    },
};
</script>
<style scoped>
.all-funds {
    width: 100%;
}

.all-funds-add {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 1.5rem;
}

.all-funds-add-input {
    margin-right: 1rem;

    width: 100%;
}

.all-funds-add-button {
    width: 5rem;
}

.fund-card {
    margin-bottom: 1rem;
}

.fund-card:hover .fund-card-del {
    visibility: visible;
}

.fund-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 1rem;

    font-size: 18px;
    font-weight: bold;
}

.fund-body {
    display: flex;
    align-items: center;
}

.fund-body-left {
    width: 50%;
}

.fund-body-right {
    width: 50%;
}

.fund-card-del {
    visibility: hidden;
}

.fund-body-left-title {
    margin-bottom: 0.5rem;
}

.fund-body-left-num {
    font-weight: bold;
}

.up {
    color: #f00;
}

.down {
    color: #008000;
}

.fund-chart-time {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-top: 1rem;
}

.fund-line-chart {
    margin-top: 2rem;
}
</style>