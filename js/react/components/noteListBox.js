import React from 'react';
import NoteList from './noteList';


var NoteListBox = React.createClass({
	render() {
		return (
			<div className="noteListBox">
				<h2>已写日记</h2>
				<NoteList />
			</div>
		)
	}
});


module.exports = NoteListBox;