var glob = require('glob');

function getConfig(type, _root) {
	var entries = getEntrys();

	var config = {
		entry : entries,
		output: {
	        filename: '[name].js'
		},
		resolve: {
	        extensions: ['', '.js', '.css', '.scss', '.tpl', '.png', '.jpg']
	    }
	};

	//返回配置文件
	return config;

	//配置多入口文件
	function getEntrys() {
		var entry = {};
		if(type == 'web'){
			var src = glob.sync(_root + '/src/web/script/pages/*.js');

			src.forEach(function (name) {
				var pages = name.match(/([^\/]+?).js$/)[1];
				var split = name.split('/');
				var path = split[4];
				var path1 = split[split.length - 2];

			 	entry['./' + path1 + '_' +pages] = _root + '/src/' + path +'/script/'+ path1 + '/' + pages + '.js';
			});
		}else if(type == 'mobile'){
			var src = glob.sync(_root + '/src/mobile/script/pages/*.js');
			src.forEach(function (name) {
				var pages = name.match(/([^\/]+?).js$/)[1];
				var split = name.split('/');
				var path = split[4];
				var path1 = split[split.length - 2];

			 	entry['./' + path1 + '_' +pages] = _root + '/src/' + path +'/script/'+ path1 + '/' + pages + '.js';
			});
		}else if(type == 'app'){

			var src = glob.sync(_root + '/src/app/script/pages/*.js');

			src.forEach(function (name) {
				var pages = name.match(/([^\/]+?).js$/)[1];
				var split = name.split('/');
				var path = split[4];
				var path1 = split[split.length - 2];
				
			 	entry['./' + path1 + '_' +pages] = _root + '/src/' + path +'/script/'+ path1 + '/' + pages + '.js';
			});
		}
		return entry;
	}

}
module.exports = getConfig;