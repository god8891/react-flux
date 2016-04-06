import React from 'react';

var Comment = React.createClass({
	render() {
		return (
			<div className="comment">
				<h2 className="commentauthor">{this.props.author}</h2>
				{this.props.children}
			</div>
		);
	}
});


var CommentList = React.createClass({
	render() {
		var comments = function(data) {
			return <Comment author={data.author}>{data.text}</Comment>
		};
		return (
			<div className="commentlist">
				{this.props.data.map(comments)}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	handleSubmit : function(e) {
		e.preventDefault();
		var author = this.refs.author.value;
		var text = this.refs.text.value;

		if(!author || !text) {
			return ;
		}

		this.props.onCommentSubimit({
			author : author,
			text : text
		});
		this.refs.author.value = '';
		this.refs.text.value = '';
		return ;
	},
	render() {
		return (
			<form className="commentform" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="you name" ref="author"/>
				<input type="text" placeholder="say something...." ref="text"/>
				<input type="submit" value="post" />
			</form>
		);
	}
});

var datas = [
	{author: "Pete Hunt", text: "This is one comment"},
	{author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
	getInitialState : function() {
		return {data : []};
	},
	handleCommentSubmit : function(comment) {
		//子组件提交的时候执行的
		datas.push(comment);
		this.setState({data : datas});
	},
	componentDidMount : function() {
		//得到数据
		this.setState({data:datas});

		//做个轮训就可以时时刷新了
	},
	render() {
		return (
			<div className="commentbox">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubimit={this.handleCommentSubmit} />
			</div>
		);
	}
});


module.exports = CommentBox;