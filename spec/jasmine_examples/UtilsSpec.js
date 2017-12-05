var utils = require('../../app/utils.js');

var formatHexNumber = utils.formatHexNumber,
    parseHexCode = utils.parseHexCode,
    generateHexString = utils.generateHexString,
    validate_rgb_number = utils.validate_rgb_number;

describe("Utils", function() {

  describe("RGB to hex conversions", function() {

    it("RGB dict (255,255,255) should return hex of 'ffffff'", function() {
      var rgb = {
        red: 255,
        green: 255,
        blue: 255
      };
      var hexString = generateHexString(rgb);
      expect(hexString).toEqual("ffffff");
    });

    it("RGB dict (275,275,275) should return hex of 'ffffff' after correction for out of bounds", function() {
      var rgb = {
        red: 275,
        green: 275,
        blue: 275
      };
      var hexString = generateHexString(rgb);
      expect(hexString).toEqual("ffffff");
    });

  });

});
