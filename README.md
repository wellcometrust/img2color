# img2color

A function which loads a given image and calculates a dominant colour suitable for background elements, as well as the unprocessed average colour.

### Requirements

+ Node.js 8+ (uses Promises and generators)

### Usage

```js
const img2color = require('img2color');

img2color('./img/1.jpg')
  .then(colors => console.log(colors));

/*
output:

{
  hex: {
    averageColor: '#998c80',
    color: '#ad8a68'
  },
  rgb: {
    averageColor: [ 153, 140, 128 ],
    color: { r: 173, g: 138, b: 104 }
  },
  hsv: {
    averageColor: { h: 29, s: 40, v: 68 },
    hsvColor: { h: 29, s: 40, v: 68 }
  }
}

*/

```
