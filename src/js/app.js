import State from './State';

const oState = {
	x:1,
	y:2,
	id:'abc'
}
const state = new State(oState);

state.on('onChanged', onChange);

function onChange(e) {
	console.debug('Added !', e.detail.added);
	console.debug('Changed !', e.detail.changed);
	// console.log(e.detail);
}



// state.setState({
// 	x:1
// });

// state.setState({
// 	x:2
// });

state.setState({
	pos: {
		x:10,
		y:10
	}
});

state.setState({
	pos: {
		x:2,
		y:2
	}
});

state.setState({
	pos: {
		x:2,
		y:2
	}
});
