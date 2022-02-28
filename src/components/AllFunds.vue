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
            <el-input class="all-funds-add-input" v-model="inputFund" placeholder="在这里输入基金代码" />
            <el-button class="all-funds-add-button" type="primary" @click="handleAdd">提交</el-button>
        </div>
        <el-row :gutter="24">
            <el-col v-for="(item,index) in funds" :key="index" :span="6">
                <el-card shadow="hover">
                    <div class="fund-title">
                        <span class="fund-title-name">{{ item.name }}</span>
                        <span class="fund-title-code">[{{ item.code }}]</span>
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
    </div>
</template>

<script lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted, computed } from "vue";
import { getAllFund, getFundDetail  } from "@/api/fund";
import { ElMessage } from 'element-plus'
interface DataProps {
    funds: any[];
    inputFund: string;
}
export default {
    name: "AllFunds",
    setup() {
        const data: DataProps = reactive({
            funds: [],
            inputFund: "",
        });
        const upOrDown = (num: number) => {
            return {
                up: num >= 0,
                down: num < 0,
            };
        };
        const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
            const _data = {
                keyWord: queryString,
            };
            getAllFund(_data).then((res: any) => {
                if (res.code === 200) {
                    let _res = [];
                    for (let i = 0; i < res.data.length; i++) {
                        _res.push({
                            value: res.data[i][2] + "(" + res.data[i][0] + ")",
                            id: res.data[i][0]
                        })
                        console.log(_res);
                    }
                    cb(res.data)
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
                }else {
                    ElMessage({
                        message: 'res.msg',
                        type: 'error'
                    })
                }
            });

        };
        onBeforeMount(() => {});
        onMounted(() => {});
        const refData = toRefs(data);
        return {
            ...refData,
            upOrDown,
            querySearchAsync,
            handleSelect,
            handleAdd,
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

.fund-title {
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
    color: #0f0;
}
</style>