import AppDispatcher from '../dispatcher/AppDispatcher';
import NoteConstants from '../constants/noteConstants';

let NoteActions = {
	create(note) {
		AppDispatcher.dispatch({
			actionType: NoteConstants.NOTE_CREATE,
			text: note.text,
			title : note.title
		});
	},
	update(id, note) {
		AppDispatcher.dispatch({
			actionType: NoteConstants.NOTE_UPDATE,
			id : id,
			text : note.text,
			title : note.title
		});
	},
	show(id) {
		AppDispatcher.dispatch({
			actionType : NoteConstants.NOTE_SHOW,
			id : id
		})
	},
	get(notes) {
		AppDispatcher.dispatch({
			actionType : NoteConstants.NOTE_GET,
			notes : notes
		})
	}
}

module.exports = NoteActions;