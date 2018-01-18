const fs = require('fs');
const jimp = require('jimp');
const rgbhex = require('rgb-hex');
const Colr = require('colr');
const arange = require('./range.js').arange;

const DEFAULT_SATURATION_OFFSET = 24;
const DEFAULT_VALUE_OFFSET = 8;

/**
 * Loads a given image and calculates a dominant colour suitable for background elements, as well as the unprocessed average colour.
 *
 * @param      {string}  path     The path to the image file
 * @param      {object}  options  [optional] HSV adjustment options (`saturationOffset (24)` and `valueOffset (8)`, both range from 0 to 100)
 * @return     {Promise}  Promise which resolves to an object containing hex, RGB and HSV colour values
 */
const img2color = (path, options = {}) => {
  const saturationOffset = options.saturationOffset || DEFAULT_SATURATION_OFFSET;
  const valueOffset = options.valueOffset || DEFAULT_VALUE_OFFSET;

  return jimp
    .read(path)
    .then(image => {
      const pixelCount = image.bitmap.width * image.bitmap.height;

      const averageColor = arange(0, pixelCount)
        .map(i => {
          const pixel = image.bitmap.data.slice(i * 4, i * 4 + 3);

          return Array.from(Uint8Array.from(pixel));
        })
        .reduce((acc, it) => {
          acc.map((x, i) => x + (it[i] || 0))
        }, [0, 0, 0])
        .map(c => Math.floor(c / pixelCount));

      const hsvAverageColor = Colr.fromRgbArray(averageColor).toHsvObject();

      const hsvColor = Object.assign(hsvAverageColor, {
        s: Math.min(100, hsvAverageColor.s + saturationOffset),
        v: Math.min(100, hsvAverageColor.v + valueOffset)
      });

      const color = Colr.fromHsvObject(hsvColor).toRgbObject();

      return Promise.resolve({
        hex: {
          averageColor: Colr.fromRgbArray(averageColor).toHex(),
          color: Colr.fromRgbObject(color).toHex()
        },
        rgb: {
          averageColor,
          color
        },
        hsv: {
          averageColor: hsvAverageColor,
          color: hsvColor
        }
      });
    });
};

module.exports = img2color;
