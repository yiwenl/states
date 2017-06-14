import State from './State';

const oState = {
	x:1,
	y:2,
	id:'abc',
	pos: {
		x:100,
		y:200,
		z:300
	},
	ary:[0, 1, 2],
	dir:vec3.create(),
	mtx:mat4.create()
}
const state = new State(oState);

state.on('onChanged', onChange);

function onChange(e) {
	// console.debug('Added !', e.detail.added);
	// console.debug('Changed !', e.detail.changed);
}


// state.x.onChange((mValue)=> {
// 	console.log('Changed : ', mValue);
// });


state.onChange(mValueChanged => {
	console.log('State changed :', mValueChanged);
});

state.onAdd(mValueAdded => {
	console.log('State added :', mValueAdded);
});

state.pos.onChange(mValueChanged => {
	console.log('Pos Changed :', mValueChanged);
});

// state.setState({
// 	x:2
// });


state.setState({
	x:5,
	ary:[0, 1, 2],
	name:'test',
	dir:vec3.fromValues(0, 0, 10),
	pos:{
		x:0
	}
});


// state.pos.setState({
// 	y:500,
// 	z:-100
// });

// state.setState({
// 	pos: {
// 		x:10,
// 		y:10
// 	}
// });

// state.setState({
// 	pos: {
// 		x:2,
// 		y:2
// 	}
// });

// state.setState({
// 	pos: {
// 		x:1,
// 		y:2
// 	}
// });


/*

state.x.onChange(()=> {
	
});

state.pos.onChange((o)=> {
	console.log(o);
});

*/

// console.log(state.getState());


/*


state.x.on('change')

*/