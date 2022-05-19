"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zbbPlot = _interopRequireDefault(require("./zbbPlot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function WiggleChart(dom, opts) {
  this.zp = new _zbbPlot["default"](dom);
  this.canvas = dom;
  this.opts = opts;
  this.axisTextInterval = 10;
  this.img = null;
  var space = 30;
  var textSpace = 20;
  var scaleSpace = 10;
  this.Boundary = {
    x: 0,
    y: 0,
    width: dom.width,
    height: dom.height
  };
  this.topAxisBoundary = {
    x: this.Boundary.x + space,
    y: this.Boundary.y,
    width: this.Boundary.width - space * 2,
    height: space
  }; // 坐标文字盒子

  this.topAxisTextBoundary = {
    x: this.topAxisBoundary.x,
    y: this.topAxisBoundary.y,
    width: this.topAxisBoundary.width,
    height: textSpace,
    marginLeft: -3,
    marginTop: 10
  }; // 坐标刻度线盒子

  this.topAxisScaleBoundary = {
    x: this.topAxisTextBoundary.x,
    y: this.topAxisTextBoundary.y + this.topAxisTextBoundary.height,
    width: this.topAxisBoundary.width,
    height: scaleSpace,
    marginLeft: 10,
    marginTop: 0
  };
  this.bottomAxisBoundary = {
    x: this.Boundary.x + space,
    y: this.Boundary.height - space,
    width: this.Boundary.width - space * 2,
    height: space
  }; // 坐标刻度线盒子

  this.bottomAxisScaleBoundary = {
    x: this.bottomAxisBoundary.x,
    y: this.bottomAxisBoundary.y,
    width: this.bottomAxisBoundary.width,
    height: scaleSpace,
    marginLeft: 10,
    marginTop: 0
  };
  this.bottomAxisTextBoundary = {
    x: this.bottomAxisScaleBoundary.x,
    y: this.bottomAxisScaleBoundary.y + this.bottomAxisScaleBoundary.height,
    width: this.bottomAxisBoundary.width,
    height: textSpace,
    marginLeft: -3,
    marginTop: 10
  };
  this.leftAxisBoundary = {
    x: this.Boundary.x,
    y: this.Boundary.y + space,
    width: space,
    height: this.Boundary.height - space * 2
  }; // 坐标文字盒子

  this.leftAxisTextBoundary = {
    x: this.leftAxisBoundary.x,
    y: this.leftAxisBoundary.y,
    width: textSpace,
    height: this.leftAxisBoundary.height,
    marginLeft: 0,
    marginTop: 0
  }; // 坐标刻度线盒子

  this.leftAxisScaleBoundary = {
    x: this.leftAxisTextBoundary.x,
    y: this.leftAxisTextBoundary.y,
    width: scaleSpace,
    height: this.leftAxisBoundary.height,
    marginLeft: textSpace,
    marginTop: 0
  };
  this.rightAxisBoundary = {
    x: this.Boundary.width - space,
    y: this.Boundary.y + space,
    width: space,
    height: this.Boundary.height - space * 2
  }; // 坐标刻度线盒子

  this.rightAxisScaleBoundary = {
    x: this.rightAxisBoundary.x,
    y: this.rightAxisBoundary.y,
    width: scaleSpace,
    height: this.rightAxisBoundary.height,
    marginLeft: 0,
    marginTop: 0
  }; // 坐标文字盒子

  this.rightAxisTextBoundary = {
    x: this.rightAxisScaleBoundary.x,
    y: this.rightAxisScaleBoundary.y,
    width: textSpace,
    height: this.rightAxisBoundary.height,
    marginLeft: textSpace,
    marginTop: 0
  };
  this.gridBoundary = {
    x: this.leftAxisBoundary.x + this.leftAxisBoundary.width,
    y: this.topAxisBoundary.y + this.topAxisBoundary.height,
    width: this.Boundary.width - this.leftAxisBoundary.width - this.rightAxisBoundary.width,
    height: this.Boundary.height - this.topAxisBoundary.height - this.bottomAxisBoundary.height
  };
}

WiggleChart.prototype = {
  drawAxis: function drawAxis() {
    if (this.opts.topAxis) {
      this.drawHorizontalAxisScale(this.topAxisScaleBoundary);
      this.drawHorizontalAxisText(this.topAxisTextBoundary);
    }

    if (this.opts.bottomAxis) {
      this.drawHorizontalAxisScale(this.bottomAxisScaleBoundary);
      this.drawHorizontalAxisText(this.bottomAxisTextBoundary);
    }

    if (this.opts.leftAxis) {
      this.drawVerticalAxisScale(this.leftAxisScaleBoundary);
      this.drawVerticalAxisText(this.leftAxisTextBoundary);
    }

    if (this.opts.rightAxis) {
      this.drawVerticalAxisScale(this.rightAxisScaleBoundary);
      this.drawVerticalAxisText(this.rightAxisTextBoundary);
    }
  },
  drawGrid: function drawGrid() {
    this.zp.drawRect({
      x: this.gridBoundary.x,
      y: this.gridBoundary.y,
      width: this.gridBoundary.width,
      height: this.gridBoundary.height,
      style: {
        lineWidth: 1
      }
    });
  },
  drawData: function drawData() {
    this.img = this.zp.createImg(this.gridBoundary.width, this.gridBoundary.height);
    this.timeStart = 0;
    this.timeEnd = this.opts.data[0].length;
    this.depthStart = 0;
    this.depthEnd = this.opts.data.length;
    var depthLen = this.depthEnd - this.depthStart;
    var timeLen = this.timeEnd - this.timeStart;
    var w = this.gridBoundary.width;
    var h = this.gridBoundary.height;
    this.timeInterval = 1;
    this.depthInterval = 1;
    this.traceOffsetPixel = w / depthLen;
    this.traceInfo = [];
    var gain = this.opts.gain;
    var maxValueList = [];
    var minValueList = [];
    this.opts.data.forEach(function (item) {
      maxValueList.push(Math.max.apply(Math, _toConsumableArray(item)));
      minValueList.push(Math.min.apply(Math, _toConsumableArray(item)));
    });
    var maxValue = Math.max.apply(Math, maxValueList);
    var minValue = Math.min.apply(Math, minValueList);

    for (var i = 0; i < this.opts.data.length; i++) {
      this.traceInfo.push({
        depth: this.traceOffsetPixel * i
      });
    }

    for (var _i = 0; _i < depthLen; _i++) {
      for (var j = 0; j < timeLen - 1; j++) {
        var p1 = {
          depth: this.traceInfo[_i].depth,
          y: (j - this.timeStart) / timeLen * h,
          z: this.opts.data[_i][j] / (maxValue - minValue) * gain * this.traceOffsetPixel * 2
        };
        var p2 = {
          depth: this.traceInfo[_i].depth,
          y: (j + 1 - this.timeStart) / timeLen * h,
          z: this.opts.data[_i][j + 1] / (maxValue - minValue) * gain * this.traceOffsetPixel * 2
        };

        for (var m = parseInt(p1.y); m < p2.y; m++) {
          var th = p1.z + (p2.z - p1.z) * (m - p1.y) / (p2.y - p1.y);

          for (var n = parseInt(p1.depth); n < th + p1.depth; n++) {
            this.zp.drawPixel(n, m, 'rgba(0, 0, 0, 255)', this.img);
          }

          if (th < 0) {
            this.zp.drawPixel(parseInt(p1.depth + th), m, 'rgba(0, 0, 0, 255)', this.img);
          }
        }
      }
    }

    this.zp.putImg(this.gridBoundary.x, this.gridBoundary.y, this.img);
  },
  // 画字体
  drawHorizontalAxisText: function drawHorizontalAxisText(axisTextBoundary) {
    var _ref = this.opts.xDomain || [0, this.opts.data.length - 1],
        _ref2 = _slicedToArray(_ref, 2),
        min = _ref2[0],
        max = _ref2[1];

    var range = max - min;
    var textCount = range / this.axisTextInterval;
    var _ref3 = [axisTextBoundary.x, axisTextBoundary.y],
        orginX = _ref3[0],
        orginY = _ref3[1];

    for (var i = min; i <= max; i++) {
      this.zp.drawText({
        x: orginX + Math.round(i * axisTextBoundary.width / textCount) + axisTextBoundary.marginLeft,
        y: orginY + axisTextBoundary.marginTop,
        str: min + i * this.axisTextInterval,
        style: {
          fillStyle: 'black'
        }
      });
    }
  },
  drawHorizontalAxisScale: function drawHorizontalAxisScale(axisScaleBoundary) {
    var _ref4 = this.opts.xDomain || [0, this.opts.data.length - 1],
        _ref5 = _slicedToArray(_ref4, 2),
        min = _ref5[0],
        max = _ref5[1];

    var range = max - min;
    var textCount = range / this.axisTextInterval;
    var _ref6 = [axisScaleBoundary.x, axisScaleBoundary.y],
        orginX = _ref6[0],
        orginY = _ref6[1];
    var shortTick = 3;
    var longTick = 10;
    var tickLength;
    var scaleCount = textCount;

    for (var i = min; i <= max; i++) {
      if (i % (scaleCount / textCount) == 0) {
        tickLength = longTick;
      } else {
        tickLength = shortTick;
      }

      this.zp.drawLine({
        x1: Math.round(orginX + i * axisScaleBoundary.width / scaleCount),
        y1: orginY + axisScaleBoundary.marginTop,
        x2: Math.round(orginX + i * axisScaleBoundary.width / scaleCount),
        y2: orginY + tickLength + axisScaleBoundary.marginTop
      });
    }
  },
  // 画字体
  drawVerticalAxisText: function drawVerticalAxisText(axisTextBoundary) {
    var _ref7 = this.opts.yDomain || [0, this.opts.data[0].length - 1],
        _ref8 = _slicedToArray(_ref7, 2),
        min = _ref8[0],
        max = _ref8[1];

    var range = max - min;
    var textCount = range / this.axisTextInterval;
    var _ref9 = [axisTextBoundary.x, axisTextBoundary.y],
        orginX = _ref9[0],
        orginY = _ref9[1];

    for (var i = min; i <= max; i++) {
      this.zp.drawText({
        x: orginX + axisTextBoundary.marginLeft,
        y: orginY + Math.round(i * axisTextBoundary.height / textCount) + axisTextBoundary.marginTop,
        str: min + i * this.axisTextInterval,
        style: {
          fillStyle: 'red'
        }
      });
    }
  },
  drawVerticalAxisScale: function drawVerticalAxisScale(axisScaleBoundary) {
    var _ref10 = this.opts.yDomain || [0, this.opts.data[0].length - 1],
        _ref11 = _slicedToArray(_ref10, 2),
        min = _ref11[0],
        max = _ref11[1];

    var range = max - min;
    var textCount = range / this.axisTextInterval;
    var _ref12 = [axisScaleBoundary.x, axisScaleBoundary.y],
        orginX = _ref12[0],
        orginY = _ref12[1];
    var shortTick = 3;
    var longTick = 10;
    var tickLength;
    var scaleCount = textCount;

    for (var i = min; i <= max; i++) {
      if (i % (scaleCount / textCount) == 0) {
        tickLength = longTick;
      } else {
        tickLength = shortTick;
      }

      this.zp.drawLine({
        x1: orginX + axisScaleBoundary.marginLeft,
        y1: Math.round(orginY + i * axisScaleBoundary.height / scaleCount),
        x2: orginX + tickLength + axisScaleBoundary.marginLeft,
        y2: Math.round(orginY + i * axisScaleBoundary.height / scaleCount)
      });
    }
  },
  // 数据转为像素坐标
  dataToPoint: function dataToPoint(data, domain, range) {
    return this.zp.utils.linearMap(data, domain, range);
  },
  render: function render() {
    this.drawData();
    this.drawGrid();
    this.drawAxis();
  },
  refresh: function refresh(opts) {
    this.opts = opts;
    this.clear();
    this.render();
  },
  destroy: function destroy() {
    // this.removeEvent();
    this.zp = null;
    this.canvas = null;
  },
  clear: function clear() {
    this.zp.clear();
  },
  init: function init() {
    this.clear();
    this.render(); // this.addEvent();
  }
};
var _default = WiggleChart;
exports["default"] = _default;