<template>
    <div class="app">
        <div class="app-title" @click="goToHome">FUND MASTER</div>
        <div class="app-router">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
// import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
    setup() {
        const router = useRouter();
        const goToHome = () => {
            router.push("/");
        };
        return {
            goToHome,
        };
    },
}
</script>

<style>

html {
    height: 100%;

    background-color: #f9f7f7;
}

#app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    
}

.app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 8rem;
}

.app-title {
    margin-bottom: 5rem;

    font-size: 32px;
    font-weight: bold;

    text-align: center;
}

.app-title:hover {
    cursor: pointer;
}

.app-router {
    width: 80%;
}
</style>
