import React from 'react';
import Note from './note';

var notes = ['张三','李四'];

var NoteList = React.createClass({
	render() {
		return (
			<div className="notelist">
				{
					notes.map(function(title){
						return <Note title={title} />
					})
				}
			</div>
		);
	}
});


module.exports = NoteList;