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
    fetch: regeneratorRuntime.mark(function fetch(opts) {
      var params, base, args, response;
      return regeneratorRuntime.wrap(function fetch$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = opts ? opts.params : null;
              _context.next = 3;
              return (0, _effects.put)({ type: RESOURCE_PLURAL + '_FETCH_START' });

            case 3:
              _context.prev = 3;
              base = [_axios2.default.get, '/api/' + resource];
              args = params ? base.concat({ params: params }) : base;
              _context.next = 8;
              return _effects.call.apply(undefined, _toConsumableArray(args));

            case 8:
              response = _context.sent;
              _context.next = 11;
              return (0, _effects.put)({ type: RESOURCE_PLURAL + '_FETCH_SUCCEEDED', payload: response.data });

            case 11:
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](3);
              _context.next = 17;
              return (0, _effects.put)({ type: RESOURCE_PLURAL + '_FETCH_FAILED', error: _context.t0 });

            case 17:
              _context.prev = 17;
              _context.next = 20;
              return (0, _effects.put)({ type: RESOURCE_PLURAL + '_FETCH_FINALLY' });

            case 20:
              return _context.finish(17);

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, fetch, this, [[3, 13, 17, 21]]);
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
              _context2.prev = 14;
              _context2.next = 17;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_CREATE_FINALLY' });

            case 17:
              return _context2.finish(14);

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, create, this, [[2, 10, 14, 18]]);
    }),
    creates: regeneratorRuntime.mark(function creates(_ref2) {
      var payload = _ref2.payload;
      var response;
      return regeneratorRuntime.wrap(function creates$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _effects.put)({ type: RESOURCE_PLURAL + '_CREATE_START', payload: payload });

            case 2:
              _context3.prev = 2;
              _context3.next = 5;
              return (0, _effects.call)(_axios2.default.post, '/api/' + resource, payload);

            case 5:
              response = _context3.sent;
              _context3.next = 8;
              return (0, _effects.put)({ type: RESOURCE_PLURAL + '_CREATE_SUCCEEDED', payload: Object.assign({}, payload, response.data) });

            case 8:
              _context3.next = 14;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](2);
              _context3.next = 14;
              return (0, _effects.put)({ type: RESOURCE_PLURAL + '_CREATE_FAILED', error: _context3.t0 });

            case 14:
              _context3.prev = 14;
              _context3.next = 17;
              return (0, _effects.put)({ type: RESOURCE_PLURAL + '_CREATE_FINALLY' });

            case 17:
              return _context3.finish(14);

            case 18:
            case 'end':
              return _context3.stop();
          }
        }
      }, creates, this, [[2, 10, 14, 18]]);
    }),
    update: regeneratorRuntime.mark(function update(_ref3) {
      var payload = _ref3.payload;
      var response;
      return regeneratorRuntime.wrap(function update$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_UPDATE_START', payload: payload });

            case 2:
              _context4.prev = 2;
              _context4.next = 5;
              return (0, _effects.call)(_axios2.default.put, '/api/' + resource + '/' + payload._id, _lodash2.default.omit(payload, ['_id']));

            case 5:
              response = _context4.sent;
              _context4.next = 8;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_UPDATE_SUCCEEDED', payload: _lodash2.default.pick(payload, ['_id']) });

            case 8:
              _context4.next = 14;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4['catch'](2);
              _context4.next = 14;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_UPDATE_FAILED', payload: _extends({}, _lodash2.default.pick(payload, ['_id']), { error: _context4.t0 }) });

            case 14:
              _context4.prev = 14;
              _context4.next = 17;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_UPDATE_FINALLY' });

            case 17:
              return _context4.finish(14);

            case 18:
            case 'end':
              return _context4.stop();
          }
        }
      }, update, this, [[2, 10, 14, 18]]);
    }),
    destroy: regeneratorRuntime.mark(function destroy(_ref4) {
      var payload = _ref4.payload;
      var response;
      return regeneratorRuntime.wrap(function destroy$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_DELETE_START', payload: payload });

            case 2:
              _context5.prev = 2;
              _context5.next = 5;
              return (0, _effects.call)(_axios2.default.delete, '/api/' + resource + '/' + payload._id);

            case 5:
              response = _context5.sent;
              _context5.next = 8;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_DELETE_SUCCEEDED', payload: _lodash2.default.pick(payload, ['_id']) });

            case 8:
              _context5.next = 14;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5['catch'](2);
              _context5.next = 14;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_DELETE_FAILED', payload: _extends({}, _lodash2.default.pick(payload, ['_id']), { error: _context5.t0 }) });

            case 14:
              _context5.prev = 14;
              _context5.next = 17;
              return (0, _effects.put)({ type: RESOURCE_SINGULAR + '_DELETE_FINALLY' });

            case 17:
              return _context5.finish(14);

            case 18:
            case 'end':
              return _context5.stop();
          }
        }
      }, destroy, this, [[2, 10, 14, 18]]);
    })
  };
};