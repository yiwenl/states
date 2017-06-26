'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Attribute.js

var equals = function equals(a1, a2) {
	return a1.length == a2.length && a1.every(function (v, i) {
		return v === a2[i];
	});
};

var Attribute = function (_EventEmitter) {
	_inherits(Attribute, _EventEmitter);

	function Attribute(mName, mValue) {
		_classCallCheck(this, Attribute);

		var _this = _possibleConstructorReturn(this, (Attribute.__proto__ || Object.getPrototypeOf(Attribute)).call(this));

		_this._value = mValue;
		_this._name = mName;
		_this._isArray = !!mValue.every;

		_this._changeBinds = [];

		return _this;
	}

	_createClass(Attribute, [{
		key: 'onChange',
		value: function onChange(mCb) {
			this._changeBinds.push(mCb);
		}
	}, {
		key: 'setValue',
		value: function setValue(mValue) {
			var _this2 = this;

			var hasChanged = false;
			if (this._isArray) {
				hasChanged = !equals(mValue, this._value);
			} else {
				hasChanged = this._value !== mValue;
			}

			if (hasChanged) {
				this._value = mValue;

				this._changeBinds.forEach(function (cb) {
					cb(_this2._value);
				});

				this.emit('changed', this._value);
			}

			return hasChanged;
		}
	}]);

	return Attribute;
}(_events.EventEmitter);

exports.default = Attribute;