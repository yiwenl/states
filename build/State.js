'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // State.js

var _events = require('events');

var _Attribute = require('./Attribute');

var _Attribute2 = _interopRequireDefault(_Attribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isObject = function isObject(o) {
	return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && !Array.isArray(o) && o.length === undefined;
};

var State = function (_EventEmitter) {
	_inherits(State, _EventEmitter);

	function State() {
		var mInitState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, State);

		var _this = _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this));

		_this._state = {};

		for (var s in mInitState) {
			if (!isObject(mInitState[s])) {
				_this[s] = new _Attribute2.default(s, mInitState[s]);
			} else {
				_this[s] = new State(mInitState[s]);
			}
		}

		_this._changeBinds = [];
		_this._addBinds = [];
		return _this;
	}

	_createClass(State, [{
		key: 'onChange',
		value: function onChange(mCb) {
			this._changeBinds.push(mCb);
		}
	}, {
		key: 'onAdd',
		value: function onAdd(mCb) {
			this._addBinds.push(mCb);
		}
	}, {
		key: 'setState',
		value: function setState(mNewState) {
			var hasChanged = false;
			var hasNewState = false;
			var stateChanged = {};
			var stateAdded = {};

			for (var s in mNewState) {

				if (this[s] === undefined) {
					if (!isObject(mNewState[s])) {
						this[s] = new _Attribute2.default(s, mNewState[s]);
					} else {
						this[s] = new State(mNewState[s]);
					}

					hasNewState = true;
					stateAdded[s] = mNewState[s];
				} else {
					if (!isObject(mNewState[s])) {
						var attrChanged = this[s].setValue(mNewState[s]);
						hasChanged = hasChanged || attrChanged;
						if (attrChanged) {
							stateChanged[s] = mNewState[s];
						}
					} else {
						var _attrChanged = this[s].setState(mNewState[s]);
						if (_attrChanged) {
							stateChanged[s] = mNewState[s];
						}
					}
				}
			}

			if (hasChanged) {
				this._changeBinds.forEach(function (cb) {
					cb(stateChanged);
				});

				this.emit('changed', stateChanged);
			}

			if (hasNewState) {
				this._addBinds.forEach(function (cb) {
					cb(stateAdded);
				});

				this.emit('added', stateAdded);
			}

			return hasChanged;
		}
	}, {
		key: 'getState',
		value: function getState() {
			return this._state;
		}
	}]);

	return State;
}(_events.EventEmitter);

exports.default = State;