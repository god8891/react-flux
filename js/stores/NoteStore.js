import AppDispatcher from '../dispatcher/AppDispatcher';
import NoteConstants from '../constants/noteConstants';
import EventEmitter from 'events';
import nowData from '../constants/database';



let CHANGE_EVENT = 'change';
let _notes = [];
let events = new EventEmitter.EventEmitter();

/**
 * 创建数据
 * @param  {object} note [笔记内容]
 */
function create(note) {
    _notes.push({
        id : note.id,
        title : note.title,
        text : note.text
    });

    var sql = 'INSERT INTO noteList1 (id, title, text) VALUES ("'+ note.id +'", "'+ note.title +'","'+ note.text +'")';
    nowData.insert(sql);
}

/**
 * 更新数据
 * @param  {Number} id      [唯一标识]
 * @param  {Array} updates [需要更新的数据]
 */
function update(id, updates) {
    var len = _notes.length;

    for(var i = 0; i < len; i++) {
        if(_notes[i].id == id){
            _notes[i].title = updates.title;
            _notes[i].text = updates.text;
        }
    }
    console.log(id);
    var sql = 'UPDATE noteList1 SET title="'+ updates.title +'",text="'+ updates.text +'" WHERE id="' + id + '"';
    nowData.update(sql);
}

/**
 * 获取本地数据，方便时时操作
 */
function getNotes() {
    return _notes;
}

/**
 * 根据ID获取一条数据
 * @param  {Number} id [标识]
 */
function getNote(id) {
    var len = _notes.length;
    for(var i = 0; i < len; i++) {
        if(_notes[i].id == id){
            return _notes[i];
        }
    }

    return {};
}

/**
 * 定义一个store
 */
var NoteStore = {
    getNotes() {
        return _notes;
    },
    getNote(id) {
        var len = _notes.length;
        for(var i = 0; i < len; i++) {
            if(_notes[i].id == id){
                return _notes[i];
            }
        }
    },
    emitChange() {
        events.emit(CHANGE_EVENT);
    },
    addChangeListener(callback) {
        events.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback) {
        events.removeListener(CHANGE_EVENT, callback);
    }
};

//使用dispatcher监听type
AppDispatcher.register(function(action){
    var text, title, id;

    switch(action.actionType) {
        case NoteConstants.NOTE_CREATE:
            text = action.text.trim();
            title = action.title.trim();
            if (text && title) {
                create({
                    text : text,
                    title : title
                });
                //注册监听事件
                NoteStore.emitChange();
            }
        break;
        case NoteConstants.NOTE_UPDATE:
          
            id = action.id;
            text = action.text.trim();
            title = action.title.trim();

            if(id) {
                update(id,{
                    text : text,
                    title : title
                })
            }
            NoteStore.emitChange();
        break;
        case NoteConstants.NOTE_SHOW :
            id = action.id;
            if(_notes[id]) {
                getNote(id);
            }
            NoteStore.emitChange();
        break;
        case NoteConstants.NOTE_GET :

            _notes.push(action.notes);
            NoteStore.emitChange();
        break;
        default:
          // no op
    }
});
module.exports = NoteStore;