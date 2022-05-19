function isHex(color) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
}
function isRgb(color) {
  return /^rgba?/.test(color);
}
function rgbStringToArr(str) {
  let arr = str.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/).splice(1);

  return arr.map((item) => { return Number(item) });
}
function rgbaArrToString(arr) {
  return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]})`;
}
function rgbToHex(r, g, b) {
  var hex = ((r << 16) | (g << 8) | b).toString(16);
  return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex;
}
function hexToRgb(hex) {
  var rgb = [];
  for (var i = 1; i < 7; i += 2) {
    rgb.push(parseInt("0x" + hex.slice(i, i + 2)));
  }
  return rgb;
}
function hexToRgba(hex, a) {
  var rgba = [];
  for (var i = 1; i < 7; i += 2) {
    rgba.push(parseInt("0x" + hex.slice(i, i + 2)));
  }
  rgba.push(a);
  return rgba;
}
function gradient(startColor, endColor, step) {
  var sColor, eColor;
  if (isHex(startColor)) {
    sColor = hexToRgb(startColor);
  } else if (isRgb(startColor)) {
    sColor = rgbStringToArr(startColor);
  } else {
    return;
  }
  if (isHex(endColor)) {
    eColor = hexToRgb(endColor);
  } else if (isRgb(endColor)) {
    eColor = rgbStringToArr(endColor);
  } else {
    return;
  }
  var rStep = (eColor[0] - sColor[0]) / step,
    gStep = (eColor[1] - sColor[1]) / step,
    bStep = (eColor[2] - sColor[2]) / step;

  var gradientColorArr = [];
  for (var i = 0; i < step; i++) {
    gradientColorArr.push(rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2])));
  }
  return gradientColorArr;
}
function getIndexByObjName(arr, name) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === name) {
      return i;
    }
  }
  return -1;
}

function linearMap(val, domain, range, clamp) {
  var subDomain = domain[1] - domain[0];
  var subRange = range[1] - range[0];

  if (subDomain === 0) {
    return subRange === 0
      ? range[0]
      : (range[0] + range[1]) / 2;
  }

  if (clamp) {
    if (subDomain > 0) {
      if (val <= domain[0]) {
        return range[0];
      }
      else if (val >= domain[1]) {
        return range[1];
      }
    }
    else {
      if (val >= domain[0]) {
        return range[0];
      }
      else if (val <= domain[1]) {
        return range[1];
      }
    }
  }
  else {
    if (val === domain[0]) {
      return range[0];
    }
    if (val === domain[1]) {
      return range[1];
    }
  }

  return (val - domain[0]) / subDomain * subRange + range[0];
}

  function getAvg(array) {
    let sum = 0;
    array.forEach(a => {
      sum += a;
    })
    return (sum / array.length).toFixed(1);
  }
export default {
  isHex,
  isRgb,
  rgbStringToArr,
  rgbaArrToString,
  rgbToHex,
  hexToRgb,
  hexToRgba,
  gradient,
  getIndexByObjName,
  linearMap,
  getAvg,
}