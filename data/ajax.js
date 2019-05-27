/**
 * 交互接口
 */ 

const URL = '';
// 设置DEBUG模式，使用mock虚拟数据
const DEBUG = true;
const LOADINGTEXT = '加载中...';
// 小程序拥有者身份信息
const AUTH = 'LINJINGHUI';

// 获取商品列表
let ajaxGetGoods = (pms, callback) => {
	let params = {
		page: pms.page || 1,
		size: pms.size || 10
	};
	
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/goods',
		method: 'GET',
		data: params,
		header: {
			'AUTH': AUTH
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (data) => {
			if (data.code === 200) {
				callback && callback(data);
			} else if (fail) {
				fail(data);
			} else {
				uni.showToast({title: '' + data.msg, icon: 'none', position: 'bottom'});
			}
		}
	});
}

// 获取商品详情
let ajaxGetGoodInfo = (pms, callback, fail) => {
	let params = {
		id: pms.id
	};
	
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/goods/info',
		method: 'GET',
		data: params,
		header: {
			'AUTH': AUTH
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (data) => {
			if (data.code === 200) {
				callback && callback(data);
			} else if (fail) {
				fail(data);
			} else {
				uni.showToast({title: '' + data.msg, icon: 'none', position: 'bottom'});
			}
		}
	});
}

// 获取推荐商品列表
let ajaxGetRecommendGoods = (pms, callback, fail) => {
	let params = pms;
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/goods/recommend',
		method: 'GET',
		data: params,
		header: {
			'AUTH': AUTH
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (data) => {
			if (data.code === 200) {
				callback && callback(data);
			} else if (fail) {
				fail(data);
			}
		}
	});
}

// 获取用户配送地址信息
let ajaxGetAddresses = (pms, callback, fail) => {
	let params = {
		userid: pms.openId
	};
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/user/address',
		method: 'GET',
		data: params,
		header: {
			'AUTH': AUTH
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (data) => {
			if (data.code === 200) {
				callback && callback(data);
			} else if (fail) {
				fail(data);
			}
		}
	});
}

// 保存配送地址信息, 返回id
let ajaxSaveAddresses = (pms, callback, fail) => {
	let params = {
		userid: pms.openId,
		id: pms.id || '',
		// 收货人名称
		name: pms.name,
		// 收货人电话
		mobile: pms.mobile,
		// 收货地址
		address: pms.address,
		// 收货门牌地址
		doorAddress: pms.doorAddress
	};
	if (!params.name) {
		uni.showToast({title: '请填写收货人名称', icon: 'none', position: 'bottom'});
	} else if (!params.mobile) {
		uni.showToast({title: '请填写收货人电话', icon: 'none', position: 'bottom'});
	} else if (!params.address && !params.doorAddress) {
		uni.showToast({title: '请选择收货地址', icon: 'none', position: 'bottom'});
	} else {
		uni.showLoading({title: LOADINGTEXT});
		uni.request({
			url: URL + '/user/address/save',
			method: 'POST',
			data: params,
			header: {
				'AUTH': AUTH
			},
			dataType: 'json',
			complete: (data) => {
				uni.hideLoading();
			},
			fail: () => {
				uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
			},
			success: (data) => {
				if (data.code === 200) {
					callback && callback(data);
				} else if (fail) {
					fail(data);
				}
			}
		});
	}
}

// 下订单
let ajaxPlaceOrder = (pms, callback, fail) => {
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
		uni.showToast({title: '请选择配送地址', icon: 'none', position: 'bottom'});
	} else if (!params.mobile) {
		uni.showToast({title: '请选择配送地址', icon: 'none', position: 'bottom'});
	} else if (!params.address && !params.doorAddress) {
		uni.showToast({title: '请选择配送地址', icon: 'none', position: 'bottom'});
	} else {
		console.log('==下订单==');
		console.log(params);
		uni.showLoading({title: LOADINGTEXT});
		uni.request({
			url: URL + '/user/address/save',
			method: 'POST',
			data: params,
			header: {
				'AUTH': AUTH
			},
			dataType: 'json',
			complete: (data) => {
				uni.hideLoading();
			},
			fail: () => {
				uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
			},
			success: (data) => {
				if (data.code === 200) {
					callback && callback(data);
				} else if (fail) {
					fail(data);
				}
			}
		});
	}
}

// 获取订单列表
let ajaxGetOrders = (pms, callback) => {
	let params = {
		userid: pms.openId,
		page: pms.page || 1,
		size: pms.size || 10
	};
	
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/order',
		method: 'GET',
		data: params,
		header: {
			'AUTH': AUTH
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (data) => {
			if (data.code === 200) {
				callback && callback(data);
			} else if (fail) {
				fail(data);
			} else {
				uni.showToast({title: '' + data.msg, icon: 'none', position: 'bottom'});
			}
		}
	});
}

// 获取订单详情
let ajaxGetOrderInfo = (pms, callback) => {
	let params = {
		id: pms.id
	};
	
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/order/info',
		method: 'GET',
		data: params,
		header: {
			'AUTH': AUTH
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (data) => {
			if (data.code === 200) {
				callback && callback(data);
			} else if (fail) {
				fail(data);
			} else {
				uni.showToast({title: '' + data.msg, icon: 'none', position: 'bottom'});
			}
		}
	});
}

if (DEBUG) {
	const majax = require('./mock.js');
	ajaxGetGoods = majax.ajaxGetGoods;
	ajaxGetGoodInfo = majax.ajaxGetGoodInfo;
	ajaxGetRecommendGoods = majax.ajaxGetRecommendGoods;
	ajaxGetAddresses = majax.ajaxGetAddresses;
	ajaxSaveAddresses = majax.ajaxSaveAddresses;
	ajaxPlaceOrder = majax.ajaxPlaceOrder;
	ajaxGetOrders = majax.ajaxGetOrders;
	ajaxGetOrderInfo = majax.ajaxGetOrderInfo;
}

export {ajaxGetGoods, ajaxGetGoodInfo, ajaxGetRecommendGoods, ajaxGetAddresses, ajaxSaveAddresses, ajaxPlaceOrder, ajaxGetOrders, ajaxGetOrderInfo};
