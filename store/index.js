import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({  
    state: {  
        user: {
			openId: '',
			nickName: '',
			avatarUrl: require('../static/img/avater.png')
		},
		car: {
			total: 0,
			count: 0,
			data: []
		}
    },  
    mutations: {  
        setUser (state, data) {
			state.user = data;
        },
		// 商品加入购物车
		addGoodToCar (state, good) {
			let count = good.count;
			// 判断商品是否已经在购物车中，如果是则更新数量，不是则添加进购物车 ，如果数量是0 则移除商品
			// s-1 获取商品在购物车中的位置
			// good = JSON.parse(JSON.stringify(good));
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
			good.count = count;
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
		}
    }  
}) 