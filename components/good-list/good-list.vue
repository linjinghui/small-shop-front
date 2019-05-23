<!-- 商品列表组件 -->
<template>
	<view class="wrap-good-list" :class="{'select':nselect,'small':small}">
		<view class="wrap-good-item" v-for="(info,index) in value" :key="info.id" @click="clkLine(info)">
			<span class="label" v-if="!nselect&&!small" v-for="lbinfo in info.label" :key="lbinfo.id" :style="{'color':lbinfo.color,'backgroundColor':lbinfo.bcolor}">{{lbinfo.text}}</span>
			<view class="wrap-icon" v-if="nselect&&!small">
				<uni-iconfont class="icon center-hv" :type="info.select?'gx':'wgx'" size="26" color="#ff9000" @click="clkSelect(info)" />
			</view>
			<view class="wrap-img">
				<image class="center-hv" lazy-load="true" :src="info.pic"></image>
			</view>
			<view class="wrap-main">
				<text class="name text-over">{{info.name}}</text>
				<text class="desc text-over" v-if="!small">{{info.desc}}</text>
				<text class="preferential" v-if="info.rebate<9">特惠</text>
				<text class="unit">{{info.unit}}</text>				
				<view class="wrap-price">
					<text class="price">{{info.rprice}}</text>
					<text class="price del" v-if="info.rebate<10">{{info.price}}</text>
				</view>	
			</view>
			<view class="wrap-btn" @click.stop>
				<bug-btn class="bugBtn" v-model="info.count" @click="clkChoose($event,info)"></bug-btn>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIconfont from '@/components/uni-iconfont/uni-icon.vue'
	import bugBtn from '@/components/uni-bug-btn/uni-bug-btn.vue';
	import {turnPage} from '@/common/global.js';
	export default {
		name: 'GoodList',
		components: {
			uniIconfont,
			bugBtn
		},
		data () {
			return {
				select: false
			}
		},
		props: {
			// 是否需要勾选框
			nselect: {
				type: Boolean,
				default: false
			},
			// 最小化显示
			small: {
				type: Boolean,
				default: false
			},
			value: {
				type: Array,
				default: function () {
					return [];
				}
			}
		},
		computed: {},
		watch: {},
		onLoad() {},
		methods: {
			// 选中商品
			clkChoose (e, data) {
				if (e.error) {
					uni.showToast({title: '无法购买更多', icon: 'none', position: 'bottom'});
				} else {
					// 勾选中商品
					data.select = true;
					this.$store.commit('addGoodToCar', data);
				}
			},
			clkLine (data) {
				this.$emit('click', data);
			},
			clkSelect (data) {
				this.$set(data, 'select', !data.select);
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/global.scss';
	
	.wrap-good-item {
		position: relative;
		padding: 14px 10px;
		padding-left: 0;
		border-bottom: solid 1px $border-color;
		background-color: #fff;
		
		> .label {
			position: absolute;
			top: 20px;
			left: 10px;
			padding: 2px 8px;
			border-radius: 2px;
			font-size: 12px;
			z-index: 2;
		}
		> .label:nth-child(2) {
			top: 42px;
		}
		> .label:nth-child(3) {
			top: 64px;
		}
		
		> .wrap-icon {
			position: relative;
			display: inline-block;
			width: 40px;
			height: 100px;
			vertical-align: middle;
			
			> .icon {
				display: block;
				left: inherit;
				width: 26px;
				height: 26px;
				line-height: 26px;
			}
		}
		> .wrap-img {
			position: relative;
			display: inline-block;
			width: 100px;
			height: 100px;
			vertical-align: middle;
			
			> image {
				width: 80px;
				height: 80px;
			}
		}
		> .wrap-main {
			display: inline-block;
			width: calc(100% - 100px);
			line-height: 30px;
			vertical-align: middle;
			
			> .name {
				display: block;
				font-size: 18px;
			}
			> .desc {
				display: block;
				color: #aaa;
			}
			> .unit {
				display: inline-block;
				padding: 2px 8px;
				line-height: 20px;
				border-radius: 2px;
				color: #666;
				background-color: #f6f6f6;
			}
			> .preferential {
				display: inline-block;
				margin-right: 5px;
				padding: 2px 8px;
				line-height: 20px;
				border-radius: 2px;
				color: #e55e5e;
				background-color: #fce7e7;
			}
		}
		> .wrap-btn {
			position: absolute;
			right: 10px;
			bottom: 15px;
			width: 74px;
			height: 26px;
			background-color: #aaa;
		}
	}
	.wrap-good-list.select > .wrap-good-item > .wrap-main {
		width: calc(100% - 40px - 100px);
	}
	
	// 最小化显示
	.wrap-good-list.small {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;		
		
		> .wrap-good-item {
			padding-left: 10px;
			width: calc(50% - 10px - 10px - 1px);
			
			> .wrap-img {
				display: block;
				margin: 0 auto;
			}
			
			> .wrap-main {
				display: block;
				width: 100%;
			}
			> .wrap-btn {
				width: 26px;
				text-align: right;
				overflow: hidden;
				
				> .bugBtn {
					float: right;
				}
			}
		}
		> .wrap-good-item:nth-child(odd) {
			border-left: solid 1px $border-color;
		}
	}
</style>