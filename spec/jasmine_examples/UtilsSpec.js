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

    it("RGB dict (275,275,275) should return hex of 'ffffff'", function() {
      var rgb = {
        red: 275,
        green: 275,
        blue: 275
      };
      var hexString = generateHexString(rgb);
      expect(hexString).toEqual("ffffff");
    });

    it("RGB dict (-5,-5,-5) should return hex of '000000'", function() {
      var rgb = {
        red: -5,
        green: -5,
        blue: -5
      };
      var hexString = generateHexString(rgb);
      expect(hexString).toEqual("000000");
    });

  });

  describe("Hex to RGB conversions", function() {

    it("Hex 'f' should return RGB of (15,0,0)", function() {
      var hex = "f";
      var rgb = parseHexCode(hex);
      var rgbExpect = {
        red: 15,
        green: 0,
        blue: 0
      }
      expect(rgb).toEqual(rgbExpect);
    });

    it("Hex 'ff' should return RGB of (255,0,0)", function() {
      var hex = "ff";
      var rgb = parseHexCode(hex);
      var rgbExpect = {
        red: 255,
        green: 0,
        blue: 0
      }
      expect(rgb).toEqual(rgbExpect);
    });

    it("Hex 'fff' should return RGB of (255,15,0)", function() {
      var hex = "fff";
      var rgb = parseHexCode(hex);
      var rgbExpect = {
        red: 255,
        green: 15,
        blue: 0
      }
      expect(rgb).toEqual(rgbExpect);
    });

    it("Hex 'ffff' should return RGB of (255,255,0)", function() {
      var hex = "ffff";
      var rgb = parseHexCode(hex);
      var rgbExpect = {
        red: 255,
        green: 255,
        blue: 0
      }
      expect(rgb).toEqual(rgbExpect);
    });

    it("Hex 'fffff' should return RGB of (255,255,15)", function() {
      var hex = "fffff";
      var rgb = parseHexCode(hex);
      var rgbExpect = {
        red: 255,
        green: 255,
        blue: 15
      }
      expect(rgb).toEqual(rgbExpect);
    });

    it("Hex 'ffffff' should return RGB of (255,255,255)", function() {
      var hex = "ffffff";
      var rgb = parseHexCode(hex);
      var rgbExpect = {
        red: 255,
        green: 255,
        blue: 255
      }
      expect(rgb).toEqual(rgbExpect);
    });

    it("Hex 'gggggg' should return RGB of (255,255,255)", function() {
      var hex = "gggggg";
      var rgb = parseHexCode(hex);
      var rgbExpect = {
        red: 255,
        green: 255,
        blue: 255
      }
      expect(rgb).toEqual(rgbExpect);
    });

  });

});
