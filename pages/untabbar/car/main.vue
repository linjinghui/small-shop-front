<template>
	<view class="content">
		
		<!-- 未选购提示 -->
		<!-- <view class="no-good" v-if="car.data.length===0">
			<uni-iconfont class="icon" size="50" type="sp" color="#ddd" />
			<p>您还未添加商品~</p>
			<button @click="clkQgg">去逛逛</button>
		</view> -->
		<view class="main">
			<scroll-view class="scroll-Y" scroll-y="true">
				<view class="wrap-address">
					配送至：福建省奥林匹克体育中心体育馆<uni-icon class="icon" type="arrowright" size="16" color="#999" /> 
				</view>
				<good-list v-model="car.data" :nselect="true"></good-list>
			</scroll-view>
			<view class="footer">
				<view class="wrap-icon">
					<view class="icon-bg" v-if="selectAll"></view>
					<uni-iconfont class="icon" :type="selectAll?'gx':'wgx'" size="30" color="#ff9000" @click="selectAll=!selectAll" />
				</view>
				已选 (10)
				<button>去预定</button>
				<p class="price total">102</p>
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
			...mapState(['car'])
		},
		onLoad() {},
		methods: {
			clkQgg () {
				turnPage('home');
			}
		}
	};
</script>

<style lang="scss">
	@import '@/common/global.scss';
	.content {
		height: 100%;
		background-color: #f8f8f8;
		
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
					padding: 12px 0;
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
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						margin: auto;
						width: 30px;
						height: 30px;
						line-height: 30px;
						z-index: 2;
					}
					> .icon-bg {
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						margin: auto;
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
