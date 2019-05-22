<template>
	<view class="content">
		<view class="wrap-good">
			<view class="wrap-swiper">
				<!-- mode: long indexes nav -->
				<uni-swiper-dot :info="info" :current="current" mode="long" :dots-styles="dotsStyles">
					<swiper class="swiper-box" @change="change">
						<swiper-item v-for="(item ,index) in info" :key="index">
							<view :class="item.colorClass" class="swiper-item">
								<image :src="item.url" mode="aspectFill" />
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<p class="name">净贝美国钳(活)</p>
			<p class="desc">请保险存储 使用前清洗即可</p>
			<p class="wrap-price">
				<span class="price">3.98</span>
				<span class="price del">5.5</span>
			</p>
			<view class="wrap-labels">
				<view class="label"><uni-iconfont class="icon" color="#ccc" size="24" type="gwd" />约350g/份</view>
				<view class="label"><uni-iconfont class="icon" color="#ccc" size="24" type="shdd3" />广东湛江</view>
			</view>
		</view>
		<view class="wrap-recommend">
			<view class="title"><span>推荐商品</span></view>
		</view>
		<view class="wrap-detail">
			<view class="title"><span>商品详情</span></view>
			<image :lazy-load="true" mode="widthFix" src="http://wx1.sinaimg.cn/orj360/c213c57bgy1g2b5vcamhgj20rs8j7b2d.jpg"></image>
		</view>
		<view class="wrap-placehold"></view>
		<footer>
			<view class="wrap-btn-car"><uni-iconfont class="icon" size="24" type="car" />购物车</view>
			<button>加入购物车</button>
		</footer>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uniIconfont from '@/components/uni-iconfont/uni-icon.vue'
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	export default {
		components: {
			uniIconfont,
			uniSwiperDot
		},
		computed: {
			...mapState(['user'])
		},
		data () {
			return {
				current: 0,
				info: [
					{
						colorClass: 'uni-bg-red',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
						content: '内容 A'
					},
					{
						colorClass: 'uni-bg-green',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
						content: '内容 B'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
						content: '内容 C'
					}
				],
				dotsStyles: {
					backgroundColor: '#fff',
					border: '0',
					color: '#fff',
					selectedBackgroundColor: '#fff',
					selectedBorder: '0'
				}
			};
		},
		onLoad () {},
		methods: {
			change (e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/global.scss';
	
	.content {
		background-color: #f8f8f8;
		
		> view {
			margin-bottom: 10px;
			height: unset;
			background-color: #fff;
			
			> .title {
				height: 40px;
				line-height: 40px;
				text-align: center;
				color: $theme;
				border-bottom: solid 1px $border-color;
				> span {
					display: inline-block;
					height: 38px;
					padding: 0 10px;
					border-bottom: solid 2px;
				}
			}
		}
		> view:nth-last-child(1),
		> view:nth-last-child(2),
		> view:nth-last-child(3) {
			margin: 0;
		}
		
		> .wrap-good {
			padding-bottom: 14px;
			text-align: center;
			
			> .wrap-swiper {
				margin-bottom: 5px;
				height: 300px;
				background-color: antiquewhite;
				
				.swiper-box {
					height: 100%;
				}
				.swiper-item {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					background: #eee;
					color: #fff;
				}	
				.uni-swiper__dots-box {
					height: unset;
					text-align: right;
				}
				.swiper-item image {
					width: 100%;
					height: 100%;
				}
			}
			> .name {
				font-size: 20px;
			}
			> .desc {
				margin-top: 5px;
				margin-bottom: 5px;
				font-size: 14px;
			}
			> .wrap-price {
				> .price:not(.del) {
					font-size: 24px;
				}
			}
			> .wrap-labels {
				display: flex;
				margin-top: 14px;
				height: 60px;
				color: #ccc;
				
				> .label {
					flex: 1;
					font-size: 12px;
					> .icon {
						display: block;
						margin-top: 6px;
					}
				}
			}
		}
		
		> .wrap-detail {
			> image {
				width: 100%;
			}
		}
		
		// 占位区
		> .wrap-placehold {
			height: 40px;
			background-color: red;
		}
		
		> footer {
			position: fixed;
			margin: 0;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50px;
			box-shadow: 0 0 5px $border-color;
			background-color: #fff;
			
			> .wrap-btn-car {
				float: left;
				margin: 0;
				width: 40%;
				height: 98%;
				text-align: center;
				font-size: 12px;
				> .icon {
					display: block;
					margin-top: 5px;
				}
			}
			> button {
				float: right;
				width: 60%;
				height: 100%;
				line-height: 50px;
				color: #fff;
				background-color: $theme;
			}
		}
	}
</style>
