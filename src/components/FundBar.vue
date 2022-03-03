<!--  -->
<template>
    <div class="fund-bar">
        <el-card shadow="hover">
            <div class="fund-title">
                <span class="fund-title-name">{{ fund.name }}</span>
                <span class="fund-title-code">[{{ fund.code }}]</span>
            </div>
            <div class="fund-body">
                <div class="fund-body-item">
                    <div class="fund-body-item-title">净值估算</div>
                    <div
                        class="fund-body-item-num"
                        :class="upOrDown(fund.expectGrowth)"
                    >
                        {{ fund.expectWorth }}（{{ fund.expectGrowth }}%）
                    </div>
                </div>
                <div class="fund-body-item">
                    <div class="fund-body-item-title">单位净值</div>
                    <div
                        class="fund-body-item-num"
                        :class="upOrDown(fund.dayGrowth)"
                    >
                        {{ fund.netWorth }} （{{ fund.dayGrowth }}%）
                    </div>
                </div>
                <div class="fund-body-item">
                    <div class="fund-body-item-title">累计净值</div>
                    <div
                        class="fund-body-item-num"
                    >
                        {{ fund.totalWorth }}
                    </div>
                </div>
                <div class="fund-body-item">
                    <div class="fund-body-item-title">更新日期</div>
                    <div
                        class="fund-body-item-num"
                    >
                        {{ fund.expectWorthDate }}
                    </div>
                </div>
            </div>
        </el-card>
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
import { getFundDetail } from "@/api/fund";
interface DataProps {
    code: string;
    fund: object;
}
export default {
    name: "FundBar",
    props: {
        fundCode: {
            type: String,
            required: true,
        },
    },
    setup(props: any) {
        const data: DataProps = reactive({
            code: "",
            fund: {},
        });

        onBeforeMount(() => {});
        onMounted(() => {
            // data.fundCode = props.fundCode;
        });
        onBeforeUpdate(() => {
            data.code = props.fundCode;
            const _data = {
                code: data.code,
            };
            getFundDetail(_data).then((res: any) => {
                if (res.code === 200) {
                    data.fund = res.data;
                }
            });
        });
        const refData = toRefs(data);
        const upOrDown = (num: number) => {
            return {
                up: num >= 0,
                down: num < 0,
            };
        };
        return {
            ...refData,
            upOrDown,
        };
    },
};
</script>
<style scoped>
.fund-detail {
    width: 100%;
}

.up {
    color: #f00;
}

.down {
    color: #008000;
}

.fund-title {
    margin-bottom: 2rem;

    font-size: 18px;
    font-weight: bold;

    text-align: center;
}

.fund-body {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.fund-body-item {
    /* width: 50%; */
}

.fund-body-item-title {
    margin-bottom: 0.5rem;
}

.fund-body-item-num {
    font-weight: bold;
}
</style>