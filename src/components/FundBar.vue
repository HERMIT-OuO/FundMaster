<!--  -->
<template>
    <div class="fund-bar">
        {{ fundCode }}
    </div>
</template>

<script lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
interface DataProps {
    fundCode: string
}
export default {
    name: "FundBar",
    props: {
        fundCode: {
            type: String,
            required: true,
        },
    },
    setup(props:any) {
        const data: DataProps = reactive({
            fundCode: ""
        });
        onBeforeMount(() => {});
        onMounted(() => {
            // data.fundCode = props.fundCode;
            console.log(props)
        });
        const refData = toRefs(data);
        return {
            ...refData,
        };
    },
};
</script>
<style scoped>
.fund-detail {
    width: 100%;
}
</style>