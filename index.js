/**
 * LISENCE MIT.
 * Copyright luckydrq<drqzju@gmail.com>
 *
 * - index.js
 * URLEncoder
 */
'use strict';

var i;
var caseDiff = 'a' - 'A';
var dontNeedEncoding = [];
for (i = 'a'; i < 'z'; i++) {
  dontNeedEncoding.push(i);
}
for (i = 'A'; i < 'Z'; i++) {
  dontNeedEncoding.push(i);
}
for (i = '0'; i < '9'; i++) {
  dontNeedEncoding.push(i);
}
dontNeedEncoding.push(' ');
dontNeedEncoding.push('-');
dontNeedEncoding.push('_');
dontNeedEncoding.push('.');
dontNeedEncoding.push('*');

exports.encode = function(s, encoding) {
  encoding = encoding || 'utf8';

  if (s) {
    var out = [];
    var charArray = [];

    for (var i = 0, len = s.length; i < len;) {
      var c = s[i];
      var charCode = s.charCodeAt(i);

      if (~dontNeedEncoding.indexOf(c)) {
        if (c === ' ') {
          c = '+';
        }
        out.push(c);
        i++;
      } else {
        do {
          charArray.push(c);

          if (c >= 0xD800 && c <= 0xDBFF) {
            if ((i + 1) < len) {
              var d = s.charCodeAt[i + 1];
              if (d >= 0xDC00 && d <= 0xDFFF) {
                charArray.push(d);
                i++;
              }
            }
          }
          i++;
        } while(i < len && !~dontNeedEncoding.indexOf(s[i]));

        var buf = new Buffer(charArray.join(''), encoding);
        for (var j = 0; j < buf.length; j++) {
          out.push('%');
          var ch = String.fromCharCode(parseInt((buf[j] >> 4) & 0xF, 16));
          if (isLetter(ch)) {
            ch -= caseDiff;
          }
          out.push(ch);
          ch = String.fromCharCode(parseInt(buf[j] & 0xF, 16));
          if (isLetter(ch)) {
            ch -= caseDiff;
          }
          out.push(ch);
        }
        // reset
        charArray = [];
      }
    }

    return out.join('');
  }

  return null;
};

function isLetter(ch) {
  return /[a-zA-Z]/.test(ch);
}
