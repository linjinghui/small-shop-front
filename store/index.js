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
		},
		// 地址
		consignees: []
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
			let selectGoods = [];
			for (let i = 0;i < state.car.data.length;i++) {
				let _item = state.car.data[i];
				allCount += _item.count;
				if (_item.select) {
					selectCount += _item.count;
					selectMoney += _item.specsInfo.rprice * _item.count;
					selectGoods.push(_item);
				}
			}
			return {
				allCount: allCount,
				selectCount: selectCount,
				selectMoney: selectMoney,
				selectGoods: selectGoods
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
				if (_item._id === good._id && _item.specsInfo.name === good.specsInfo.name) {
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
				good.count = good.stock;
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
		},
		// 删除购物车中已购买成功的商品
		delGoods (state) {
			for (let i = state.car.data.length - 1;i >= 0;i--) {
				let _item = state.car.data[i];
				if (_item.select) {
					state.car.data.splice(i, 1);
				}
			}
		},
		// 设置收货地址
		setConsignee (state, data) {
			state.consignees = data || [];
		},
		// 把收货地址放到第一项
		setFirstConsignee (state, index) {
			let arr = state.consignees.splice(index, 1);
			state.consignees.unshift(arr[0]);
		},
		// 新增、编辑收货地址
		newEditConsignee (state, [data, index]) {
			if (!index && index !== 0) {
				// 新增
				state.consignees.push(data);
			} else {
				// 修改
				state.consignees.splice(index, 1, data);
			}
		}
    }  
}) 