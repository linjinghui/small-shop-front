import Mock from '@/static/mock/mock.js';
const Random = Mock.Random;
const dure = 1000;
const LOADINGTEXT = '加载中...';

// 获取商品列表
export function ajaxGetGoods (pms, callback) {
	let data = Mock.mock({
		'msg': '',
		'code': 200,
		// 总记录数
		'total': 32,
		'result|6-10': [{
			'id': '@id()',
			// 图片地址
			'pic': "@image(80x80)",
			// 商品名称
			'name|1': '@ctitle(3, 8)',
			// 商品描述
			'desc': '@ctitle(10, 50)',
			// 购买单位
			'unit|1': ['1kg-1.5kg/份', '2-2.5g/个', '3.5元/斤'],
			// 单价
			'price|1': [3.5, 5, 11, 12.5, 22.3],
			// 折扣
			'rebate|1': [9.5, 8.5, 10, 5, 4.5],
			// 真实单价|折后单价
			'rprice|1': [3.5, 5, 11, 12.5, 22.3],
			// 库存
			'stock|1': [10, 5, '', 50],
			// 标签
			'label|0-3': [
				{ 
					'text|1': ['折扣', '清仓', '极鲜'], 
					'bcolor|1': ['#bf2058', '#ced642', '#fbb519'], 
					'color': '#000'
				}
			]
			// 购买数量
			// 'count': 1
			// 实际发货数量
			// 'realCount': 1
		}]
	});
	uni.showLoading({title: LOADINGTEXT});
	setTimeout(function () {uni.hideLoading(); callback && callback(data);}, Math.floor(Math.random() * dure));
}

// 获取商品详情
export function ajaxGetGoodInfo (pms, callback) {
	let data = Mock.mock({
		'msg': '',
		'code': 200,
		'result': {
			'id': pms.id,
			'pic': "@image(80x80)",
			// 广告图片
			'covers|1-2': ['https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg', 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg', 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg'],
			// 商品名称
			'name|1': '@ctitle(3, 8)',
			// 商品描述
			'desc': '@ctitle(10, 50)',
			// 购买单位
			'unit|1': ['1kg-1.5kg/份', '2-2.5g/个', '3.5元/斤'],
			// 单价
			'price|1': [3.5, 5, 11, 12.5, 22.3],
			// 折扣
			'rebate|1': [9.5, 8.5, 10, 5, 4.5],
			// 真实单价|折后单价
			'rprice|1': [3.5, 5, 11, 12.5, 22.3],
			// 库存
			'stock|1': [10, 5, '', 50],
			// 标签
			'label|0-3': [
				{ 
					'text|1': ['折扣', '清仓', '极鲜'], 
					'bcolor|1': ['#bf2058', '#ced642', '#fbb519'], 
					'color': '#000'
				}
			],
			// 产地
			'pplace|1': ['福建', '连江', '苔箓', '北郊'],
			// 商品详情图片
			'dtlpics|1-5': ["@image(200x280)"],
		}
	});
	uni.showLoading({title: LOADINGTEXT});
	setTimeout(function () {uni.hideLoading(); callback && callback(data);}, Math.floor(Math.random() * dure));
}

// 获取推荐商品列表
export function ajaxGetRecommendGoods (pms, callback) {
	let data = Mock.mock({
		'msg': '',
		'code': 200,
		'result|1-10': [{
			'id': '@id()',
			// 图片地址
			'pic': "@image(80x80)",
			// 商品名称
			'name|1': '@ctitle(3, 8)',
			// 商品描述
			'desc': '@ctitle(10, 50)',
			// 购买单位
			'unit|1': ['1kg-1.5kg/份', '2-2.5g/个', '3.5元/斤'],
			// 单价
			'price|1': [3.5, 5, 11, 12.5, 22.3],
			// 折扣
			'rebate|1': [9.5, 8.5, 10, 5, 4.5],
			// 真实单价|折后单价
			'rprice|1': [3.5, 5, 11, 12.5, 22.3],
			// 库存
			'stock|1': [10, 5, '', 50],
			// 标签, 最多3个
			'label|0-3': [
				{ 
					'text|1': ['折扣', '清仓', '极鲜'], 
					'bcolor|1': ['#bf2058', '#ced642', '#fbb519'], 
					'color': '#000'
				}
			]
		}]
	});
	uni.showLoading({title: LOADINGTEXT});
	setTimeout(function () {uni.hideLoading(); callback && callback(data);}, Math.floor(Math.random() * dure));
}

// 获取用户配送地址信息
export function ajaxGetAddresses (pms, callback) {
	let data = Mock.mock({
		'msg': '',
		'code': 200,
		'result|0-3': [{
			'id': '@id()',
			// 收获人名称
			'name': '@ctitle(3, 8)',
			// 收获人电话
			'mobile': /^1[385][1-9]\d{8}/,
			// 收获地址
			'address': '@ctitle(10, 20)',
			// 收获门牌地址
			'doorAddress': '@ctitle(5, 10)'
		}]
	});
	uni.showLoading({title: LOADINGTEXT});
	setTimeout(function () {uni.hideLoading(); callback && callback(data);}, Math.floor(Math.random() * dure));
}

// 保存配送地址信息, 返回id
export function ajaxSaveAddresses (params, callback) {
	if (!params.name) {
		uni.showToast({title: '请填写收货人名称', icon: 'none', position: 'bottom'});
	} else if (!params.mobile) {
		uni.showToast({title: '请填写收货人电话', icon: 'none', position: 'bottom'});
	} else if (!params.address && !params.doorAddress) {
		uni.showToast({title: '请选择收货地址', icon: 'none', position: 'bottom'});
	} else {
		let data = Mock.mock({
			'msg': '',
			'code': 200,
			'result': 'adrressId'
		});
		uni.showLoading({title: LOADINGTEXT});
		setTimeout(function () {uni.hideLoading(); callback && callback(data);}, Math.floor(Math.random() * dure));
	}
}

// 下订单
export function ajaxPlaceOrder (pms, callback) {
	let goods = pms.goods || [];
	let params = {
		userid: pms.openId,
		// 收货人名称
		name: pms.name,
		// 收货人电话
		mobile: pms.mobile,
		// 收货地址
		address: pms.address,
		// 收货门牌地址
		doorAddress: pms.doorAddress,
		goods: [],
		money: pms.money || 0,
		count: pms.count || 0
	};
	for (let i = 0; i < goods.length; i++) {
		params.goods.push({
			id: goods[i].id,
			name: goods[i].name,
			count: goods[i].count,
			rprice: goods[i].rprice,
			unit: goods[i].unit
		});
	}
	if (!params.goods || params.goods.length === 0) {
		uni.showToast({title: '请先选择商品', icon: 'none', position: 'bottom'});
	} else if (!params.name) {
		uni.showToast({title: '请选择收货地址', icon: 'none', position: 'bottom'});
	} else if (!params.mobile) {
		uni.showToast({title: '请选择收货地址', icon: 'none', position: 'bottom'});
	} else if (!params.address && !params.doorAddress) {
		uni.showToast({title: '请选择收货地址', icon: 'none', position: 'bottom'});
	} else {
		console.log('==下订单==');
		console.log(params);
		let data = Mock.mock({
			'msg': '',
			'code': 200
		});
		uni.showLoading({title: LOADINGTEXT});
		setTimeout(function () {uni.hideLoading(); callback && callback(data);}, Math.floor(Math.random() * dure));
	}
}

// 获取订单列表
export function ajaxGetOrders (pms, callback) {
	let data = Mock.mock({
		'msg': '',
		'code': 200,
		'result|0-10': [
			{
				// 订单ID
				'id': '@id()',
				// 商品列表
				'goods|2': [{
					'id': '@id()',
					'pic': "@image(80x80)",
					'name': '@ctitle(3, 8)',
					'count|1': [1, 2, 3]
				}],
				// 订单状态 1：待接单，2：备货中，3：配送中，4：已完成
				'status|1': [1, 2, 3, 4],
				// 总数量
				'count': 10,
				// 金额
				'money': 100,
				'time': '@date()'
			}
			
		]
	});
	uni.showLoading({title: LOADINGTEXT});
	setTimeout(function () {uni.hideLoading(); callback && callback(data);}, Math.floor(Math.random() * dure));
}

// 获取订单详情
export function ajaxGetOrderInfo (pms, callback) {
	let data = Mock.mock({
		'msg': '',
		'code': 200,
		'result': {
			// 订单ID
			'id': '@id()',
			// 商品列表
			'goods|1-5': [{
				'id': '@id()',
				'pic': "@image(80x80)",
				'name': '@ctitle(3, 8)',
				'count|1': [1, 2, 3],
				// 订购价格|折后价格
				'rprice|1': [3.5, 5, 11, 12.5, 22.3],
				// 最新价格
				'nprice|1': ['', 5, 11, 12.5, 22.3]
			}],
			// 订单状态 1：待接单，2：备货中，3：配送中，4：已完成
			'status|1': [1, 2, 3, 4],
			// 总数量
			'count': 10,
			// 金额
			'money': 100,
			// 快递费用
			'expMoney': 10,
			'time': '@date()',
			// 收货人名称
			'name': '@name()',
			// 收货人电话
			'mobile': /^1[385][1-9]\d{8}/,
			// 收货地址
			'address': '@ctitle(10, 20)',
			// 收货门牌地址
			'doorAddress': '@ctitle(5, 10)'
		}
	});
	uni.showLoading({title: LOADINGTEXT});
	setTimeout(function () {uni.hideLoading(); callback && callback(data);}, Math.floor(Math.random() * dure));
}