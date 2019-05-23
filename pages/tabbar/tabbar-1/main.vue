<!-- 商品列表展示页面 -->
<template>
	<view class="content">
		<ul class="header">
			<li :class="{'active':active.index===0}" @click="clkNav(0)">有货
				<view class="wrap-icon">
					<uni-icon class="icon tick" type="checkmarkempty" size="32" :color="active.index===0?'#029c45':'#000'"/>
				</view>
			</li>
			<li :class="{'active':active.index===1}" @click="clkNav(1)">价格
				<view class="wrap-icon">
					<uni-icon class="icon arrowup" type="arrowup" size="16" :color="(active.index===1&&active.dire==='up')?'#029c45':'#000'"/>
					<uni-icon class="icon arrowdown" type="arrowdown" size="16" :color="(active.index===1&&active.dire==='down')?'#029c45':'#000'"/>
				</view>
			</li>
			<li :class="{'active':active.index===2}" @click="clkNav(2)">折扣
				<view class="wrap-icon">
					<uni-icon class="icon arrowup" type="arrowup" size="16" :color="(active.index===2&&active.dire==='up')?'#029c45':'#000'" />
					<uni-icon class="icon arrowdown" type="arrowdown" size="16" :color="(active.index===2&&active.dire==='down')?'#029c45':'#000'" />
				</view>
			</li>
		</ul>
		<view class="main">
			<scroll-view class="scroll-Y" :scroll-top="scrollTop" scroll-y="true">
				<good-list v-model="goods" @click="clkLine"></good-list>
			</scroll-view>
		</view>
		<view class="footer">
			<image :src="user.avatarUrl" @click="clkImage"></image>
			已选 ({{car.count}})
			<button @click="clkConfirm">去预定</button>
			<p class="price total">{{car.total}}</p>
		</view>
	</view>
</template>

<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import bugBtn from '@/components/uni-bug-btn/uni-bug-btn.vue';
import goodList from '@/components/good-list/good-list.vue';
import {mapState} from 'vuex';
import {getClientUser, turnPage} from '@/common/global.js';
import {ajaxGetGoods} from '@/data/ajax.js';
export default {
	components: {
		uniIcon,
		bugBtn,
		goodList
	},
	data() {
		return {
			scrollTop: 0,
			defGoodPic: require('@/static/img/defgood.png'),
			// 搜索导航信息
			active: {
				index: '',
				// 方向：up,down
				dire: ''
			},
			// 选中的商品
			chooses: [],
			// 商品列表
			goods: []
		};
	},
	computed: {
		...mapState(['user', 'car'])
	},
	onLoad() {
		let _this = this;
		let result = ajaxGetGoods('', function (data) {
			data = data.result || [];
			// 注入初始数量
			data = JSON.stringify(data).replace(/"stock"/g, '"count":0,"stock"');
			_this.goods = JSON.parse(data);
		});
		getClientUser(function (userInfo) {
			_this.$store.commit('setUser', userInfo);
		});
	},
	methods: {
		// 顶部排序导航点击
		clkNav (index) {
			let dire = this.active.dire === 'up' ? 'down' : 'up';
			this.$set(this.active, 'index', index);
			this.$set(this.active, 'dire', dire);
			this.goods.sort(function(a, b){
				let result = false;
				switch (index){
					case 0:
						result = a.stock < b.stock;
						break;
					case 1:
						result = dire === 'up' ? a.price > b.price : a.price < b.price;
						break;
					default:
						result = dire === 'down' ? a.rebate > b.rebate : a.rebate < b.rebate;
						break;
				}
				return result;
			});
		},
		clkImage () {
			turnPage('my');
		},
		clkConfirm () {
			if (this.$store.state.car.data.length === 0) {
				uni.showToast({title: '请先选择商品', icon: 'none', position: 'bottom'});
			} else {
				turnPage('car');
			}
		},
		clkLine (data) {
			turnPage('detail', data);
		}
	}
};
</script>

<style lang="scss">
@import '@/common/global.scss';
.content {
	height: 100%;
	overflow: hidden;
}
.header {
	width: 100%;
	height: 30px;
	line-height: 30px;
	border-bottom: solid 1px $border-color;
	
	> li {
		position: relative;
		float: left;
		width: 33.33%;
		height: 100%;
		text-align: center;
		
		.wrap-icon {
			position: relative;
			display: inline-block;
			width: 20px;
			height: 100%;
			vertical-align: middle;
			// border: solid 1px;
			
			> .icon {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				margin: auto;
			}
			.tick {
				top: -2px;
				left: -6px;
			}
			.arrowup {
				top: 2px;
			}
			.arrowdown {
				top: 10px;
			}
		}
	}
	> li.active {
		color: $theme;
	}
}

.main {
	height: calc(100% - 30px - 60px - 1px);
	
	> .scroll-Y {
		height: 100%;
	}
}

.footer {
	position: relative;
	padding-left: 10px;
	height: 60px;
	line-height: 60px;
	font-size: 16px;
	color: #fff;
	background-color: #333;
	
	> image {
		display: inline-block;
		margin-right: 10px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		vertical-align: middle;
	}
	
	> .total {
		float: right;
		padding: 0 10px;
		font-size: 18px;
	}
	
	> button {
		float: right;
		width: 32%;
		height: 100%;
		line-height: inherit;
		border-radius: 0;
		color: inherit;
		background-color: $theme-2;
	}
	> button:after {
		border: 0;
		border-radius: 0;
	}
}
</style>
