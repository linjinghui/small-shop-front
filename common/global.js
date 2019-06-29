
// 获取微信用户信息
const getClientUser = (callback) => {
	let provider = '';
	let code = '';
	uni.getProvider({service: 'oauth'}).then((result) => { 
		result = result[1];
		provider = result.provider[0];
		return uni.login({provider: provider});
	}).then((result) => { 
		result = result[1];
		code = result.code;
		return uni.getUserInfo({provider: provider});
	}).then((result) => { 
		result = result[1];
		let userInfo = result.userInfo;
		userInfo.provider = provider;
		userInfo.code = code;
		userInfo.signature = result.signature;
		callback &&　callback(userInfo);
	}).catch(err => {
		uni.showModal({ title: '获取用户信息失败', content: '接口调用失败', showCancel: false });
	});
}

// 页面跳转
const turnPage = (type, obj, redirect) => {
	let url = '';
	switch (type) {
		case 'home':
			url = '/pages/home/main';
			break;
		case 'my':
			url = '/pages/my/main';
			break;
		case 'car':
			url = '/pages/car/main';
			break;
		case 'car-sub':
			url = '/pages/car/sub?data=' + JSON.stringify(obj);
			break;
		case 'detail':
			url = '/pages/detail/main?id=' + obj._id;
			break;
		case 'consignee':
			url = '/pages/consignee/main?from=' + obj;
			break;
		case 'csg-creat':
			url = '/pages/consignee/creat';
			if (obj || obj === 0) {
				url += '?index=' +　obj;
			}
			break;
		case 'order':
			url = '/pages/order/main';
			break;
		case 'order-info':
			url = '/pages/order/detail?id=' + obj;
			break;
		default:
			url = '/pages/home/main';
			break;
	}
	if (redirect) {
		uni.redirectTo({url: url});
	} else {
		uni.navigateTo({url: url});
	}
}

// // 计算折扣后的真实价格
// const countRealPrice = (good) => {
// 		return (good.price * good.rebate / 10).toFixed(2);
// }

export {getClientUser, turnPage};