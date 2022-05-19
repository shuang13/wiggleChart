import utils from './utils'
let DEFAULT_STYLE_CONFIG = {
  LINE: {
    lineWidth: 1,
  },
  TEXT: {
    fillStyle: '#000',
    fontSize: '12px',
  },
  RECT: {

  },
  LINE_BY_MOUSE: {
    strokeStyle: "blue",
    lineJoin: "round",
    lineWidth: 1,
  }

}
function ZbbPlot(dom) {
  this.canvas = dom;
  this.ctx = dom.getContext('2d');
  this.halfPixel = 0.5;
  this.utils = utils;
  this.clickX = Array(100);
  this.clickY = Array(100);
  this.clickDrag = Array(100);
}
ZbbPlot.prototype = {
  // 画字体
  drawText: function (opts) {
    let maginLeft = 0;
    let maginTop = 6;
    let style = opts.style || {};
    this.ctx.beginPath();
    for (let key in DEFAULT_STYLE_CONFIG.TEXT) {
      this.ctx[key] = DEFAULT_STYLE_CONFIG.TEXT[key];
    }
    for (let key in style) {
      this.ctx[key] = style[key];
    }

    this.ctx.fillText(opts.str, opts.x + maginLeft, opts.y + maginTop);
    this.ctx.closePath();
  },
  // 画线
  drawLine: function (opts) {
    let style = opts.style || {};

    this.ctx.beginPath();
    for (let key in DEFAULT_STYLE_CONFIG.LINE) {
      this.ctx[key] = DEFAULT_STYLE_CONFIG.LINE[key];
    }
    for (let key in style) {
      this.ctx[key] = style[key];
    }
    this.subPixel(this.ctx.lineWidth);
    this.ctx.moveTo(opts.x1 + this.halfPixel, opts.y1 + this.halfPixel);
    this.ctx.lineTo(opts.x2 + this.halfPixel, opts.y2 + this.halfPixel);
    this.ctx.stroke();
    this.ctx.closePath();
  },
  // 画矩形
  drawRect: function (opts) {
    this.ctx.beginPath();
    this.subPixel(opts.style.lineWidth);
    if (opts.style.fillStyle) {
      this.ctx.fillStyle = opts.style.fillStyle;
      this.ctx.fillRect(opts.x + this.halfPixel, opts.y + this.halfPixel, opts.width, opts.height);
    }
    if (opts.style.lineWidth) {
      this.ctx.lineWidth = opts.style.lineWidth;
      this.ctx.strokeStyle = "#000";
      this.ctx.strokeRect(opts.x + this.halfPixel, opts.y + this.halfPixel, opts.width, opts.height);
    }
    this.ctx.closePath();
  },
  createImg: function(w, h) {
    return this.ctx.createImageData(w, h);
  },
  putImg: function(x, y, img) {
    this.ctx.putImageData(img, x, y);
  },
  
  drawPixel: function(x, y, color, img) {
    
    let rgb = utils.rgbStringToArr(color);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    let a = rgb[3];
    let w = img.width;

    img.data[(y * w + x)* 4 + 0] = r;
    img.data[(y * w + x)* 4 + 1] = g;
    img.data[(y * w + x)* 4 + 2] = b;
    img.data[(y * w + x)* 4 + 3] = a;

  },
  // 画矩形
  drawWiggleLeftRect: function (opts) {
    let style = opts.style || {};

    for (let key in DEFAULT_STYLE_CONFIG.LINE) {
      this.ctx[key] = DEFAULT_STYLE_CONFIG.LINE[key];
    }
    for (let key in style) {
      this.ctx[key] = style[key];
    }
    this.subPixel(this.ctx.lineWidth);

    

    this.ctx.beginPath();
    this.ctx.moveTo(opts.x + this.halfPixel, opts.y + this.halfPixel);
    this.ctx.lineTo(opts.x+opts.width + this.halfPixel, opts.y + this.halfPixel);
    this.ctx.closePath();
    this.ctx.strokeStyle = '#fff';

    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(opts.x + this.halfPixel, opts.y +opts.height+ this.halfPixel);
    this.ctx.lineTo(opts.x + this.halfPixel, opts.y + this.halfPixel);
    this.ctx.closePath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.stroke();


    this.ctx.beginPath();
    this.ctx.moveTo(opts.x+opts.width + this.halfPixel, opts.y +opts.height+ this.halfPixel);
    this.ctx.lineTo(opts.x + this.halfPixel, opts.y +opts.height+ this.halfPixel);
    this.ctx.closePath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.stroke();

    
    this.ctx.beginPath();
    this.ctx.moveTo(opts.x+opts.width + this.halfPixel, opts.y + this.halfPixel);
    this.ctx.lineTo(opts.x+opts.width + this.halfPixel, opts.y +opts.height+ this.halfPixel);
    this.ctx.closePath();
    this.ctx.strokeStyle = '#000';
    this.ctx.stroke();

    

    

  },
  createLinearGradient: function (x, y, x2, y2) {
    return this.ctx.createLinearGradient(x, y, x2, y2);
  },
  // 线条像素优化
  subPixel: function (lineWidth) {
    if (lineWidth % 2 == 1) {
      this.halfPixel = 0.5;
    } else {
      this.halfPixel = 0;
    }
  },

  addClick: function (x, y, dragging) {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);

  },
  reDrawLineByMouse: function (opts) {
    let option = opts || {};
    let style = option.style || {};

    for (let key in DEFAULT_STYLE_CONFIG.LINE_BY_MOUSE) {
      this.ctx[key] = DEFAULT_STYLE_CONFIG.LINE_BY_MOUSE[key];
    }
    for (let key in style) {
      this.ctx[key] = style[key];
    }
    for (var i = 0; i < this.clickX.length; i++) {
      this.ctx.beginPath();
      if (this.clickDrag[i] && i) {//当是拖动而且i!=0时，从上一个点开始画线。
        this.ctx.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
      } else {
        this.ctx.moveTo(this.clickX[i] - 1, this.clickY[i]);
      }

      this.ctx.lineTo(this.clickX[i], this.clickY[i]);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  },
  clearLineByMouse() {
    this.clickX.splice(0);
    this.clickY.splice(0);
    this.clickDrag.splice(0);

  },
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.clearLineByMouse();
  }
}
export default ZbbPlot;