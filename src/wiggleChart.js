
import zp from './zbbPlot'
function WiggleChart(dom, opts) {
  this.zp = new zp(dom);
  this.canvas = dom;
  this.opts = opts;
  this.axisTextInterval = 10;
  this.img = null;
  const space = 30;
  const textSpace = 20;
  const scaleSpace = 10;
  this.Boundary = {
    x: 0,
    y: 0,
    width: dom.width,
    height: dom.height,
  };
  this.topAxisBoundary = {
    x: this.Boundary.x + space,
    y: this.Boundary.y,
    width: this.Boundary.width - space * 2,
    height: space,
  };
  // 坐标文字盒子
  this.topAxisTextBoundary = {
    x: this.topAxisBoundary.x,
    y: this.topAxisBoundary.y,
    width: this.topAxisBoundary.width,
    height: textSpace,
    marginLeft: -3,
    marginTop: 10
  }
  // 坐标刻度线盒子
  this.topAxisScaleBoundary = {
    x: this.topAxisTextBoundary.x,
    y: this.topAxisTextBoundary.y + this.topAxisTextBoundary.height,
    width: this.topAxisBoundary.width,
    height: scaleSpace,
    marginLeft: 10,
    marginTop: 0
  }
  this.bottomAxisBoundary = {
    x: this.Boundary.x + space,
    y: this.Boundary.height - space,
    width: this.Boundary.width - space * 2,
    height: space,
  };
  // 坐标刻度线盒子
  this.bottomAxisScaleBoundary = {
    x: this.bottomAxisBoundary.x,
    y: this.bottomAxisBoundary.y,
    width: this.bottomAxisBoundary.width,
    height: scaleSpace,
    marginLeft: 10,
    marginTop: 0
  }
  this.bottomAxisTextBoundary = {
    x: this.bottomAxisScaleBoundary.x,
    y: this.bottomAxisScaleBoundary.y + this.bottomAxisScaleBoundary.height,
    width: this.bottomAxisBoundary.width,
    height: textSpace,
    marginLeft: -3,
    marginTop: 10
  }

  this.leftAxisBoundary = {
    x: this.Boundary.x,
    y: this.Boundary.y + space,
    width: space,
    height: this.Boundary.height - space * 2,
  };
  // 坐标文字盒子
  this.leftAxisTextBoundary = {
    x: this.leftAxisBoundary.x,
    y: this.leftAxisBoundary.y,
    width: textSpace,
    height: this.leftAxisBoundary.height,
    marginLeft: 0,
    marginTop: 0
  }
  // 坐标刻度线盒子
  this.leftAxisScaleBoundary = {
    x: this.leftAxisTextBoundary.x,
    y: this.leftAxisTextBoundary.y,
    width: scaleSpace,
    height: this.leftAxisBoundary.height,
    marginLeft: textSpace,
    marginTop: 0
  }
  this.rightAxisBoundary = {
    x: this.Boundary.width - space,
    y: this.Boundary.y + space,
    width: space,
    height: this.Boundary.height - space * 2,
  };

  // 坐标刻度线盒子
  this.rightAxisScaleBoundary = {
    x: this.rightAxisBoundary.x,
    y: this.rightAxisBoundary.y,
    width: scaleSpace,
    height: this.rightAxisBoundary.height,
    marginLeft: 0,
    marginTop: 0
  }
  // 坐标文字盒子
  this.rightAxisTextBoundary = {
    x: this.rightAxisScaleBoundary.x,
    y: this.rightAxisScaleBoundary.y,
    width: textSpace,
    height: this.rightAxisBoundary.height,
    marginLeft: textSpace,
    marginTop: 0
  }
  this.gridBoundary = {
    x: this.leftAxisBoundary.x + this.leftAxisBoundary.width,
    y: this.topAxisBoundary.y + this.topAxisBoundary.height,
    width: this.Boundary.width - this.leftAxisBoundary.width - this.rightAxisBoundary.width,
    height: this.Boundary.height - this.topAxisBoundary.height - this.bottomAxisBoundary.height,
  };
}

WiggleChart.prototype = {
  drawAxis: function () {
    if(this.opts.topAxis) {
      this.drawHorizontalAxisScale(this.topAxisScaleBoundary);
      this.drawHorizontalAxisText(this.topAxisTextBoundary);
    }
    if(this.opts.bottomAxis) {
      this.drawHorizontalAxisScale(this.bottomAxisScaleBoundary);
      this.drawHorizontalAxisText(this.bottomAxisTextBoundary);
    }
    if(this.opts.leftAxis) {
      this.drawVerticalAxisScale(this.leftAxisScaleBoundary);
      this.drawVerticalAxisText(this.leftAxisTextBoundary);
    }
    if(this.opts.rightAxis) {
      this.drawVerticalAxisScale(this.rightAxisScaleBoundary);
      this.drawVerticalAxisText(this.rightAxisTextBoundary);
    }

  },
  drawGrid: function () {
    this.zp.drawRect({
      x: this.gridBoundary.x,
      y: this.gridBoundary.y,
      width: this.gridBoundary.width,
      height: this.gridBoundary.height,
      style: {
        lineWidth: 1
      }
    })
  },
  drawData: function () {
    this.img = this.zp.createImg(this.gridBoundary.width, this.gridBoundary.height);
    this.timeStart = 0;
    this.timeEnd = this.opts.data[0].length;
    this.depthStart = 0;
    this.depthEnd = this.opts.data.length;
    let depthLen = this.depthEnd - this.depthStart;
    let timeLen = this.timeEnd - this.timeStart;
    let w = this.gridBoundary.width;
    let h = this.gridBoundary.height;

    this.timeInterval = 1;
    this.depthInterval = 1;
    this.traceOffsetPixel = w / depthLen;
    this.traceInfo = [];
    let gain = this.opts.gain;
    let maxValueList = [];
    let minValueList = [];
    this.opts.data.forEach((item) => {
      maxValueList.push(Math.max(...item));
      minValueList.push(Math.min(...item));
    })
    let maxValue = Math.max(...maxValueList);
    let minValue = Math.min(...minValueList);
    
    for(let i = 0; i < this.opts.data.length; i++) {
      this.traceInfo.push({
        depth: this.traceOffsetPixel * i,

      })
    }
    for(let i = 0; i < depthLen; i++) {
      for(let j = 0; j < timeLen - 1; j++) {
        let p1 = {
          depth: this.traceInfo[i].depth,
          y: (j - this.timeStart) / timeLen * h,
          z: this.opts.data[i][j] / (maxValue - minValue) * gain * this.traceOffsetPixel*2
        }
        let p2 = {
          depth: this.traceInfo[i].depth,
          y: (j + 1 - this.timeStart) / timeLen * h,
          z: this.opts.data[i][j + 1] / (maxValue - minValue) * gain * this.traceOffsetPixel*2
        }
        for(let m = parseInt(p1.y); m < p2.y; m++) {
          let th = p1.z + (p2.z - p1.z) * (m - p1.y)/(p2.y - p1.y);
          for(let n = parseInt(p1.depth); n < th + p1.depth; n++) {
            this.zp.drawPixel(n, m, 'rgba(0, 0, 0, 255)', this.img);
          }
          if(th < 0) {
            this.zp.drawPixel(parseInt(p1.depth + th), m, 'rgba(0, 0, 0, 255)', this.img);
          }
          
          
        }
      }
    }
    this.zp.putImg(this.gridBoundary.x, this.gridBoundary.y, this.img);
    
  },
  // 画字体
  drawHorizontalAxisText: function (axisTextBoundary) {
    let [min, max] = this.opts.xDomain || [0, this.opts.data.length - 1];
    let range = max - min;
    let textCount = range / this.axisTextInterval;

    let [orginX, orginY] = [axisTextBoundary.x, axisTextBoundary.y];
    for (let i = min; i <= max; i++) {
      this.zp.drawText({
        x: orginX + Math.round(i * axisTextBoundary.width / textCount) + axisTextBoundary.marginLeft,
        y: orginY + axisTextBoundary.marginTop,
        str: (min + i * this.axisTextInterval),
        style: {
          fillStyle: 'black'
        }
      });
    }

  },
  drawHorizontalAxisScale: function (axisScaleBoundary) {
    let [min, max] = this.opts.xDomain || [0, this.opts.data.length - 1];
    let range = max - min;
    let textCount = range / this.axisTextInterval;
    let [orginX, orginY] = [axisScaleBoundary.x, axisScaleBoundary.y];
    let shortTick = 3;
    let longTick = 10;
    let tickLength;


    let scaleCount = textCount;
    for (let i = min; i <= max; i++) {
      if (i % (scaleCount / textCount) == 0) {
        tickLength = longTick;

      } else {
        tickLength = shortTick;
      }
      this.zp.drawLine({
        x1: Math.round(orginX + i * axisScaleBoundary.width / scaleCount),
        y1: orginY + axisScaleBoundary.marginTop,
        x2: Math.round(orginX + i * axisScaleBoundary.width / scaleCount),
        y2: orginY + tickLength + axisScaleBoundary.marginTop,
      });
    }

  },
  // 画字体
  drawVerticalAxisText: function (axisTextBoundary) {
    let [min, max] = this.opts.yDomain || [0, this.opts.data[0].length - 1];
    let range = max - min;
    let textCount = range / this.axisTextInterval;

    let [orginX, orginY] = [axisTextBoundary.x, axisTextBoundary.y];
    for (let i = min; i <= max; i++) {
      this.zp.drawText({
        x: orginX + axisTextBoundary.marginLeft,
        y: orginY + Math.round(i * axisTextBoundary.height / textCount) + axisTextBoundary.marginTop,
        str: (min + i * this.axisTextInterval),
        style: {
          fillStyle: 'red'
        }
      });
    }

  },
  drawVerticalAxisScale: function (axisScaleBoundary) {
    let [min, max] = this.opts.yDomain || [0, this.opts.data[0].length - 1];
    let range = max - min;
    let textCount = range / this.axisTextInterval;
    let [orginX, orginY] = [axisScaleBoundary.x, axisScaleBoundary.y];
    let shortTick = 3;
    let longTick = 10;
    let tickLength;


    let scaleCount = textCount;
    for (let i = min; i <= max; i++) {
      if (i % (scaleCount / textCount) == 0) {
        tickLength = longTick;

      } else {
        tickLength = shortTick;
      }
      this.zp.drawLine({
        x1: orginX + axisScaleBoundary.marginLeft,
        y1: Math.round(orginY + i * axisScaleBoundary.height / scaleCount),
        x2: orginX + tickLength + axisScaleBoundary.marginLeft,
        y2: Math.round(orginY + i * axisScaleBoundary.height / scaleCount),
      });
    }

  },
  // 数据转为像素坐标
  dataToPoint: function (data, domain, range) {
    return this.zp.utils.linearMap(data, domain, range);
  },
  render: function () {
    this.drawData();
    this.drawGrid();
    this.drawAxis();

  },
  refresh: function (opts) {
    this.opts = opts;
    this.clear();
    this.render();
  },
  destroy: function () {
    // this.removeEvent();
    this.zp = null;
    this.canvas = null;
  },
  clear: function () {
    this.zp.clear();
  },
  init: function () {
    this.clear();
    this.render();
    // this.addEvent();
  }
}
export default WiggleChart;