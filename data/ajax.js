/**
 * 交互接口
 */ 

// const URL = 'http://127.0.0.1:7001';
// const URL = 'https://hcbeng.com/api';
const URL = 'https://fjljsea.com/api';
// 设置DEBUG模式，使用mock虚拟数据
const DEBUG = false;
const LOADINGTEXT = '加载中...';
// 小程序拥有者身份信息
const AUTH = (new Date().getTime() + 'a3loeA==').replace(/4/g,'#');


// 登录
let ajaxSignin = (pms, callback, fail) => {
	let params = {
		auth: AUTH,
		code: pms.code,
		name: pms.nickName,
		avatar: pms.avatarUrl
	};
	
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/client/login',
		method: 'POST',
		data: params,
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (ret) => {
			let data = ret.data;
			if (data.code === 200) {
				callback && callback(data);
			} else if (fail) {
				fail(data);
			}
		}
	});
}

// 获取商品列表
let ajaxGetGoods = (pms, callback, fail) => {
	let params = {
		page: pms.page || 1,
		size: pms.size || 10,
		code: pms.code || ''
	};
	
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/client/product',
		method: 'GET',
		data: params,
		header: {
			'TOKEN': uni.getStorageSync('token')
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (ret) => {
			let data = ret.data;
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
		url: URL + '/client/product/' + params.id,
		method: 'GET',
		header: {
			'TOKEN': uni.getStorageSync('token')
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (ret) => {
			let data = ret.data;
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
		url: URL + '/client/recommend',
		method: 'GET',
		header: {
			'TOKEN': uni.getStorageSync('token')
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (ret) => {
			let data = ret.data;
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
		url: URL + '/client/address',
		method: 'GET',
		// data: params,
		header: {
			'TOKEN': uni.getStorageSync('token')
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (ret) => {
			let data = ret.data;
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
		_id: pms._id || '',
		// 收货人名称
		name: pms.name,
		// 收货人电话
		mobile: pms.mobile,
		// 收货地址
		address: pms.address,
		// 收货门牌地址
		door_address: pms.door_address
	};
	if (!params.name) {
		uni.showToast({title: '请填写收货人名称', icon: 'none', position: 'bottom'});
	} else if (params.name.length < 2) {
		uni.showToast({title: '收货人名称长度不能小于2个字', icon: 'none', position: 'bottom'});
	} else if (!params.mobile) {
		uni.showToast({title: '请填写收货人电话', icon: 'none', position: 'bottom'});
	} else if (!params.address && !params.door_address) {
		uni.showToast({title: '请选择收货地址', icon: 'none', position: 'bottom'});
	} else {
		uni.showLoading({title: LOADINGTEXT});
		uni.request({
			url: URL + '/client/address/save',
			method: 'POST',
			data: params,
			header: {
				'TOKEN': uni.getStorageSync('token')
			},
			dataType: 'json',
			complete: (data) => {
				uni.hideLoading();
			},
			fail: () => {
				uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
			},
			success: (ret) => {
				let data = ret.data;
				if (data.code === 200) {
					callback && callback(data);
				} else if (fail) {
					fail(data);
				} else {
					uni.showToast({title: data.msg, icon: 'none', position: 'bottom'});
				}
			}
		});
	}
}

// 删除配送地址
let ajaxDelAddresses = (pms, callback, fail) => {
	let params = {
		_id: pms._id || ''
	};
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/client/address/delete',
		method: 'POST',
		data: params,
		header: {
			'TOKEN': uni.getStorageSync('token')
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (ret) => {
			let data = ret.data;
			if (data.code === 200) {
				callback && callback(data);
			} else if (fail) {
				fail(data);
			} else {
				uni.showToast({title: data.msg, icon: 'none', position: 'bottom'});
			}
		}
	});
	
}

// 下订单
let ajaxPlaceOrder = (pms, callback, fail) => {
	let params = {
		consigneesId: pms.consigneesId || '',
		goods: pms.goods || [],
		remark: pms.remark || '',
		arriveTime: pms.arriveTime || ''
	};
	if (!params.goods || params.goods.length === 0) {
		uni.showToast({title: '请先选择商品', icon: 'none', position: 'bottom'});
	} else if (!params.consigneesId) {
		uni.showToast({title: '请选择配送地址', icon: 'none', position: 'bottom'});
	} else {
		uni.showLoading({title: LOADINGTEXT});
		uni.request({
			url: URL + '/client/order/save',
			method: 'POST',
			data: params,
			header: {
				'TOKEN': uni.getStorageSync('token')
			},
			dataType: 'json',
			complete: (data) => {
				uni.hideLoading();
			},
			fail: () => {
				uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
			},
			success: (ret) => {
				let data = ret.data;
				if (data.code === 200) {
					callback && callback(data);
				} else if (fail) {
					fail(data);
				} else {
					uni.showToast({title: data.msg, icon: 'none', position: 'bottom'});
				}
			}
		});
	}
}

// 获取订单列表
let ajaxGetOrders = (pms, callback, fail) => {
	let params = {
		page: pms.page || 1,
		size: pms.size || 10
	};
	
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/client/order',
		method: 'GET',
		data: params,
		header: {
			'TOKEN': uni.getStorageSync('token')
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (ret) => {
			let data = ret.data;
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
let ajaxGetOrderInfo = (pms, callback, fail) => {
	let params = {
		id: pms.id
	};
	
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/client/order/' + params.id,
		method: 'GET',
		header: {
			'TOKEN': uni.getStorageSync('token')
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (ret) => {
			let data = ret.data;
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

// 取消订单
let ajaxCancelOrder = (pms, callback, fail) => {
	let params = {
		_id: pms._id
	};
	
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/client/order/cancel',
		method: 'POST',
		data: params,
		header: {
			'TOKEN': uni.getStorageSync('token')
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (ret) => {
			let data = ret.data;
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

let ajaxDelOrder = (pms, callback, fail) => {
	let params = {
		_id: pms._id
	};
	
	uni.showLoading({title: LOADINGTEXT});
	uni.request({
		url: URL + '/client/order/delete',
		method: 'POST',
		data: params,
		header: {
			'TOKEN': uni.getStorageSync('token')
		},
		dataType: 'json',
		complete: (data) => {
			uni.hideLoading();
		},
		fail: () => {
			uni.showToast({title: '网络错误，请稍后再试！', icon: 'none', position: 'bottom'});
		},
		success: (ret) => {
			let data = ret.data;
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
	ajaxSignin = majax.ajaxSignin;
	ajaxGetGoods = majax.ajaxGetGoods;
	ajaxGetGoodInfo = majax.ajaxGetGoodInfo;
	ajaxGetRecommendGoods = majax.ajaxGetRecommendGoods;
	ajaxGetAddresses = majax.ajaxGetAddresses;
	ajaxSaveAddresses = majax.ajaxSaveAddresses;
	ajaxDelAddresses = majax.ajaxDelAddresses;
	ajaxPlaceOrder = majax.ajaxPlaceOrder;
	ajaxGetOrders = majax.ajaxGetOrders;
	ajaxGetOrderInfo = majax.ajaxGetOrderInfo;
	ajaxCancelOrder = majax.ajaxCancelOrder;
	ajaxDelOrder = majax.ajaxDelOrder;
}

export {ajaxSignin, ajaxGetGoods, ajaxGetGoodInfo, ajaxGetRecommendGoods, ajaxGetAddresses, ajaxSaveAddresses, ajaxDelAddresses, ajaxPlaceOrder, ajaxGetOrders, ajaxGetOrderInfo, ajaxCancelOrder, ajaxDelOrder};
