
function Database() {
	this.db = null;
};


Database.prototype.createData = function(name, version, displayName, size) {
	if(!name) return false;
	var version = version || '1.0';
	var displayName = displayName || name;
	var size = size || (2 * 1024 * 1024);
	this.db = window.openDatabase(name, version, displayName, size);
}

Database.prototype.createTable = function(sql) {
	if(!sql) return false;
	this.db.transaction(function(tx) {
		tx.executeSql(sql,[],function(tx, results) {
			if(results.rows.length > 1){
				console.log('创建表' + name + '成功！');
			}
		},function(){
			console.log('创建表' + name + '失败！');	
		});
	});
}

Database.prototype.insert = function(sql) {
	if(!sql) return false;
	this.db.transaction(function(tx) {
		tx.executeSql(sql,[],function(tx, results) {
			if(results.rows.length > 1){
				console.log('插入数据成功！');
			}
		},function(){
			console.log('插入数据失败！');	
		});
	});
}

Database.prototype.select = function(sql, callback) {
	if(!sql) return false;
	this.db.transaction(function(tx) {
		tx.executeSql(sql,[],function(tx, results) {
			if(results.rows.length > 1){
				console.log('查询成功！返回' + results.rows.length + '条');
			}
			callback(results.rows);
		},function(){
			console.log('查询失败！');	
		});
	});
}

Database.prototype.update = function(sql) {
	if(!sql) return false;
	this.db.transaction(function(tx) {
		tx.executeSql(sql,[],function(tx, results) {
			console.log('更新成功！');
		},function(){
			console.log('更新失败！');	
		});
	});
}

var nowData = new Database();

module.exports = nowData;