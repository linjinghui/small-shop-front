<template>
	<view class="content">
		<view class="no-order" v-if="orders===null">
			<uni-iconfont class="icon" size="50" type="sp" color="#ddd" />
			<p>您还没有下单记录哦~</p>
		</view>
		<view class="wrap-order" v-if="orders&&orders.length>0" v-for="(info,index) in orders" :key="info.id" @click="clkOrder(info)">
			<view class="wrap-header">
				<text class="status">{{info.status===1?'等待卖家接单':info.status===2?'备货中':info.status===3?'配送中':'已完成'}}</text>
				<text class="time">{{info.time}}</text>
				<uni-icon class="icon" type="arrowright" size="16" color="#999" /> 
			</view>
			<view class="wrap-list">
				<view class="wrap-item" v-for="(item,index) in info.goods" :key="item.id">
					<image :src="item.pic"></image>
					<text class="name">{{item.name}}</text>
					<text class="count">x {{item.count}}</text>
				</view>
				<view class="wrap-item">
					...<view class="total">共{{info.count}}份，金额<text class="price">{{info.money}}</text></view>
				</view>
			</view>
			<view class="wrap-footer">
				<button class="del" v-if="info.status===1">删除订单</button>
				<button>再来一单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import uniIconfont from '@/components/uni-iconfont/uni-icon.vue'
	import {turnPage} from '@/common/global.js';
	import {ajaxGetOrders} from '@/data/ajax.js';
	
	export default {
		components: {
			uniIcon,
			uniIconfont
		},
		data() {
			return {
				orders: []
			};
		},
		computed: {},
		onLoad(e) {
			let _this = this;
			ajaxGetOrders({}, (data) => {
				let result = data.result;
				if (result && result.length > 0) {
					_this.orders = result;
				} else {
					_this.orders = null;
				}
			});
		},
		methods: {
			clkOrder (data) {
				turnPage('order-info', data.id);
			}
		}
	};
</script>

<style lang="scss">
	@import '@/common/global.scss';
	
	.content {
		height: 100%;
		overflow: auto;
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
