/**
 * LISENCE MIT.
 * Copyright luckydrq<drqzju@gmail.com>
 *
 * - character.js
 */

exports.UPPERCASE_LETTER = 1;
exports.LOWERCASE_LETTER = 2;
exports.TITLECASE_LETTER = 3;
exports.MODIFIER_LETTER = 4;
exports.OTHER_LETTER = 5;

exports.isLetter = function(codePoint) {
  return ((((1 << exports.UPPERCASE_LETTER) |
    (1 << exports.LOWERCASE_LETTER) |
    (1 << exports.TITLECASE_LETTER) |
    (1 << exports.MODIFIER_LETTER) |
    (1 << exports.OTHER_LETTER)) >> getType(codePoint)) & 1) !== 0;
};

exports.forDigit = function(digit, radix) {
  if ((digit >= radix) || (digit < 0)) {
    return '\0';
  }
  // MIN_RADIX, MAX_RADIX
  if ((radix < 2) || (radix > 36)) {
    return '\0';
  }
  if (digit < 10) {
    return String(digit);
  }
  return String.fromCharCode('a'.charCodeAt(0) - 10 + digit);
};
