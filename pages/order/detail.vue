<template>
	<view class="content" v-if="orderInfo.id">
		<cust-service v-model="showCts"></cust-service>
		<view class="header">
			<text class="status">{{orderInfo.status===1?'等待卖家接单':orderInfo.status===2?'备货中':orderInfo.status===3?'配送中':'订单已完成'}}</text>
			<text class="sub" v-if="orderInfo.status===4">感谢你您的信任，期待再次光临</text>
			<button @click="clkJxgm">继续购买</button>
			<button @click="clkKf">客服</button>
		</view>
		<view class="list">
			<view class="item" style="padding-top:0;padding-bottom:0;">
				商品<view class="right">{{orderInfo.count}}件</view>
			</view>
			<view class="item" v-for="(item,index) in orderInfo.goods" :key="item.id">
				<view class="left">
					<image class="center-hv" :src="item.pic"></image>
				</view>
				<view class="middle">
					<p class="name text-over">{{item.name}}</p>
					<p class="jg">
						<text class="price">{{item.rprice}}</text>
						<text class="price del" v-if="item.nprice">{{item.nprice}}</text>
					</p>
				</view>
				<view class="right">x {{item.count}}</view>
			</view>
		</view>
		<view class="list total">
			<view class="item">总价<view class="right price">{{orderInfo.money}}</view></view>
			<view class="item">配送费<view class="right price">{{orderInfo.expMoney}}</view></view>
			<view class="item">合计<view class="right price">{{orderInfo.money + orderInfo.expMoney}}</view></view>
		</view>
		<view class="list type-1">
			<view class="item">
				<view class="left">收货人：</view>
				<view class="middle">{{orderInfo.name}} {{parseMobile(orderInfo.mobile)}}</view>
			</view>
			<view class="item">
				<view class="left">收货地址：</view>
				<view class="middle">{{orderInfo.address}} {{orderInfo.door_address}}</view>
			</view>
		</view>
		<view class="list type-1">
			<view class="item">
				<view class="left">订单号：</view>
				<view class="middle">{{orderInfo.id}} <button class="copy" @click="clkCopy">复制</button> </view>
			</view>
			<view class="item">
				<view class="left">下单时间：</view>
				<view class="middle">{{orderInfo.time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import custService from '@/components/cust-service/cust-service.vue';
	import {encodeMobile} from '@/common/tool.js';
	import {ajaxGetOrderInfo} from '@/data/ajax.js';
	
	export default {
		components: {
			custService
		},
		data() {
			return {
				// 显示、隐藏客服
				showCts: false,
				orderInfo: {}
			};
		},
		computed: {},
		onLoad(e) {
			let _this = this;
			this.id = e.id;
			ajaxGetOrderInfo(e, (data) => {
				_this.orderInfo = data.result;
			});
		},
		methods: {
			clkCopy () {
				uni.setClipboardData({
					data: this.orderInfo.id,
					success: function() {
						uni.showToast({'title': '订单号复制成功'});
					}
				})
			},
			clkKf () {
				this.showCts = true;
			},
			parseMobile (data) {
				return encodeMobile(data);
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
		
		.price {
			font-size: inherit;
			color: inherit;
		}
		
		> view {
			margin-bottom: 10px;
			background-color: #fff;
		}
		
		> .header {
			padding: 10px 0;
			line-height: 32px;
			text-align: center;
			
			> .status {
				display: block;
				font-size: 18px;
			}
			> .sub {
				display: block;
			}
			> button {
				display: inline-block;
				margin-top: 10px;
				margin-left: 10px;
				width: 100px;
				height: 30px;
				line-height: 28px;
				font-size: inherit;
				color: #999;
				border: solid 1px $border-color;
				border-radius: 2px;
				background-color: transparent;
			}
		}
		
		> .list {
			> .item {
				padding: 10px;
				height: 50px;
				line-height: 50px;
				overflow: hidden;
				border-bottom: solid 1px $border-color;
				
				> .left {
					position: relative;
					float: left;
					width: 50px;
					height: 100%;
					
					> image {
						right: inherit;
						width: 80%;
						height: 80%;
					}
					
				}
				> .middle {
					float: left;
					width: calc(100% - 50px - 50px);
					line-height: 25px;
					
					.del {
						color: #999;
					}
				}
				> .right {
					float: right;
					width: 50px;
					height: 100%;
					text-align: right;
				}
			}
		}
		
		> .list.total > .item {
			padding-top: 5px;
			padding-bottom: 5px;
			
			> .right {
				width: 120px;
			}
		}
		
		> .list.type-1 {
			> .item {
				height: unset;
				line-height: unset;
				border: 0;
				
				> .left {
					width: 80px;
					height: unset;
					color: #999;
				}
				
				> .middle {
					width: calc(100% - 80px);
					line-height: unset;
				}
				
				.copy {
					display: inline-block;
					margin-left: 10px;
					padding: 0;
					width: 40px;
					height: 24px;
					line-height: 20px;
					color: $theme;
					background-color: transparent;
					border: solid 1px $theme;
					font-size: 12px;
					vertical-align: middle;
				}
			}
		}
		
		// 客服
		> .wrap-kf {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			line-height: 22px;
			background-color: rgba(255, 255, 255, 1);
			z-index: 2;
			
			> .main {
				width: 240px;
				height: 374px;
				
				> image {
					margin-bottom: 10px;
					width: 100%;
				}
				> text {
					display: block;
				}
			}
		}
	}
</style>
