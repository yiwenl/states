import State from '../src/State';
// import State from '../build/State';

import { vec3, mat4 } from 'gl-matrix';

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

// state.on('changed', (o)=> {
// 	console.log('From Event listener, Changed : ', o);
// });

// state.on('added', (o)=> {
// 	console.log('From Event listener, Added :', o);
// });

	
// state.onChange(mValueChanged => {
// 	console.log('State changed :', mValueChanged);
// });

// state.onAdd(mValueAdded => {
// 	console.log('State added :', mValueAdded);
// });

// state.pos.onChange(mValueChanged => {
// 	console.log('Pos Changed :', mValueChanged);
// });



state.ary.onChange( mValue => {
	console.log('new Ary value :', mValue);
});

state.x.on('changed', value => {
	console.log('New x value:', value);
});

// state.pos.on('changed', (o)=> {
// 	console.log('From event Listener Pos changed :', o);
// });

// state.pos.on('added', (o)=> {
// 	console.log('From event Listener Pos Added :', o);
// });

// state.setState({
// 	x:2
// });


state.setState({
	x:5,
	ary:[0, 1, 3],
	name:'test',
	dir:vec3.fromValues(0, 0, 10),
	pos:{
		x:0,
		w:1
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