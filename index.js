'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _effects = require('redux-saga/effects');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (_resource) {
  var RESOURCE_PLURAL = _resource.slice(-1).toLowerCase() == 'y' ? _resource.slice(0, -1).toUpperCase() + 'IES' : _resource.toUpperCase() + 'S';

  var RESOURCE_SINGULAR = _resource.toUpperCase();
  var resource = RESOURCE_PLURAL.toLowerCase();

  return {
    fetch: regeneratorRuntime.mark(function fetch(params) {
      var base, args, response;
      return regeneratorRuntime.wrap(function fetch$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _effects.put)({ type: RESOURCE_PLURAL + '_FETCH_START' });

            case 2:
              _context.prev = 2;
              base = [_axios2.default.get, '/api/' + resource];
              args = params ? base.concat({ params: params }) : base;
              _context.next = 7;
              return _effects.call.apply(undefined, _toConsumableArray(args));

            case 7:
              response = _context.sent;
              _context.next = 10;
              return (0, _effects.put)({ type: RESOURCE_PLURAL + '_FETCH_SUCCEEDED', payload: response.data });

            case 10:
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](2);
              _context.next = 16;
              return (0, _effects.put)({ type: RESOURCE_PLURAL + '_FETCH_FAILED', error: _context.t0 });

            case 16:
              _context.next = 18;
              return (0, _effects.put)({ type: RESOURCE_PLURAL + '_FETCH_FINALLY' });

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, fetch, this, [[2, 12]]);
    }),
    create: regeneratorRuntime.mark(function create(_ref) {
      var payload = _ref.payload;
      var response;
      return regeneratorRuntime.wrap(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_CREATE_START', payload: payload });

            case 2:
              _context2.prev = 2;
              _context2.next = 5;
              return (0, _effects.call)(_axios2.default.post, '/api/' + resource, payload);

            case 5:
              response = _context2.sent;
              _context2.next = 8;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_CREATE_SUCCEEDED', payload: Object.assign({}, payload, response.data) });

            case 8:
              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](2);
              _context2.next = 14;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_CREATE_FAILED', error: _context2.t0 });

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, create, this, [[2, 10]]);
    }),
    update: regeneratorRuntime.mark(function update(_ref2) {
      var payload = _ref2.payload;
      var response;
      return regeneratorRuntime.wrap(function update$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_UPDATE_START', payload: payload });

            case 2:
              _context3.prev = 2;
              _context3.next = 5;
              return (0, _effects.call)(_axios2.default.put, '/api/' + resource + '/' + payload._id, _lodash2.default.omit(payload, ['_id']));

            case 5:
              response = _context3.sent;
              _context3.next = 8;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_UPDATE_SUCCEEDED', payload: _lodash2.default.pick(payload, ['_id']) });

            case 8:
              _context3.next = 14;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](2);
              _context3.next = 14;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_UPDATE_FAILED', payload: _extends({}, _lodash2.default.pick(payload, ['_id']), { error: _context3.t0 }) });

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, update, this, [[2, 10]]);
    }),
    destroy: regeneratorRuntime.mark(function destroy(_ref3) {
      var payload = _ref3.payload;
      var response;
      return regeneratorRuntime.wrap(function destroy$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_DELETE_START', payload: payload });

            case 2:
              _context4.prev = 2;
              _context4.next = 5;
              return (0, _effects.call)(_axios2.default.delete, '/api/' + resource + '/' + payload._id);

            case 5:
              response = _context4.sent;
              _context4.next = 8;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_DELETE_SUCCEEDED', payload: _lodash2.default.pick(payload, ['_id']) });

            case 8:
              _context4.next = 14;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4['catch'](2);
              _context4.next = 14;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_DELETE_FAILED', payload: _extends({}, _lodash2.default.pick(payload, ['_id']), { error: _context4.t0 }) });

            case 14:
            case 'end':
              return _context4.stop();
          }
        }
      }, destroy, this, [[2, 10]]);
    })
  };
};