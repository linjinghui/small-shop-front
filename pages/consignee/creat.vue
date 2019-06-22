<template>
	<view class="content">
		<view class="uni-form-item uni-column">
			<view class="title">收货人：</view>
			<input class="p-r uni-input" maxlength="20" placeholder="收货人姓名" v-model="consignee.name" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">电话号码：</view>
			<input class="p-r uni-input" maxlength="15" type="number" placeholder="配送员联系您的电话号码" v-model="consignee.mobile" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">收货地址：</view>
			<view class="p-r">
				<view class="with-fun">
					<input class="uni-input" placeholder="请选择收货小区地址" disabled="disabled" v-model="consignee.address" @click="clkSelectAddress" />
					<uni-icon class="icon center-hv arrowright" size="24" type="arrowright" color="#808080" @click="clkSelectAddress" />
				</view>
				<input class="uni-input" placeholder="楼号/门牌号" maxlength="100" v-model="consignee.door_address" />
			</view>
		</view>
		<button @click="clkSave">保存收货地址</button>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import {ajaxSaveAddresses} from '@/data/ajax.js';
	
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				index: '',
				consignee: {}
			};
		},
		computed: {},
		onLoad(e) {
			if (e.index || e.index === 0) {
				this.index = e.index;
				this.consignee = this.$store.state.consignees[e.index];
			}
		},
		methods: {
			clkSelectAddress () {
				let _this = this;
				uni.chooseLocation({
					success: (res) => {
						_this.$set(_this.consignee, 'address', res.address);
						_this.$set(_this.consignee, 'door_address', res.name);
					}
				});
			},
			clkSave () {
				let _this = this;
				ajaxSaveAddresses(_this.consignee, (data) => {
					if (_this.consignee._id) {
						_this.$store.commit('newEditConsignee', [_this.consignee, _this.index]);
					} else {
						_this.$set(_this.consignee, '_id', data.result);
						_this.$store.commit('newEditConsignee', [_this.consignee]);
					}
					uni.navigateBack();
				});
			}
		}
	};
</script>

<style lang="scss">
	@import '@/common/global.scss';
	
	.content {
		.uni-list:after,
		.uni-list:before {
			height: 0px;
		}
		
		> .uni-form-item {
			display: flex;
			width: 100%;
			border-bottom: solid 1px $border-color;
			
			> .title {
				flex-shrink: 0;
				padding-left: 14px;
				width: 70px;
			}
			> .p-r {
				flex: 1;
				width: calc(100% - 70px);
				
				> .with-fun {
					position: relative;
					
					> .uni-input {
						padding-right: 40px;
						border-bottom: solid 1px $border-color;
					}
					> .arrowright {
						left: unset;
						display: block;
						width: 40px;
						line-height: 50px;
						text-align: center;
					}
				}
			}
			
			.uni-input,
			> .title {
				margin: 0;
				height: 43px;
				line-height: 43px;
				font-size: inherit;
			}
			.uni-input {
				padding: 0 14px;
			}
			
		}
		
		> button {
			display: block;
			margin-top: 20px;
			width: 80%;
			height: 40px;
			line-height: 40px;
			border-radius: 40px;
			color: #fff;
			font-size: 16px;
			background-color: $theme;
		}
	
	}
	
</style>
