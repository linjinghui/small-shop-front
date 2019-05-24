import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({  
    state: {  
		// 用户信息
        user: {
			openId: '',
			nickName: '未登录',
			avatarUrl: require('../static/img/avater.png')
		},
		// 购物车
		car: {
			// 商品数量
			total: 0,
			// 商品总价
			count: 0,
			// 商品列表
			data: [],
			// 商品数量变化
			changeData: {}
		}
    },  
	getters: {
		// 返回用户信息
		doneUser: state => {
			return state.user;
		},
		// 返回购物车中的商品信息
		doneCar: state => {
		  return state.car.data;
		},
		// 返回购物车中的商品数量
		doneCount: state => {
		  return state.car.count;
		},
		// 返回购物车中的商品总价
		doneTotal: state => {
		  return state.car.total;
		}
	},
    mutations: {  
		// 设置登录用户
        setUser (state, data) {
			state.user = data;
        },
		// 商品加入购物车
		addGood (state, data) {
			
		},
		addGoodToCar (state, good) {
			let count = good.count;	
			// 判断商品是否已经在购物车中，如果是则更新数量，不是则添加进购物车 ，如果数量是0 则移除商品
			// s-1 获取商品在购物车中的位置
			let index = '';
			for (let i = 0;i < state.car.data.length;i++) {
				let _item = state.car.data[i];
				if (_item.id === good.id) {
					index = i;
					good = _item;
					break;
				}
			}
			// s-2 更新商品数量
			if (good.from === 'detail') {
				// 商品来源详情页
				good.count += 1;
			} else {
				good.count = count;	
			}
			// if (count === '+1') {
			// 	(good.count === undefined) && (good.count = 0);
			// 	good.count += 1;
			// } else {
			// 	
			// }
			// s-2-1 维护商品数量变化
			state.car.changeData = JSON.parse('{\"' + good.id + '\":' + good.count + '}');
			// s-3 判断数量是0，移除商品
			if (index !== '' && count <= 0) {
				state.car.data.splice(index, 1);
			} else if (index === '') {
				// s-4 商品不在购物车中，添加进购物车
				state.car.data.push(good);
			}
			// s-5 统计购物车中的商品总数，总价
			let total = 0;
			let totalCount = 0;
			for (let z = 0;z < state.car.data.length;z++) {
				let _good = state.car.data[z];
				let _count = _good.count;
				totalCount += _count;
				total += _good.rprice * _count;
			}
			state.car.count = totalCount;
			state.car.total = total.toFixed(2);
			console.log('==store==');
			console.log(state.car.data);
		}
    }  
}) 