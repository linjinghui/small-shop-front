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
		<!-- <good-list v-model="goods" @click="clkLine"></good-list> -->
		<ul class="wrap-goods">
			<li v-for="(item,index) in goods" :key="item.id" @click="clkLine(index)">
				<image lazy-load="true" :src="item.avatar"></image>
				<view class="wrap-name">
					<span class="label" v-if="!nselect&&!small" v-for="lbinfo in item.label" :key="lbinfo.id" :style="{'backgroundColor':lbinfo.bgcolor}">{{lbinfo.text}}</span>
					<text>{{item.name}}</text>
				</view>
				<view class="wrap-price">
					<text class="price">{{item.specsInfo.rprice}}</text>
					<uni-iconfont class="icon-car" type="car" size="22" color="#ff9000" />
				</view>
			</li>
		</ul>
		<uni-load-more :status="status" />
		<view class="footer">
			<image :src="user.avatarUrl" @click="clkImage"></image>
			已选 ({{selectResult.selectCount}})
			<button @click="clkConfirm">去预定</button>
			<p class="price total">{{selectResult.selectMoney}}</p>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import uniIconfont from '@/components/uni-iconfont/uni-icon.vue'
	import bugBtn from '@/components/uni-bug-btn/uni-bug-btn.vue';
	import goodList from '@/components/good-list/good-list.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import {mapState} from 'vuex';
	import {getClientUser, turnPage} from '@/common/global.js';
	import {ajaxSignin, ajaxGetGoods} from '@/data/ajax.js';
	export default {
	components: {
		uniIcon,
		uniIconfont,
		bugBtn,
		goodList,
		uniLoadMore
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
			goods: [],
			// 分页-当前页
			page: 1,
			// 分页-每页大小
			size: 10,
			// 分页-总页数
			totalPage: 1,
			// 上拉显示更多组件
			// more loading noMore
			status: 'more',
			contentText: {
				contentdown: '查看更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		};
	},
	watch: {},
	computed: {
		user () {
			return this.$store.getters.doneUser;
		},
		selectResult () {
			return this.$store.getters.doneSelectResult;
		}
	},
	onShareAppMessage: function () {
		// 
	},
	onPullDownRefresh () {
		let _this = this;
		_this.page = 1;
		_this.status = 'loading';
		_this.getListData(() => {
			uni.stopPullDownRefresh();
			_this.status = _this.totalPage > _this.page ? 'more' : 'noMore';
		});
	},
    onReachBottom () {
		let _this = this;
		if (_this.totalPage > _this.page) {
			_this.page += 1;
			// 获取列表数据
			_this.status = 'loading';
			_this.getListData(() => {
				_this.status = 'more';
			});
		} else {
			// 没有更多数据
			_this.status = 'noMore';
		}
    },
	onLoad() {
		let _this = this;
		
		// 获取微信用户信息
		getClientUser(function (userInfo) {
			if (userInfo) {
				uni.showToast({title: userInfo.avatarUrl, icon: 'none'});
				// _this.$store.commit('setUser', userInfo);
				// 登录
				ajaxSignin(userInfo, ret => {
					_this.$store.commit('setUser', userInfo);
					// 缓存token
					uni.setStorageSync('token', ret.result);
					// uni.setStorage({key: 'token', data: ret.result});
					// 获取列表数据
					_this.getListData(() => {
						_this.status = _this.totalPage > _this.page ? 'more' : 'noMore';
					});
				}, err => {
					uni.showToast({title: err.msg, icon: 'none', position: 'bottom'});
					setTimeout(function() {turnPage('my', '', true);}, 800);
				});
			} else {
				// 需要手动登录
				// uni.showToast({title: '请先登录~', icon: 'none', position: 'bottom'});
				// setTimeout(function() {turnPage('my', '', true);}, 800);
				// 未登录、允许查看列表、获取列表数据
				_this.getListData(() => {
					_this.status = _this.totalPage > _this.page ? 'more' : 'noMore';
				});
			}			
		});
		
		this.EVENTHUB.$on('updateCount', this.utlUpdateGoodCount);
		// this.EVENTHUB.$on('clearCount', this.utlClearGoodCount);
	},
	methods: {
		// 顶部排序导航点击
		clkNav (index) {
			let dire = this.active.dire === 'up' ? 'down' : 'up';
			this.$set(this.active, 'index', index);
			this.$set(this.active, 'dire', dire);
			this.goods.sort(function(a, b){
				let result = false;
				let specs_a = a.specs[0];
				let specs_b = b.specs[0];
				switch (index){
					case 0:
						result = specs_a.stock < specs_b.stock;
						break;
					case 1:
						if (parseFloat(specs_a.price) > parseFloat(specs_b.price)) {
							result = dire === 'up' ? 1 : -1;
						} else if (parseFloat(specs_a.price) < parseFloat(specs_b.price)) {
							result = dire === 'up' ? -1 : 1;
						} else {
							result = 0;
						}
						// result = dire === 'up' ? (parseFloat(specs_a.price) > parseFloat(specs_b.price)) : (parseFloat(specs_a.price) < parseFloat(specs_b.price));
						break;
					default:
						if (parseFloat(a.rebate) > parseFloat(b.rebate)) {
							result = dire === 'up' ? 1 : -1;
						} else if (parseFloat(a.rebate) < parseFloat(b.rebate)) {
							result = dire === 'up' ? -1 : 1;
						} else {
							result = 0;
						}
						// result = dire === 'down' ? (parseFloat(a.rebate) > parseFloat(b.rebate)) : (parseFloat(a.rebate) < parseFloat(b.rebate));
						break;
				}
				return result;
			});
		},
		clkImage () {
			turnPage('my');
		},
		clkConfirm () {
			// 判断是否登录			
			if (!uni.getStorageSync('token')) {
				uni.showToast({title: '请先登录~', icon: 'none', position: 'bottom'});
				setTimeout(function() {turnPage('my', '');}, 800);	
			} else if (this.$store.state.car.data.length === 0) {
				uni.showToast({title: '请先选择商品', icon: 'none', position: 'bottom'});
			} else {
				turnPage('car');
			}
		},
		clkLine (index) {
			let data = this.goods[index];
			// 判断是否登录
			if (uni.getStorageSync('token')) {
				console.log('===', data);
				turnPage('detail', data);
			} else {
				uni.showToast({title: '请先登录~', icon: 'none', position: 'bottom'});
				setTimeout(function() {turnPage('my', '');}, 800);	
			}			
		},
		// 更新商品数量
		utlUpdateGoodCount (data) {
			let id = data._id;
			let count = data.count;
			let specsName = data.specsInfo.name;
			for (let i = 0; i < this.goods.length; i++) {
				let _item = this.goods[i];
				if (_item._id === id && _item.specsInfo.name === specsName && _item.count !== count) {
					data = _item;
					break;
				}
			}
				
			if (count || count === 0) {
				this.$set(data, 'count', count);	
			}
		},
		// 清空商品数量
		utlClearGoodCount () {
			let _this = this;
			for (let i = 0; i < this.goods.length; i++) {
				let _item = this.goods[i];
				if (_item.count) {
					_this.$set(_item, 'count', 0);	
				}
			}
		},
		getListData (callback) {
			let _this = this;
			ajaxGetGoods({
				page: _this.page,
				size: _this.size,
				code: _this.$store.state.user.code
			}, function (data) {
				// 计算总页数
				_this.totalPage = parseInt((data.result.total - 1) / _this.size + 1);
				data = data.result.list || [];
				for (let i = 0;i < data.length;i++) {
					let _specs = data[i].specs || [];
					_specs = _specs.sort(function(a, b){
						if (parseFloat(a.price) > parseFloat(b.price) ) {
							return 1;
						}
						if (parseFloat(a.price) < parseFloat(b.price) ) {
							return -1;
						}
						return 0;
					})
					data[i].specsInfo = _specs[0];
				}
				// 注入初始数量 0
				data = JSON.stringify(data).replace(/"_id"/g, '"count":0,"select":false,"_id"');
				if (_this.page <= 1) {
					_this.goods = JSON.parse(data);	
				} else {
					_this.goods = _this.goods.concat(JSON.parse(data));
				}
				callback && callback();
			});
		}
	}
};
</script>

<style lang="scss">
	@import '@/common/global.scss';
	.content {
		padding-bottom: 60px;
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
		overflow: auto;
		
		> .scroll-Y {
			height: 100%;
		}
	}
	
	.wrap-goods {
		display: flex;
		flex-shrink: 0;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-left: 10px;
		padding-right: 10px;
		
		> li {
			margin-top: 10px;
			padding-bottom: 5px;
			width: calc(50vw - 15px);
			border-radius: 4px;
			overflow: hidden;
			box-shadow: 0 0 10px rgba(0,0,0,0.1);
			
			image {
				width: 100%;
				height: calc(50vw - 15px);
			}
			
			.wrap-name {
				padding-left: 5px;
				padding-right: 5px;
				height: 42px;
				line-height: 18px;
				overflow: hidden;
				font-size: 16px;
				
				// text-overflow: -o-ellipsis-lastline;
				// overflow: hidden;
				// text-overflow: ellipsis;
				// display: -webkit-box;
				// -webkit-line-clamp: 2;
				// -webkit-box-orient: vertical;
			}
			
			.label {
				margin-right: 2px;
				padding: 0 2px;
				vertical-align: 1px; 
				font-size: 10px;
				color: #fff;
				border-radius: 2px;
				background-color:red;
			}
			.wrap-price {
				display: flex;
				padding-left: 5px;
				padding-right: 5px;
				flex-shrink: 0;
				justify-content: space-between;
			}
			.icon-car {
				
			}
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		padding-left: 10px;
		width: 100%;
		height: 60px;
		line-height: 60px;
		font-size: 16px;
		color: #fff;
		background-color: #333;
		z-index: 3;
		
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
