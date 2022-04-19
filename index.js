var robotjs = require('node-gyp-build')(__dirname);

module.exports = robotjs;

module.exports.screen = {};

function bitmap(width, height, byteWidth, bitsPerPixel, bytesPerPixel, image)
{
    this.width = width;
    this.height = height;
    this.byteWidth = byteWidth;
    this.bitsPerPixel = bitsPerPixel;
    this.bytesPerPixel = bytesPerPixel;
    this.image = image;

    function toHex(n)
    {
        return n.toString(16).padStart(2, '0');
    }


    this.colorAt = function(x, y)
    {
        const buffer = this.image;
        const startIndex = (y * this.width + x) * this.bytesPerPixel;

        if (typeof buffer[startIndex + 2] === 'undefined') {
          throw new Error(`point out of range: (${x}, ${y})`);
        }

        let ret = '';
        ret += toHex(buffer[startIndex + 2]);
        ret += toHex(buffer[startIndex + 1]);
        ret += toHex(buffer[startIndex]);

        return ret;
    };

}

module.exports.screen.capture = function(x, y, width, height)
{
    //If coords have been passed, use them.
    if (typeof x !== "undefined" && typeof y !== "undefined" && typeof width !== "undefined" && typeof height !== "undefined")
    {
        b = robotjs.captureScreen(x, y, width, height);
    }
    else
    {
        b = robotjs.captureScreen();
    }

    return new bitmap(b.width, b.height, b.byteWidth, b.bitsPerPixel, b.bytesPerPixel, b.image);
};
