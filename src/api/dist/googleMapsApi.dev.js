"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axiosClient = _interopRequireDefault(require("./axiosClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var googleMapsApi = {
  getAll: function getAll(startPoint, endPoint) {
    var url = "directions/json?origin=".concat(startPoint, "&destination=").concat(endPoint, "&key=AIzaSyChg2aE0I7jl7kKq-hdRke9qYJFuqSxGf8");
    return _axiosClient["default"].get(url);
  }
};
var _default = googleMapsApi;
exports["default"] = _default;