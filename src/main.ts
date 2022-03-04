import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue from 'vue';

// import "element-plus/es/components/message/style/index";

// import 'element-plus/theme-chalk/src/message.scss'

import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

import {
    CanvasRenderer
} from 'echarts/renderers';

import {
    LineChart
} from 'echarts/charts'

import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
    VisualMapComponent,
    DataZoomComponent  
} from 'echarts/components'


use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    VisualMapComponent,
    DataZoomComponent 
])

createApp(App).use(router).mount("#app");

  