<template>
  <div id="clock"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

onMounted(() => {
  var chartDom = document.getElementById('clock')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    series: [
      {
        name: 'hour',
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        min: 0,
        max: 12,
        splitNumber: 12,
        clockwise: true,
        axisLine: {
          lineStyle: {
            width: 15,
            color: [[1, 'rgba(0,0,0,0.7)']],
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 15,
          },
        },
        splitLine: {
          lineStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 3,
            shadowOffsetX: 1,
            shadowOffsetY: 2,
          },
        },
        axisLabel: {
          fontSize: 50,
          distance: 25,
          color: 'rgba(255,255,255,0.5)',
          formatter: function (value) {
            if (value === 0) {
              return '';
            }
            return value + '';
          },
        },
        anchor: {
          show: true,
          icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE4M0RENkYyN0E4MDExRURCNEExQzRBNTk0NURBRDM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE4M0RENkYzN0E4MDExRURCNEExQzRBNTk0NURBRDM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTgzREQ2RjA3QTgwMTFFREI0QTFDNEE1OTQ1REFEMzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTgzREQ2RjE3QTgwMTFFREI0QTFDNEE1OTQ1REFEMzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz53DYtvAAAI0klEQVR42uyd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',
          showAbove: false,
          offsetCenter: [0, '-35%'],
          size: 120,
          keepAspect: true,
        },
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 12,
          length: '55%',
          offsetCenter: [0, '8%'],
          itemStyle: {
            color: '#C0911F',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4,
          },
        },
        detail: {
          show: false,
        },
        title: {
          offsetCenter: [0, '30%'],
        },
        data: [
          {
            value: 0,
          },
        ],
      },
      {
        name: 'minute',
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        min: 0,
        max: 60,
        clockwise: true,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 8,
          length: '70%',
          offsetCenter: [0, '8%'],
          itemStyle: {
            color: '#C0911F',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4,
          },
        },
        anchor: {
          show: true,
          size: 20,
          showAbove: false,
          itemStyle: {
            borderWidth: 15,
            borderColor: '#C0911F',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4,
          },
        },
        detail: {
          show: false,
        },
        title: {
          offsetCenter: ['0%', '-40%'],
        },
        data: [
          {
            value: 0,
          },
        ],
      },
      {
        name: 'second',
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        min: 0,
        max: 60,
        animationEasingUpdate: 'bounceOut',
        clockwise: true,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 4,
          length: '85%',
          offsetCenter: [0, '8%'],
          itemStyle: {
            color: '#C0911F',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4,
          },
        },
        anchor: {
          show: true,
          size: 15,
          showAbove: true,
          itemStyle: {
            color: '#C0911F',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4,
          },
        },
        detail: {
          show: false,
        },
        title: {
          offsetCenter: ['0%', '-40%'],
        },
        data: [
          {
            value: 0,
          },
        ],
      },
    ],
  };
  setInterval(function () {
    var date = new Date();
    var second = date.getSeconds();
    var minute = date.getMinutes() + second / 60;
    var hour = (date.getHours() % 12) + minute / 60;

    option.animationDurationUpdate = 300;
    myChart.setOption<echarts.EChartsOption>({
      series: [
        {
          name: 'hour',
          animation: hour !== 0,
          data: [{ value: hour }],
        },
        {
          name: 'minute',
          animation: minute !== 0,
          data: [{ value: minute }],
        },
        {
          animation: second !== 0,
          name: 'second',
          data: [{ value: second }],
        },
      ],
    });
  }, 1000);

  option && myChart.setOption(option);
});
</script>

<style scoped lang="less">
#clock {
  width: 40rem;
  height: 40rem;
}
</style>
