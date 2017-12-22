var utils = require('../../app/utils.js');

var formatHexNumber = utils.formatHexNumber,
    parseHexCode = utils.parseHexCode,
    generateHexString = utils.generateHexString,
    validate_rgb_number = utils.validate_rgb_number,
    validateHexCode = utils.validateHexCode;

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

    it("RGB dict (255,255,0) should return hex of 'ffff00'", function() {
      var rgb = {
        red: 255,
        green: 255,
        blue: 0
      };
      var hexString = generateHexString(rgb);
      expect(hexString).toEqual("ffff00");
    });

    it("RGB dict (255,0,0) should return hex of 'ff0000'", function() {
      var rgb = {
        red: 255,
        green: 0,
        blue: 0
      };
      var hexString = generateHexString(rgb);
      expect(hexString).toEqual("ff0000");
    });

    it("RGB dict (0,255,0) should return hex of '00ff00'", function() {
      var rgb = {
        red: 0,
        green: 255,
        blue: 0
      };
      var hexString = generateHexString(rgb);
      expect(hexString).toEqual("00ff00");
    });

    it("RGB dict (0,0,255) should return hex of '0000ff'", function() {
      var rgb = {
        red: 0,
        green: 0,
        blue: 255
      };
      var hexString = generateHexString(rgb);
      expect(hexString).toEqual("0000ff");
    });

    it("RGB dict (0,255,255) should return hex of '00ffff'", function() {
      var rgb = {
        red: 0,
        green: 255,
        blue: 255
      };
      var hexString = generateHexString(rgb);
      expect(hexString).toEqual("00ffff");
    });

    it("RGB dict (9,9,9) should return hex of '090909'", function() {
      var rgb = {
        red: 9,
        green: 9,
        blue: 9
      };
      var hexString = generateHexString(rgb);
      expect(hexString).toEqual("090909");
    });

    it("RGB dict (10,10,10) should return hex of '0A0A0A'", function() {
      var rgb = {
        red: 10,
        green: 10,
        blue: 10
      };
      var hexString = generateHexString(rgb);
      expect(hexString).toEqual("0a0a0a");
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

    it("Hex 'gggggg' should return RGB of (255,255,255) after validation", function() {
      var hex = "gggggg";
      var validatedHex = validateHexCode(hex);
      var rgb = parseHexCode(validatedHex);
      var rgbExpect = {
        red: 255,
        green: 255,
        blue: 255
      }
      expect(rgb).toEqual(rgbExpect);
      expect(validatedHex).toEqual("ffffff");
    });

    it("Hex 'ggff00' should return RGB of (255,255,0) after validation", function() {
      var hex = "ggff00";
      var validatedHex = validateHexCode(hex);
      var rgb = parseHexCode(validatedHex);
      var rgbExpect = {
        red: 255,
        green: 255,
        blue: 0
      }
      expect(rgb).toEqual(rgbExpect);
      expect(validatedHex).toEqual("ffff00");
    });

  });

  describe("Hex validation", function() {

    it("Hex 'gg0000' should correct to ff0000", function() {
      var hex = "gg0000";
      var validatedHex = validateHexCode(hex);
      expect(validatedHex).toEqual("ff0000");
    });

    it("Hex 'gggggg' should correct to ffffff", function() {
      var hex = "gggggg";
      var validatedHex = validateHexCode(hex);
      expect(validatedHex).toEqual("ffffff");
    });

    it("Hex 'ffffff' should return intact", function() {
      var hex = "ffffff";
      var validatedHex = validateHexCode(hex);
      expect(validatedHex).toEqual("ffffff");
    });

    it("Hex '000000' should return intact", function() {
      var hex = "000000";
      var validatedHex = validateHexCode(hex);
      expect(validatedHex).toEqual("000000");
    });

    it("Hex 'ff0000' should return intact", function() {
      var hex = "ff0000";
      var validatedHex = validateHexCode(hex);
      expect(validatedHex).toEqual("ff0000");
    });

    it("Hex '00ff00' should return intact", function() {
      var hex = "00ff00";
      var validatedHex = validateHexCode(hex);
      expect(validatedHex).toEqual("00ff00");
    });

    it("Hex '0000ff' should return intact", function() {
      var hex = "0000ff";
      var validatedHex = validateHexCode(hex);
      expect(validatedHex).toEqual("0000ff");
    });

  });

  describe("Hex formatting", function() {

    it("Expect 0 to be encoded as 00 in hex", function() {
      var number = 0;
      var hex = formatHexNumber(number);
      expect(hex).toEqual("00");
    });

    it("Expect 15 to be encoded as 0f in hex", function() {
      var number = 15;
      var hex = formatHexNumber(number);
      expect(hex).toEqual("0f");
    });

    it("Expect 9 to be encoded as 09 in hex", function() {
      var number = 9;
      var hex = formatHexNumber(number);
      expect(hex).toEqual("09");
    });

    it("Expect 16 to be encoded as 10 in hex", function() {
      var number = 16;
      var hex = formatHexNumber(number);
      expect(hex).toEqual("10");
    });

    it("Expect 255 to be encoded as ff in hex", function() {
      var number = 255;
      var hex = formatHexNumber(number);
      expect(hex).toEqual("ff");
    });

    it("Expect 10 to be encoded as 0a in hex", function() {
      var number = 10;
      var hex = formatHexNumber(number);
      expect(hex).toEqual("0a");
    });

  });

  describe("RGB vaidation", function() {

    it("Expect -5 to be changed to 0", function() {
      var number = -5;
      var final = validate_rgb_number(number);
      expect(final).toEqual(0);
    });

    it("Expect 0 to be unchanged", function() {
      var number = 0;
      var final = validate_rgb_number(number);
      expect(final).toEqual(0);
    });

    it("Expect 255 to be unchanged", function() {
      var number = 255;
      var final = validate_rgb_number(number);
      expect(final).toEqual(255);
    });

    it("Expect 276 to be changed to 255", function() {
      var number = 276;
      var final = validate_rgb_number(number);
      expect(final).toEqual(255);
    });

    it("Expect undefined, null or empty to string to be recorded as empty string in Store for UX purposes", function() {
      expect(validate_rgb_number("")).toEqual("");
      expect(validate_rgb_number(undefined)).toEqual("");
      expect(validate_rgb_number(null)).toEqual("");
    });

  });

});
