import React from 'react';

var data = [
	{category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
	{category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
	{category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
	{category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
	{category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
	{category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

//包含整个例子的容器
var FilterableProductTable = React.createClass({
	render : function() {
		return (
			<div>
				<SearchBar />
			</div>
		)
	}
});


//接受所有 用户输入（ user input ）
var SearchBar = React.createClass({
	getInitailState : function() {
		return {
			data : {}
		}
	},
	componentWillMount : function() {
		var nowData = {};
		var nowData1 = {};
		var nowArr = [];
		for(var i = 0, len = data.length; i < len; i++) {
			nowData[data[i].category] = [];
		}

		
		this.setState({
			data : nowData
		})
	},
	render : function() {
		var items = function(item) {
			return <ProductCategoryRow title={item.title} data={item.datas}/>
		}
		var state = this.state.data;
		var nowData = [];
		console.log(state);
		for(var item in state) {
			nowData.push(
				{
					'title' : item,
					'datas' : [
						{'money' : state[item].text},
						{'text' : state[item].money}
					]
				}
			);
		}

		console.log(nowData)
		return (
			<div>
				<ProductTable />
				{
					nowData.map(items)
				}
			</div>

		);
	}
});

//根据 用户输入（ user input ） 过滤和展示 数据集合（ data collection ）
var ProductTable = React.createClass({
	render : function() {
		return (
			<div>
				<div><input type="text" ref="serch" /></div>
				<div><input type="checkbox" onClick={this.handleChange} />只展示股票</div>
			</div>
		);
	}
});

//为每个 分类（ category ） 展示一列表头
var ProductCategoryRow = React.createClass({
	render : function() {
		var items = function(item){
			return <ProductRow text={item.text} money={item.money}/>
		}
		return (
			<div>
				<h3>{this.props.title}</h3>
				{
					this.props.data.map(items)
				}
			</div>
			

		);
	}
});
var ProductTitle = React.createClass({
	render : function() {
		return (
			<h3>{this.props.title}</h3>
		);
	}
});


//为每个 产品（ product ） 展示一列
var ProductRow = React.createClass({
	render : function() {
		return (
			<div>
				<span>{this.props.text}</span>
				<span>{this.props.money}</span>
			</div>
		);
	}
});

module.exports = FilterableProductTable;