import React from 'react';

var Note = React.createClass({
	render() {
		return (
			<div className="note">
				<h3>{this.props.title}</h3>
			</div>
		);
	}
});

module.exports = Note;