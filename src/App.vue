<template>
    <div class="app">
        <div class="app-title">FUND MASTER</div>
        <div class="app-router">
            <router-view />
        </div>
    </div>
</template>

<style>
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

.app-router {
    width: 80%;
}
</style>
