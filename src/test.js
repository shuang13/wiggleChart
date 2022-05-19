import wiggleChart from '../dist/wiggleChart.js'
import seismicData from'../data/seismic.json'

(function(){
  let opts = {
    data: seismicData.data,
    topAxis: true,
    leftAxis: false,
    rightAxis: false,
    bottomAxis: true,
    xDomain: [0, 100],
    yDomain: [0, seismicData.data[0].length],
    gain: 1,

  }
  let wc = new wiggleChart(document.querySelector('.wiggle-canvas'), opts);
  wc.init();
})()