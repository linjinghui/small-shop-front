
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
const turnPage = (type) => {
	let url = '';
	switch (type) {
		case 'my':
			url = '/pages/untabbar/my/main';
			break;
		case 'car':
			url = '/pages/untabbar/car/main';
			break;
		default:
			url = '/pages/untabbar/my/main';
			break;
	}
	uni.navigateTo({url: url});
}

export {getClientUser, turnPage};