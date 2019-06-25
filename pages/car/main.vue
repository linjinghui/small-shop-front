<template>
	<view class="content">
		
		<!-- 未选购提示 -->
		<view class="no-good" v-if="car.data.length===0">
			<uni-iconfont class="icon" size="50" type="sp" color="#ddd" />
			<p>您还未添加商品~</p>
			<button @click="clkQgg">去逛逛</button>
		</view>
		<view class="main" v-else>
			<scroll-view class="scroll-Y" scroll-y="true">
				<view class="wrap-address text-over" @click="clkConsignee">
					{{consignees&&consignees.length>0?('配送至：'+consignees[0].door_address):'请选择配送地址'}}
					<uni-icon class="icon" type="arrowright" size="16" color="#999" /> 
				</view>
				<good-list v-model="carData" :nselect="true" @changeCount="changeCount"></good-list>
			</scroll-view>
			<view class="footer">
				<view class="wrap-icon">
					<view class="icon-bg center-hv" v-if="selectAll"></view>
					<uni-iconfont class="icon center-hv" :type="selectAll?'gx':'wgx'" size="26" color="#ff9000" @click="clkSelectAll" />
				</view>
				已选 ({{selectResult.selectCount}})
				<button @click="clkPlaceOrder">去预定</button>
				<p class="price total">{{selectResult.selectMoney}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uniIconfont from '@/components/uni-iconfont/uni-icon.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import goodList from '@/components/good-list/good-list.vue';
	import {turnPage} from '@/common/global.js';
	import {ajaxGetAddresses, ajaxPlaceOrder} from '@/data/ajax.js';
	export default {
		components: {
			uniIcon,
			uniIconfont,
			goodList
		},
		data() {
			return {
				selectAll: false
			};
		},
		computed: {
			...mapState(['car', 'consignees']),
			carData: {
				get () {
					return this.$store.getters.doneCar;
				},
				set () {
					// 
				}
			},
			selectResult () {
				let result = this.$store.getters.doneSelectResult;
				this.selectAll = result.allCount === result.selectCount;
				return result;
			}
		},
		onLoad() {
			let _this = this;
			// 获取收货地址信息
			if (this.consignees.length === 0) {
				ajaxGetAddresses(this.$store.state.user, (data) => {
					_this.$store.commit('setConsignee', data.result);
				});
			}
		},
		methods: {
			clkQgg () {
				uni.navigateBack();
			},
			clkSelectAll () {
				this.selectAll = !this.selectAll;
				this.$store.commit('setSelectAll', [this.selectAll]);
			},
			clkConsignee () {
				turnPage('consignee', 'car');
			},
			changeCount (data) {
				this.EVENTHUB.$emit('updateCount', data);
			},
			clkPlaceOrder () {
				let goods = [];
				// let obj = Object.assign(this.consignees[0] || {}, {
				// 	goods: this.selectResult.selectGoods,
				// 	money: this.selectResult.selectMoney,
				// 	count: this.selectResult.selectCount
				// });
				this.selectResult.selectGoods.forEach(function (item) {
					goods.push({
						_id: item._id,
						specsId: item.specsInfo._id,
						count: item.count
					});
				});
				ajaxPlaceOrder({goods: goods, consigneesId: this.consignees[0]._id}, () => {
					let _this = this;
					uni.showToast({'title': '预定成功'});
					setTimeout(() => {
						turnPage('order', 1);
						// 删除购物车中已购买的商品
						_this.$store.commit('delGoods');
					}, 1500);
				});
			}
		}
	};
</script>

<style lang="scss">
	@import '@/common/global.scss';
	.content {
		height: 100%;
		background-color: #f4f5f6;
		
		// 未选购提示
		.no-good {
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
		
		> .main {
			height: 100%;
			
			> .scroll-Y {
				margin: 0;
				padding: 0;
				height: calc(100% - 60px);
				
				.wrap-address {
					color: #999;
					text-align: center;
					padding: 12px 10px;
				}
			}
			
			> .footer {
				position: relative;
				padding-left: 5px;
				height: 60px;
				line-height: 60px;
				font-size: 16px;
				color: #fff;
				background-color: #333;
				overflow: hidden;
				
				> .wrap-icon {
					position: relative;
					display: inline-block;
					width: 40px;
					height: 40px;
					vertical-align: middle;
					
					
					> .icon {
						display: inline-block;
						width: 26px;
						height: 26px;
						line-height: 20px;
						z-index: 2;
					}
					> .icon-bg {
						width: 16px;
						height: 16px;
						background-color: #fff;
						z-index: 1;
					}
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
		}
		.wrap-good-list {}
	}
</style>
