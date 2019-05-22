<template>
	<view class="content" v-if="goodInfo.id">
		<view class="wrap-good">
			<view class="wrap-swiper">
				<uni-swiper-dot :info="covers" :current="current" mode="long" :dots-styles="dotsStyles">
					<swiper class="swiper-box" @change="change">
						<swiper-item v-for="(item ,index) in covers" :key="index">
							<view :class="item.colorClass" class="swiper-item">
								<image :src="item.url" mode="aspectFill" />
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<p class="name">{{goodInfo.name}}</p>
			<p class="desc">{{goodInfo.desc}}</p>
			<p class="wrap-price">
				<span class="price">{{utlRealPrice(goodInfo)}}</span>
				<span class="price del" v-if="goodInfo.rebate<10">{{goodInfo.price}}</span>
			</p>
			<view class="wrap-labels">
				<view class="label"><uni-iconfont class="icon" color="#ccc" size="24" type="gwd" />{{goodInfo.unit}}</view>
				<view class="label"><uni-iconfont class="icon" color="#ccc" size="24" type="shdd3" />{{goodInfo.pplace}}</view>
			</view>
		</view>
		<view class="wrap-recommend" v-if="recommends.length>0">
			<view class="title"><span>推荐商品</span></view>
			<view class="uni-product-list">
				<view class="uni-product" v-for="(good,index) in recommends" :key="good.id">
					<view class="image-view">
						<image class="uni-product-image" :src="good.pic"></image>
					</view>
					<view class="uni-product-title">{{good.name}}</view>
					<view class="uni-product-price">
						<text class="price">{{utlRealPrice(good)}}</text>
						<text class="price del">{{good.price}}</text>
						<text class="uni-product-tip" v-if="good.label" :style="{color:good.label.color,backgroundColor:good.label.bcolor}">{{good.label.text}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="wrap-detail" v-if="goodInfo.dtlpics.length>0">
			<view class="title"><span>商品详情</span></view>
			<image :lazy-load="true" mode="widthFix" v-for="item in goodInfo.dtlpics" :key="item" :src="item"></image>
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
	import {countRealPrice} from '@/common/global.js'
	import {ajaxGetGoodInfo, ajaxGetRecommendGoods} from '@/data/ajax.js'
	
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
				goodInfo: {},
				covers: [
					// {colorClass: 'uni-bg-blue', url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',　content: '内容 C'}
				],
				dotsStyles: {
					backgroundColor: '#fff',
					border: '0',
					color: '#fff',
					selectedBackgroundColor: '#fff',
					selectedBorder: '0'
				},
				recommends: []
			};
		},
		onLoad (e) {
			// 获取商品详情
			let _this = this;
			ajaxGetGoodInfo(e, function (data) {
				_this.covers = [];
				data.result.covers.forEach( item => {
					_this.covers.push({url: item});
				});
				_this.goodInfo = data.result;
				ajaxGetRecommendGoods('', function (data) {
					_this.recommends = data.result;
				});
			});
		},
		methods: {
			change (e) {
				this.current = e.detail.current;
			},
			// 计算折扣后的真实价格
			utlRealPrice (good) {
				return countRealPrice(good);
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
				
				.swiper-box {
					height: 300px;
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
				padding: 0 10px;
				font-size: 20px;
			}
			> .desc {
				margin-top: 5px;
				margin-bottom: 5px;
				padding: 0 10px;
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
		
		> .wrap-recommend {
			/* product */
			.uni-product-list {
			    display: flex;
			    width: 100%;
			    flex-wrap: wrap;
			    flex-direction: row;
			}
			
			.uni-product {
			    padding: 20upx;
			    display: flex;
			    flex-direction: column;
			}
			
			.image-view {
			    height: 330upx;
			    width: 330upx;
				margin:12upx 0;
			}
			
			.uni-product-image {
			    height: 330upx;
			    width: 330upx;
			}
			
			.uni-product-title {
			    width: 300upx;
			    word-break: break-all;
			    display: -webkit-box;
			    overflow: hidden;
				line-height:1.5;
			    text-overflow: ellipsis;
			    -webkit-box-orient: vertical;
			    -webkit-line-clamp: 2;
			}
			
			.uni-product-price {
				margin-top:10upx;
			    font-size: 28upx;
				line-height:1.5;
			    position: relative;
			}
			
			.price {
				font-size: 14px;
			}
			
			.price.del {
			    font-size: 12px;
			}
			
			.uni-product-tip {
			    position: absolute;
			    right: 10upx;
			    padding: 0 10upx;
			    border-radius: 5upx;
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
