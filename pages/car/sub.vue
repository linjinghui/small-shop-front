<template>
	<view class="content">
		<ol>
			<dd class="arrow">
				<div>送达时间</div>
				<div>暂无可用</div>
			</dd>
		</ol>
		<ol>
			<dt class="noline">备注</dt>
			<dd class="noline">
				<input type="text" placeholder="输入备注信息" value="" />
			</dd>
			<dd>
				<div>商品</div>
				<div>3件</div>
			</dd>
			<dd>
				<div>xx</div>
				<div>x1</div>
			</dd>
		</ol>
	</view>
</template>

<script>
	import {turnPage} from '@/common/global.js';
	import {ajaxPlaceOrder} from '@/data/ajax.js';
	export default {
		components: {},
		data() {
			return {
				orderInfo: ''
			};
		},
		computed: {},
		onLoad(e) {
			console.log(JSON.parse(e.data));
			this.orderInfo = JSON.parse(e.data);
		},
		methods: {
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
				console.log('===clkPlaceOrder===');
				console.log(this.selectResult.selectGoods);
				ajaxPlaceOrder({goods: goods, consigneesId: this.consignees[0] && this.consignees[0]._id}, () => {
					let _this = this;
					uni.showToast({'title': '预定成功'});
					setTimeout(() => {
						turnPage('order', 1);
					}, 1000);
					setTimeout(() => {
						// 删除购物车中已购买的商品
						_this.selectResult.selectGoods.forEach(function (item) {
							item.count = 0;
							_this.EVENTHUB.$emit('updateCount', item);
						});
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
		padding-top: 1px;
		height: 100%;
		background-color: #f4f5f6;
	}
	
	ol {
		margin-top: 10px;
		padding: 0 10px;
		background-color: #fff;
		
		> dt, > dd {
			position: relative;
			padding: 14px 0;
		}
		> dt {
			padding: 8px 0;
		}
		> dt:not(.noline):after, 
		> dd:not(.noline):not(:last-of-type):after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			border-bottom: solid 1px #e3e3e3;
		}
		> dd.arrow {
			padding-right: 20px;
		}
		> dd.arrow:after {
			content: '';
			position: absolute;
			top: 0;
			right: 4px;
			bottom: 0;
			margin: auto;
			width: 8px;
			height: 8px;
			border: solid 1px #a3a3a3;
			border-left: 0;
			border-bottom: 0;
			transform: rotate(45deg);
		}
		> dd {
			display: flex;
			flex-shrink: 0;
			
			> div,
			> input {
				flex: 1;
			}
			> div:nth-of-type(2) {
				text-align: right;
			}
			> input {
				padding: 0 10px;
				height: 34px;
				border: solid 1px #e3e3e3;
				border-radius: 4px;
			}
		}
	}
</style>
