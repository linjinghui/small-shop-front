<template>
	<view class="content">
		<view class="no-order" v-if="totalPage===0">
			<uni-iconfont class="icon" size="50" type="sp" color="#ddd" />
			<p>您还没有下单记录哦~</p>
		</view>
		<view class="wrap-order" v-else v-for="(info,index) in orders" :key="info.id" @click="clkOrder(index)">
			<view class="wrap-header">
				<text class="status">{{info.status===0?'已取消':info.status===1?'等待卖家接单':(info.status===2||info.status===3)?'备货中':(info.status===4||info.status===5)?'配送中':'已完成'}}</text>
				<text class="time">{{formateDate(info.time)}}</text>
				<uni-icon class="icon" type="arrowright" size="16" color="#999" /> 
			</view>
			<view class="wrap-list">
				<view class="wrap-item" v-for="(item,index) in info.order_product" :key="item">
					<template v-if="index<2">
						<image :src="item.avatar"></image>
						<text class="name">{{item.name}}</text>
						<text class="count">x {{item.count}}</text>
					</template>
				</view>
				<view class="wrap-item">
					<template v-if="info.order_product.length>2">...</template>
					<view class="total">共{{info.count}}份，金额<text class="price">{{info.money}}</text></view>
				</view>
			</view>
			<view class="wrap-footer">
				<button class="del" v-if="info.status===1" @click.stop="clkCancel(index)">取消订单</button>
				<button v-if="info.status!==0">再来一单</button>
				<button v-if="info.status===0" @click.stop="clkDel(index)">删除订单</button>
			</view>
		</view>
		<uni-load-more :status="status" v-if="totalPage>0" />
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import uniIconfont from '@/components/uni-iconfont/uni-icon.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import {turnPage} from '@/common/global.js';
	import {dataFormat} from '@/common/tool.js';
	import {ajaxGetOrders, ajaxCancelOrder, ajaxDelOrder} from '@/data/ajax.js';
	
	export default {
		components: {
			uniIcon,
			uniIconfont,
			uniLoadMore
		},
		data() {
			return {
				orders: [],
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
		computed: {},
		onLoad(e) {
			let _this = this;
			// 获取订单数据
			this.getOrderList(() => {
				_this.status = _this.totalPage > _this.page ? 'more' : 'noMore';
			});
		},
		onPullDownRefresh () {
			let _this = this;
			_this.page = 1;
			_this.status = 'loading';
			_this.getOrderList(() => {
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
				_this.getOrderList(() => {
					_this.status = 'more';
				});
			} else {
				// 没有更多数据
				_this.status = 'noMore';
			}
		},
		methods: {
			clkOrder (index) {
				turnPage('order-info', this.orders[index]._id);
			},
			clkCancel (index) {
				console.log(index);
				let _this = this;
				let data = _this.orders[index];
				uni.showModal({
					title: '取消订单',
					content: '确定取消该订单？',
					success: (res) => {
						if (res.confirm) {
							ajaxCancelOrder(data, (result) => {
								uni.showToast({title: '订单已取消！'});
								_this.$set(data, 'status', 0);
								// _this.orders.splice(index, 1);
							});
						}
					}
				});
			},
			clkDel (index) {
				let _this = this;
				let data = _this.orders[index];
				uni.showModal({
					title: '删除订单',
					content: '确定删除该订单？',
					success: (res) => {
						if (res.confirm) {
							ajaxDelOrder(data, (result) => {
								uni.showToast({title: '订单已删除！'});
								_this.orders.splice(index, 1);
							});
						}
					}
				});
			},
			getOrderList (callback) {
				let _this = this;
				ajaxGetOrders({
					page: _this.page,
					size: _this.size
				}, (data) => {
					// 计算总页数
					_this.totalPage = parseInt((data.result.total - 1) / _this.size + 1);
					data = data.result.list || [];
					if (_this.page <= 1) {
						_this.orders = data;
					} else {
						_this.orders = _this.orders.concat(data);
					}
					callback && callback();
				});
			},
			formateDate (date) {
				return dataFormat(new Date(date), 'yyyy-MM-dd hh:mm');
			}
		}
	};
</script>

<style lang="scss">
	@import '@/common/global.scss';
	
	.content {
		min-height: 100%;
		background-color: #f4f5f6;
		
		// 未选购提示
		> .no-order {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			height: 200px;
			text-align: center;
			font-size: 14px;
			
			> p {
				margin-top: 8px;
				margin-bottom: 14px;
				color: #ddd;
			}
			> button {
				width: 80px;
				height: 30;
				line-height: 30px;
				font-size: inherit;
				color: #fff;
				border-radius: 20px;
				background-color: $theme;
			}
		}
		
		> .wrap-order {
			margin-top: 10px;
			padding: 0 10px;
			background-color: #fff;
			
			> .wrap-header {
				padding: 10px 0;
				border-bottom: solid 1px $border-color;
				
				> .status {
					margin-right: 5px;
					font-weight: bold;
				}
				> .time {
					font-size: 12px;
					color: #999;
				}
				> .icon {
					float: right;
				}
			}
			
			> .wrap-list {
				> .wrap-item {
					padding: 10px;
					padding-right: 0;
					font-size: 12px;
					border-bottom: solid 1px $border-color;
					overflow: hidden;
					
					image {
						display: inline-block;
						width: 40px;
						height: 40px;
						vertical-align: middle;
					}
					
					> .name {
						margin-left: 10px;
					}
					
					> .count {
						float: right;
						margin-top: 8px;
					}
					
					> .total {
						float: right;
						
						> .price {
							font-size: 16px;
						}
					}
				}
			}
			
			> .wrap-footer {
				padding: 8px 0;
				text-align: right;
				
				button {
					display: inline-block;
					margin: 0;
					padding: 0 14px;
					margin-left: 10px;
					height: 32px;
					line-height: 30px;
					font-size: 12px;
					color: $theme;
					background-color: transparent;
					border: solid 1px $theme;
				}
				> .del {
					color: #999;
					border: solid 1px $border-color;
				}
			}
		}
	}
</style>
