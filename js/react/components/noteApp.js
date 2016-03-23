import React from 'react';
import NoteStore from '../../stores/NoteStore';
import NoteActions from '../../actions/NoteActions';
import nowData from '../../constants/database';


let texts = {};
let db = nowData.createData('notes');

nowData.select('SELECT * FROM noteList1', function(result) {
	for(let i = 0; i < result.length; i++){
			NoteActions.get({
			id : result[i].id,
			title : result[i].title,
			text : result[i].text
		});
	}
});


function getNoteListState() {
 	return {
 		allNotes : NoteStore.getNotes()
 	}
}


function getNoteTextareaState(id) {
	return {
		notes : NoteStore.getNote(id)
	};
}

let Note = React.createClass({
	render() {
		return (
			<div className="note">
				<strong onClick={this._show} id={this.props.id}>{this.props.title}</strong>
			</div>
		)
	},
	_show(event) {
		
		let a = NoteStore.getNote(event.target.id);
		texts = a;
		NoteActions.show(event.target.id);
	}
});

let NoteList = React.createClass({
	getInitialState: function() {
		return getNoteListState();
	},
	componentDidMount: function() {
		NoteStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
    	NoteStore.removeChangeListener(this._onChange);
  	},
	render() {
		var notesObj = this.state.allNotes;
		return (
			<div className="note-list">
				{
					notesObj.map(function(obj) {
						return <Note title={obj.title} id={obj.id}/>
					})
				}
			</div>
		)
	},
	_onChange: function() {
		this.setState(getNoteListState());
	}
});

let NoteListBox = React.createClass({
	render() {
		return (
			<div className="note-listBox">
				<h2>我的日记</h2>
				<NoteList />
			</div>
		)
	}
});



let TextArea = React.createClass({
	getInitialState: function() {
		return texts;
	},
	componentDidMount: function() {
		NoteStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
    	NoteStore.removeChangeListener(this._onChange);
  	},
	render() {
		return (
			<div className="textarea" >
				<input placeholder="这里输入标题" ref="joinTitle" className="join-title" />
				<textarea ref="joinContent" className="joio-content" ></textarea>

				<div className="join-btn">
					<button className="btn" onClick={this.add}>保存</button>
				</div>
			</div>
		)
	},
	add() {
		let title = this.refs.joinTitle.value;
		let text = this.refs.joinContent.value;
		let id = this.refs.joinTitle.id;

		this.refs.joinTitle.value = '';
		this.refs.joinContent.value = '';
		this.refs.joinTitle.id = '';

		if(id){
			return NoteActions.update(id ,{
				title : title,
				text : text
			});
		}
		return NoteActions.create({
			title : title,
			text : text
		});
	},
	_onChange: function() {
		let title = this.refs.joinTitle;
		let text = this.refs.joinContent;
		if(texts.id){
			
			title.value = texts.title;
			text.value = texts.text;
			title.id = texts.id;
			texts = {};
		}
	}
});

let NoteCreationBox = React.createClass({
	render() {
		return (
			<div className="note-creationBox">
				<h2>新建/编辑</h2>
				<TextArea />
			</div>
		)
	}
});


let NoteApp = React.createClass({
	render() {
		return (
			<div className="note-app">
				<NoteListBox />
				<NoteCreationBox />
			</div>
		)
	}
});

module.exports = NoteApp;