import React from 'react';
import TextArea from './textArea';


var NoteCreationBox = React.createClass({
	render() {
		return (
			<div className="noteCreationBox">
				<TextArea />
			</div>
		)
	}
});


module.exports = NoteCreationBox