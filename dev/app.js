import State from '../src/State';
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
const state0 = new State(oState);

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



state0.ary.onChange( mValue => {
	console.log('new Ary value :', mValue);
});

state0.x.on('changed', value => {
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


// state0.setState({
// 	x:5,
// 	ary:[0, 1, 3],
// 	name:'test',
// 	dir:vec3.fromValues(0, 0, 10),
// 	pos:{
// 		x:0,
// 		w:1
// 	}
// });


const state = new State({
	name:'John',
	position:{
		x:0,
		y:0,
		z:0
	}
});


state.onChange( mValue => {
	console.log('Changed :', mValue);
});

state.name.on('changed', mValue => {
	console.log('From listener, Name changed:', mValue)
});

state.position.on('added', mAdded => {
	console.log('Added :', mAdded);
});

state.position.on('changed', mChanged => {
	console.log('Changed value :', mChanged);
});


state.setState({
	name:'Peter',
	position: {
		x:1,
		y:1,
		w:1
	}
});