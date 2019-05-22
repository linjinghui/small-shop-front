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

if (DEBUG) {
	const majax = require('./mock.js');
	ajaxGetGoods = majax.ajaxGetGoods;
	ajaxGetGoodInfo = majax.ajaxGetGoodInfo;
	ajaxGetRecommendGoods = majax.ajaxGetRecommendGoods;
}

export {ajaxGetGoods, ajaxGetGoodInfo, ajaxGetRecommendGoods};
