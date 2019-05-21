<!-- 商品列表展示页面 -->
<template>
	<view class="content">
		<ul class="header">
			<li :class="{'active':active.index===0}" @click="clkNav(0)">有货
				<view class="wrap-icon">
					<uni-icon class="icon tick" type="checkmarkempty" size="32" :color="active.index===0&&'#029c45'"/>
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
                <view class="item" v-for="(info,index) in goods" :key="info.id">
					<view class="wrap-left">
						<image lazy-load="true" :src="info.pic" @error="eventImageError(index)"></image>
					</view>
					<view class="wrap-right">
						<p class="name">{{info.name}}</p>
						<p class="desc">{{info.desc}}</p>
						<p class="wrap-unit">
							<span class="label" v-if="info.label" :style="{color:info.label.color,backgroundColor:info.label.bcolor}">{{info.label.text}}</span>
							<span class="unit">{{info.unit}}</span>
						</p>
						<p class="wrap-price">
							<span class="price">{{utlRealPrice(index)}}</span>
							<span class="price del" v-if="info.rebate<10">{{info.price}}</span>
						</p>						
					</view>
					<bug-btn class="wrap-btn-bug" :max="info.stock" @click="clkChoose($event,index)"/>
				</view>
			</scroll-view>
		</view>
		<view class="footer">
			<image :src="user.avatarUrl" @click="clkImage"></image>
			已选 ({{totalCount}})
			<button ref:vref open-type="getUserInfo" @getuserinfo="getUserInfo">去预定</button>
			<p class="price total">{{total}}</p>
		</view>
	</view>
</template>

<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import bugBtn from '@/components/uni-bug-btn/uni-bug-btn.vue';
import {mapState} from 'vuex';
import {ajaxGetGoods} from '@/data/ajax.js';
import {getClientUser, turnPage} from '@/common/global.js';
export default {
	components: {
		uniIcon,
		bugBtn
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
		...mapState(['user']),
		total () {
			let result = 0;
			for (let i = 0;i < this.chooses.length;i++) {
				let count = this.chooses[i].count || 1;
				let price = this.chooses[i].price;
				result += parseFloat(price) * parseFloat(count);
			}
			return parseFloat(result).toFixed(2);
		},
		totalCount () {
			let result = 0;
			for (let i = 0;i < this.chooses.length;i++) {
				let count = this.chooses[i].count || 1;
				result += parseInt(count);
			}
			return result;
		}
	},
	onLoad() {
		let _this = this;
		let result = ajaxGetGoods('', function (data) {
			_this.goods = data.result;
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
		// 选中商品
		clkChoose (e, index) {
			if (e.error) {
				uni.showToast({title: '无法购买更多', icon: 'none', position: 'bottom'});
			} else {
				let good = this.goods[index];
				let _good = this.utlGetGoodFromChoose(good);
				if (_good) {
					this.$set(_good, 'count', e.num);
				} else {
					this.chooses.push(good);
				}
				uni.showToast({title: '添加成功', icon: 'none', position: 'center'});
			}
		},
		// 获取选中商品在已添加商品中的信息
		utlGetGoodFromChoose (good) {
			let result = '';
			for (let i = 0;i < this.chooses.length;i++) {
				let _good = this.chooses[i];
				if (_good.id === good.id && _good.name === good.name) {
					result = _good;
					break;
				}
			}
			return result;
		},
		// 计算折扣后的真实价格
		utlRealPrice (index) {
			let good = this.goods[index];
			let _price = good.price * good.rebate / 10;
			return _price.toFixed(2);
		},
		eventImageError (index) {
			let good = this.goods[index];
			this.$set(good, 'pic', this.defGoodPic);
		},
		clkImage () {
			turnPage('my');
		}
	}
};
</script>

<style lang="scss">
.content {
	overflow: hidden;
}
.header {
	width: 100%;
	height: 30px;
	line-height: 30px;
	border-bottom: solid 1px #f0f0f0;
	
	> li {
		position: relative;
		float: left;
		width: 33.33%;
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
		color: #029c45;
	}
}

.main {
	height: calc(100% - 30px - 60px - 1px);
	
	> .scroll-Y {
		height: 100%;
	}
	
	.item {
		position: relative;
		padding-top: 10px;
		height: 140px;
		
		> .wrap-left {
			position: relative;
			float: left;
			width: 100px;
			height: 100%;
			
			> image {
				position: absolute;
				top: -10px;
				right: 0;
				bottom: 0;
				left: 0;
				margin: auto;
				width: 80px;
				height: 80px;
				will-change: transform;
			}
		}
		> .wrap-right {
			float: left;
			padding-right: 10px;
			width: calc(100% - 100px - 10px);
			height: 100%;
			line-height: 30px;
			
			> .name {
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 18px;
			}
			> .desc {
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				color: #aaa;
			}
			.label {
				margin-right: 5px;
				padding: 2px 8px;
				border-radius: 2px;
			}
			.unit {
				padding: 2px 8px;
				border-radius: 2px;
				color: #666;
				background-color: #f6f6f6;
			}
			.price {
				display: inline-block;
				margin-top: 5px;
				margin-right: 5px;
				color: #ff9000;
				font-size: 18px;
			}
			.price.del {
				font-size: unset;
				color: #aaa;
				text-decoration: line-through;
			}
		}
		
		.wrap-btn-bug {
			position: absolute;
			right: 10px;
			bottom: 14px;
		}
		
	}
	.item:after {
		content: '';
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		width: calc(100% - 20px);
		height: 1px;
		background-color: #f0f0f0;
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
		background-color: #ff9000;
	}
	> button:after {
		border: 0;
		border-radius: 0;
	}
	> button:active {
		background-color: #ff8000;
	}
}
</style>
