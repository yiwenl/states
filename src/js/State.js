// State.js

import alfrid from 'alfrid';
import Attribute from './Attribute';


const isObject = function(o) {
	return typeof o === 'object' && !Array.isArray(o) && o.length === undefined;
}

class State extends alfrid.EventDispatcher {
	constructor(mInitState = {}) {
		super();

		this._state = {};

		for ( let s in mInitState ) {
			if(!isObject(mInitState[s])) {
				this[s] = new Attribute(s, mInitState[s])	
			} else {
				this[s] = new State(mInitState[s]);
			}
			
		}

		this._changeBinds = [];
		this._addBinds = [];
	}


	onChange(mCb) {
		this._changeBinds.push(mCb);
	}


	onAdd(mCb) {
		this._addBinds.push(mCb);
	}


	setState(mNewState) {
		let hasChanged = false;
		let hasNewState = false;
		let stateChanged = {};
		let stateAdded = {};

		for ( let s in mNewState ) {

			if (this[s] === undefined) {
				console.log('Add Attribute : ', s);
				if(!isObject(mNewState[s])) {
					this[s] = new Attribute(s, mNewState[s])	
				} else {
					this[s] = new State(mNewState[s]);
				}

				hasNewState = true;
				stateAdded[s] = mNewState[s];

			} else {
				if (!isObject(mNewState[s])) {
					const attrChanged = this[s].setValue(mNewState[s]);
					hasChanged = hasChanged || attrChanged;
					if (attrChanged) {
						stateChanged[s] = mNewState[s];
					}
				} else {
					const attrChanged = this[s].setState(mNewState[s]);
					if (attrChanged) {
						stateChanged[s] = mNewState[s];
					}
				}
			}
		}

		if (hasChanged) {
			this._changeBinds.forEach( cb => {
				cb(stateChanged);
			});
		}

		if (hasNewState) {
			this._addBinds.forEach( cb => {
				cb(stateAdded);
			});	
		}

		return hasChanged;
	}


	getState() {
		return this._state;
	}
}


export default State;