// Attribute.js

const equals = (a1, a2) => {
	return a1.length==a2.length && a1.every((v,i)=> v === a2[i]);
}

class Attribute {
	constructor(mName, mValue) {
		
		this._value  = mValue;
		this._name = mName;
		this._isArray = !!mValue.every;

		this._changeBinds = [];

	}

	onChange(mCb) {
		this._changeBinds.push(mCb);
	}

	setValue(mValue) {
		let hasChanged = false;
		if(this._isArray) {
			hasChanged = !equals(mValue, this._value);
		} else {
			hasChanged = this._value !== mValue;
		}

		if(hasChanged) {
			this._value = mValue;

			this._changeBinds.forEach( cb => {
				cb(this._value);
			});
		}

		return hasChanged;
	}

}

export default Attribute;