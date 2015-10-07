(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.PMT = mod.exports;
  }
})(this, function (exports, module) {
  'use strict';

  module.exports = PMT;
  var isnumber = require('formula-isnumber');
  var error = require('formula-errors');

  function PMT(rate, periods, present) {
    var future = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    var type = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

    if (!isnumber(rate) || !isnumber(periods)) {
      return error.value;
    }

    if (rate === 0) {
      return -((present + future) / periods);
    } else {
      var term = Math.pow(1 + rate, periods);
      if (type === 1) {
        return -((future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate));
      } else {
        return -(future * rate / (term - 1) + present * rate / (1 - 1 / term));
      }
    }
  }

  ;
});
