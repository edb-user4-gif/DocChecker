const sharp = require('sharp');

class BlurDetectionAgent {
  async detectBlur(imagePath) {
    try {
      const { data, info } = await sharp(imagePath).greyscale().raw().toBuffer({ resolveWithObject: true });
      const width = info.width;
      const height = info.height;
      const laplacian = [];
      const kernel = [0, 1, 0, 1, -4, 1, 0, 1, 0];
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          let sum = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const idx = (y + ky) * width + (x + kx);
              sum += data[idx] * kernel[(ky + 1) * 3 + (kx + 1)];
            }
          }
          laplacian.push(sum);
        }
      }
      if (laplacian.length === 0) return 0;
      const mean = laplacian.reduce((a, b) => a + b, 0) / laplacian.length;
      if (isNaN(mean)) return 0;
      const variance = laplacian.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / laplacian.length;
      return isNaN(variance) ? 0 : variance;
    } catch (error) {
      console.error('Error in blur detection:', error);
      return 0;
    }
  }
}

module.exports = BlurDetectionAgent;