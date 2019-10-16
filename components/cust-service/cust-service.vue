<!-- 添加客服组件 -->
<template>
	<view class="wrap-cust-service" v-if="value" @click="clkHide">
		<view class="main center-hv">
			<image :src="qrKf" @click.stop="clkQrcode"></image>
			<text class="mobile" @click.stop="clkBh">客服电话：{{phone}}</text>
			<text>1、点击图片预览 - 长按保存</text>
			<text>2、进入微信，右上角‘添加朋友’</text>
			<text>3、扫一扫</text>
			<text>4、右上角 ‘...’， 从相册选取二维码</text>
			<text>5、选择保存的图片，添加客服号</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'custService',
		components: {},
		data () {
			return {
				qrKf: require('@/static/img/kf.jpg'),
				phone: '17396562909'
			}
		},
		props: {
			value: {
				type: Boolean,
				default: false
			}
		},
		watch: {},
		onLoad() {},
		methods: {
			clkHide () {
				this.$emit('input', false);
			},
			clkQrcode () {
				uni.previewImage({
					urls: [this.qrKf]
				});
			},
			clkBh () {
				uni.makePhoneCall({
					phoneNumber: this.phone
				});
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/global.scss';
	
	.wrap-cust-service {
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
			height: 394px;
			
			> image {
				margin-bottom: 5px;
				width: 100%;
			}
			> text {
				display: block;
			}
			> .mobile {
				margin-bottom: 5px;
				display: block;
				text-align: center;
				text-decoration: underline;
			}
		}
	}
</style>