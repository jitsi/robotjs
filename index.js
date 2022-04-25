var robotjs = require('node-gyp-build')(__dirname);

module.exports = robotjs;

module.exports.screen = {};

function toHex(n)
{
    return n.toString(16).padStart(2, '0');
}

function bitmap(width, height, byteWidth, bitsPerPixel, bytesPerPixel, image)
{
    this.width = width;
    this.height = height;
    this.byteWidth = byteWidth;
    this.bitsPerPixel = bitsPerPixel;
    this.bytesPerPixel = bytesPerPixel;
    this.image = image;

    this.colorAt = function(x, y)
    {
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error(`Invalid number`);
        }

        const buffer = this.image;
        const startIndex = (y * this.width + x) * this.bytesPerPixel;

        if (x < 0 || x >= this.width || y < 0 || y >= this.height || typeof buffer[startIndex + 2] === 'undefined') {
            throw new Error(`(${x}, ${y}) are outside the bitmap`);
        }

        return `${toHex(buffer[startIndex + 2])}${toHex(buffer[startIndex + 1])}${toHex(buffer[startIndex])}`;
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
