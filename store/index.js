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
		// 返回购物车中选中结果
		doneSelectResult: state => {
			let selectCount = 0;
			let selectMoney = 0;
			let allCount = 0;
			for (let i = 0;i < state.car.data.length;i++) {
				let _item = state.car.data[i];
				allCount += _item.count;
				if (_item.select) {
					selectCount += _item.count;
					selectMoney += _item.rprice * _item.count;
				}
			}
			return {
				allCount: allCount,
				selectCount: selectCount,
				selectMoney: selectMoney
			};
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
			
			callback && callback(good);
		},
		// 设置商品勾选状态
		selectItem (state, [index, select]) {
			state.car.data[index].select = select;
		},
		// 商品全部勾选或取消勾选
		setSelectAll (state, [select]) {
			for (let i = 0; i < state.car.data.length; i++) {
				state.car.data[i].select = select;
			}
		}
    }  
}) 