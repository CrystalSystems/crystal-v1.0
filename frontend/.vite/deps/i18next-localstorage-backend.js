import {
  _defineProperty
} from "./chunk-HSYXBMUO.js";
import {
  _classCallCheck,
  _createClass
} from "./chunk-PV26B4MV.js";
import "./chunk-V6C57QHM.js";
import "./chunk-SNAQBZPT.js";

// node_modules/i18next-localstorage-backend/dist/esm/i18nextLocalStorageBackend.js
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var Storage = function() {
  function Storage2(options) {
    _classCallCheck(this, Storage2);
    this.store = options.store;
  }
  _createClass(Storage2, [{
    key: "setItem",
    value: function setItem(key, value) {
      if (this.store) {
        try {
          this.store.setItem(key, value);
        } catch (e) {
        }
      }
    }
  }, {
    key: "getItem",
    value: function getItem(key, value) {
      if (this.store) {
        try {
          return this.store.getItem(key, value);
        } catch (e) {
        }
      }
      return void 0;
    }
  }]);
  return Storage2;
}();
function getDefaults() {
  var store = null;
  try {
    store = window.localStorage;
  } catch (e) {
    if (typeof window !== "undefined") {
      console.log("Failed to load local storage.", e);
    }
  }
  return {
    prefix: "i18next_res_",
    expirationTime: 7 * 24 * 60 * 60 * 1e3,
    defaultVersion: void 0,
    versions: {},
    store
  };
}
var Cache = function() {
  function Cache2(services) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck(this, Cache2);
    this.init(services, options);
    this.type = "backend";
  }
  _createClass(Cache2, [{
    key: "init",
    value: function init(services) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      this.services = services;
      this.options = _objectSpread(_objectSpread(_objectSpread({}, getDefaults()), this.options), options);
      this.storage = new Storage(this.options);
    }
  }, {
    key: "read",
    value: function read(language, namespace, callback) {
      var nowMS = Date.now();
      if (!this.storage.store) {
        return callback(null, null);
      }
      var local = this.storage.getItem("".concat(this.options.prefix).concat(language, "-").concat(namespace));
      if (local) {
        local = JSON.parse(local);
        var version = this.getVersion(language);
        if (
          // expiration field is mandatory, and should not be expired
          local.i18nStamp && local.i18nStamp + this.options.expirationTime > nowMS && // there should be no language version set, or if it is, it should match the one in translation
          version === local.i18nVersion
        ) {
          var i18nStamp = local.i18nStamp;
          delete local.i18nVersion;
          delete local.i18nStamp;
          return callback(null, local, i18nStamp);
        }
      }
      return callback(null, null);
    }
  }, {
    key: "save",
    value: function save(language, namespace, data) {
      if (this.storage.store) {
        data.i18nStamp = Date.now();
        var version = this.getVersion(language);
        if (version) {
          data.i18nVersion = version;
        }
        this.storage.setItem("".concat(this.options.prefix).concat(language, "-").concat(namespace), JSON.stringify(data));
      }
    }
  }, {
    key: "getVersion",
    value: function getVersion(language) {
      return this.options.versions[language] || this.options.defaultVersion;
    }
  }]);
  return Cache2;
}();
Cache.type = "backend";
export {
  Cache as default
};
//# sourceMappingURL=i18next-localstorage-backend.js.map
