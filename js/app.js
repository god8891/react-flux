import React from 'react';
import ReactDOM from 'react-dom';
/*import NoteApp from './react/components/noteApp';


ReactDOM.render(
	<NoteApp />,
	document.getElementById('app')
);*/


/*var TodoList = React.createClass({
	render : function() {
		var createItem = function(itemText) {
			return <li>{itemText}</li>;
		}
		return (<ul>{this.props.items.map(createItem)}</ul>);
	}
});

var TodoApp = React.createClass({
	getInitialState : function() {
		return {
			items : [],
			text : ''
		};
	},
	onChange : function(e) {
		this.setState({text:e.target.value});
	},
	handleSubmit : function(e) {
		e.preventDefault();

		var nextItems = this.state.items.concat([this.state.text]);
		var nextText = '';
		this.setState({items:nextItems,text:nextText});
	},
	render : function() {
		return (
			<div>
				<h3>todo</h3>
				<TodoList items={this.state.items} />
				<form onSubmit={this.handleSubmit} >
					<input onChange={this.onChange} value={this.state.text} />
					<button>{'add #' + (this.state.items.length + 1)}</button>
				</form>
			</div>
		)
	}
});

ReactDOM.render(
	<TodoApp />,
	document.getElementById('app')
);*/


/*import CommentApp from './react/components/CommentApp';

ReactDOM.render(
	<CommentApp />,
	document.getElementById('app')
);*/


import MockApp from './react/components/MockApp';

ReactDOM.render(
	<MockApp />,
	document.getElementById('app')
);