export const options = {
  background: {
    color: {
      value: '#EFEFEE', //粒子颜色
    },
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: {
        enable: true,
        mode: 'push', //可用的click模式有: "push", "remove", "repulse", "bubble"。
      },
      onHover: {
        enable: true,
        mode: 'grab', //可用的hover模式有: "grab", "repulse", "bubble"。
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
        speed: 3,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#000000',
    },
    links: {
      color: '#dedede', //'#dedede'。线条颜色。
      distance: 150, //线条长度
      enable: true, //是否有线条
      opacity: 0.5, //线条透明度。
      width: 1, //线条宽度。
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 1, //粒子运动速度。
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 50, //粒子数量。
    },
    opacity: {
      value: 0.05, //粒子透明度。
    },
    shape: {
      type: 'circle', //可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
    },
    size: {
      random: true,
      value: 20,
    },
  },
  detectRetina: true,
};
