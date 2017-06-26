
## Installation
``` 
npm install object-states
```


## Usage 
`
import State from 'object-states';

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

`

