(function(myFrame) {
	myFrame.jsonToDOM = function(data, realDOM) {
		/* 根节点对象 */
		var root = {};
		/* 定义一个数组用来装每次新生成的父节点 */
		var childRoot = [];
		/* 查找根节点，并记录根节点,并将该节点从数组中剔除 */
		data.forEach(function(node, index) {
			/* 不存在parentId，就是根节点root */
			if (!node.parentId) {
				/* 引入深度，方便后期控制样式 */
				node.deep = 1;
				root = node;
				childRoot.push(root);
				data.splice(index, 1);
			}
		});
		/* 给所有childRoot节点中childObj中添加其子节点 */
		while (childRoot.length) {
			let parent = childRoot[0];
			for (let j = 0; j < data.length; ++j) {
				let node = data[j];
				if (node.parentId == parent.id) {
					node.deep = parent.deep + 1;
					/* 引入childObjs，用于存放所有子节点对象的数组 */
					if (!parent.childObjs) {
						parent.childObjs = [];

					}
					parent.childObjs.push(node);
					childRoot.push(node);
					data.splice(j--, 1);
				}
			}
			childRoot.shift();
		}

		// 创建节点工厂函数,可根据实际情况，自定义样式
		function createNode(node) {
			var div = document.createElement('div');
			div.style.paddingLeft = 20 + 'px';
			div.style.fontSize = 16 - node.deep + 'px';
			div.appendChild(document.createTextNode(node.name));
			return div;
		}

		/* 渲染函数 */
		(function render(node, realDOM) {
			var elem;
			/* 如果节点存在子节点对象，创建该节点，并递归调用渲染函数，将其渲染为该节点的子元素 */
			/* 否则：直接渲染该节点*/
			if (node.childObjs) {
				var elem = createNode(node);
				node.childObjs.forEach(function(item) {
					render(item, elem);
				});
			} else {
				var elem = createNode(node);
			}
			/* 添加到页面中的节点上 */
			realDOM.appendChild(elem);
		})(root, realDOM);
	};

	window.myFrame = myFrame;

})(window.myFrame || {});