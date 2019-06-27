<template>
	<view class="content">
		购物车子页面，添加订单其他信息
		<hr>
		{{JSON.stringify(orderInfo)}}}
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
		height: 100%;
		background-color: #f4f5f6;
	}
</style>
