import {
  _classCallCheck,
  _createClass
} from "./chunk-PV26B4MV.js";
import "./chunk-V6C57QHM.js";
import "./chunk-SNAQBZPT.js";

// node_modules/i18next-chained-backend/dist/esm/i18nextChainedBackend.js
var arr = [];
var each = arr.forEach;
var slice = arr.slice;
function defaults(obj) {
  each.call(slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}
function createClassOnDemand(ClassOrObject) {
  if (!ClassOrObject) return null;
  if (typeof ClassOrObject === "function") return new ClassOrObject();
  return ClassOrObject;
}
function getDefaults() {
  return {
    handleEmptyResourcesAsFailed: true,
    cacheHitMode: "none"
    // reloadInterval: typeof window !== 'undefined' ? false : 60 * 60 * 1000
    // refreshExpirationTime: 60 * 60 * 1000
  };
}
function handleCorrectReadFunction(backend, language, namespace, resolver) {
  var fc = backend.read.bind(backend);
  if (fc.length === 2) {
    try {
      var r = fc(language, namespace);
      if (r && typeof r.then === "function") {
        r.then(function(data) {
          return resolver(null, data);
        })["catch"](resolver);
      } else {
        resolver(null, r);
      }
    } catch (err) {
      resolver(err);
    }
    return;
  }
  fc(language, namespace, resolver);
}
var Backend = function() {
  function Backend2(services) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var i18nextOptions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    _classCallCheck(this, Backend2);
    this.backends = [];
    this.type = "backend";
    this.allOptions = i18nextOptions;
    this.init(services, options);
  }
  _createClass(Backend2, [{
    key: "init",
    value: function init(services) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var i18nextOptions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      this.services = services;
      this.options = defaults(options, this.options || {}, getDefaults());
      this.allOptions = i18nextOptions;
      this.options.backends && this.options.backends.forEach(function(b, i) {
        _this.backends[i] = _this.backends[i] || createClassOnDemand(b);
        _this.backends[i].init(services, _this.options.backendOptions && _this.options.backendOptions[i] || {}, i18nextOptions);
      });
      if (this.services && this.options.reloadInterval) {
        setInterval(function() {
          return _this.reload();
        }, this.options.reloadInterval);
      }
    }
  }, {
    key: "read",
    value: function read(language, namespace, callback) {
      var _this2 = this;
      var bLen = this.backends.length;
      var loadPosition = function loadPosition2(pos) {
        if (pos >= bLen) return callback(new Error("non of the backend loaded data", true));
        var isLastBackend = pos === bLen - 1;
        var lengthCheckAmount = _this2.options.handleEmptyResourcesAsFailed && !isLastBackend ? 0 : -1;
        var backend = _this2.backends[pos];
        if (backend.read) {
          handleCorrectReadFunction(backend, language, namespace, function(err, data, savedAt) {
            if (!err && data && Object.keys(data).length > lengthCheckAmount) {
              callback(null, data, pos);
              savePosition(pos - 1, data);
              if (backend.save && _this2.options.cacheHitMode && ["refresh", "refreshAndUpdateStore"].indexOf(_this2.options.cacheHitMode) > -1) {
                if (savedAt && _this2.options.refreshExpirationTime && savedAt + _this2.options.refreshExpirationTime > Date.now()) return;
                var nextBackend = _this2.backends[pos + 1];
                if (nextBackend && nextBackend.read) {
                  handleCorrectReadFunction(nextBackend, language, namespace, function(err2, data2) {
                    if (err2) return;
                    if (!data2) return;
                    if (Object.keys(data2).length <= lengthCheckAmount) return;
                    savePosition(pos, data2);
                    if (_this2.options.cacheHitMode !== "refreshAndUpdateStore") return;
                    if (_this2.services && _this2.services.resourceStore) {
                      _this2.services.resourceStore.addResourceBundle(language, namespace, data2);
                    }
                  });
                }
              }
            } else {
              loadPosition2(pos + 1);
            }
          });
        } else {
          loadPosition2(pos + 1);
        }
      };
      var savePosition = function savePosition2(pos, data) {
        if (pos < 0) return;
        var backend = _this2.backends[pos];
        if (backend.save) {
          backend.save(language, namespace, data);
          savePosition2(pos - 1, data);
        } else {
          savePosition2(pos - 1, data);
        }
      };
      loadPosition(0);
    }
  }, {
    key: "create",
    value: function create(languages, namespace, key, fallbackValue) {
      var clb = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : function() {
      };
      var opts = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
      this.backends.forEach(function(b) {
        if (!b.create) return;
        var fc = b.create.bind(b);
        if (fc.length < 6) {
          try {
            var r;
            if (fc.length === 5) {
              r = fc(languages, namespace, key, fallbackValue, opts);
            } else {
              r = fc(languages, namespace, key, fallbackValue);
            }
            if (r && typeof r.then === "function") {
              r.then(function(data) {
                return clb(null, data);
              })["catch"](clb);
            } else {
              clb(null, r);
            }
          } catch (err) {
            clb(err);
          }
          return;
        }
        fc(languages, namespace, key, fallbackValue, clb, opts);
      });
    }
  }, {
    key: "reload",
    value: function reload() {
      var _this3 = this;
      var _this$services = this.services, backendConnector = _this$services.backendConnector, languageUtils = _this$services.languageUtils, logger = _this$services.logger;
      var currentLanguage = backendConnector.language;
      if (currentLanguage && currentLanguage.toLowerCase() === "cimode") return;
      var toLoad = [];
      var append = function append2(lng) {
        var lngs = languageUtils.toResolveHierarchy(lng);
        lngs.forEach(function(l) {
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };
      append(currentLanguage);
      if (this.allOptions.preload) this.allOptions.preload.forEach(function(l) {
        return append(l);
      });
      toLoad.forEach(function(lng) {
        _this3.allOptions.ns.forEach(function(ns) {
          backendConnector.read(lng, ns, "read", null, null, function(err, data) {
            if (err) logger.warn("loading namespace ".concat(ns, " for language ").concat(lng, " failed"), err);
            if (!err && data) logger.log("loaded namespace ".concat(ns, " for language ").concat(lng), data);
            backendConnector.loaded("".concat(lng, "|").concat(ns), err, data);
          });
        });
      });
    }
  }]);
  return Backend2;
}();
Backend.type = "backend";
export {
  Backend as default
};
//# sourceMappingURL=i18next-chained-backend.js.map
