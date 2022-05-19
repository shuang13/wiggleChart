# wiggleChart
> a chart of geological section by javascript.

[DEMO](https://shuang13.github.io/wiggleChart/test/wiggleChart.html)

# Instllation

## npm 
``` bash
# install dependencies
npm install

# build && test
npm start
```

# Usage
``` html
<canvas class='wiggle-canvas' width="1500" height="600"></canvas>

<script>
  const opts = {
    data: null,
    topAxis: true,
    leftAxis: false,
    rightAxis: false,
    bottomAxis: true,
    xDomain: [0, 100],
    yDomain: [0, 100],
    gain: 1,

  }
  const wc = new wiggleChart(document.querySelector('.wiggle-canvas'), opts);
  wc.init();
</script>
```

# License

[The MIT License](http://opensource.org/licenses/MIT)
