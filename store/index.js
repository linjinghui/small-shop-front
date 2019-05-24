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
		},
		doneSelectedCount: state => {
			let seletedCount = 0;
			for (let i = 0;i < state.car.data.length;i++) {
				let _item = state.car.data[i];
				if (_item.select) {
					seletedCount += 1;
				}
			}
			return seletedCount;
		}
	},
    mutations: {  
		// 设置登录用户
        setUser (state, data) {
			state.user = data;
        },
		// 商品加入购物车
		addGood (state, [good, callback]) {
			good = JSON.parse(JSON.stringify(good));
			let count = good.count;	
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
			if (!isNaN(count)) {
				// 有指定数量，直接设置
				good.count = count;
			} else if (index === '') {
				// 没有指定数量，且不存在购物车中
				good.count = 1;
			} else {
				// 没有指定数量，但已存在购物车中
				good.count += 1;
			}
			
			// s-2-1 判断商品库存
			console.log(good);
			if (good.count > good.stock) {
				uni.showToast({title: '无法购买更多', icon: 'none', position: 'bottom'});
				return;
			}

			// s-3 维护购物车中商品
			if (index === '') {
				// 商品添加进入购物车中
				state.car.data.push(good);
			} else if (good.count <= 0) {
				// 商品从购物车中移除
				state.car.data.splice(index, 1);
			} else {
				// 更新商品
				state.car.data.splice(index, 1, good);
			}
			
			// s-4 统计购物车中的商品总数、总价
			let totalCount = 0;
			let totalMoney = 0;
			for (let z = 0;z < state.car.data.length;z++) {
				let _good = state.car.data[z];
				let _count = _good.count;
				let _rprice = _good.rprice;
				let _select = _good.select;
				if (_select) {
					totalCount += _count;
					totalMoney += _rprice * _count;
				}
			}
			state.car.count = totalCount;
			state.car.total = totalMoney.toFixed(2);
			
			callback && callback(good);
		},
		// 设置商品勾选状态
		selectItem (state, [index, select, type]) {
			state.car.data[index].select = select;
			// console.log('==设置商品勾选状态==');
			// console.log(index);
			// console.log(select);
			// console.log(type);
			// console.log(state.car.data);
		}
    }  
}) 