<template>
	<view class="content">
		<!-- 没有配送地址信息的提示 -->
		<view class="no-consignee" v-if="consignee.length===0">
			<uni-iconfont class="icon" size="50" type="sp" color="#ddd" />
			<p>暂无地址~</p>
			<button @click="clkAdd">去添加</button>
		</view>
		<view class="main" v-else>
			<text class="item">我的收获地址</text>
			<view class="item" v-for="(item,index) in consignee" :key="item.id">
				<uni-icon class="icon center-hv compose" size="30" type="compose" color="#029c45" />
				<p>{{item.address}} {{item.doorAddress}}</p>
				<p>{{item.name}} {{item.mobile}}</p>
			</view>
			<view class="item add">
				<uni-icon class="icon" size="50" type="plusempty" color="#ddd" />
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniIconfont from '@/components/uni-iconfont/uni-icon.vue'
	import {turnPage} from '@/common/global.js';
	export default {
		components: {
			uniIcon,
			uniIconfont
		},
		data() {
			return {};
		},
		computed: {
			...mapState(['consignee'])
		},
		onLoad() {},
		methods: {
			clkAdd () {
				// 
			}
		}
	};
</script>

<style lang="scss">
	@import '@/common/global.scss';
	.content {
		height: 100%;
		background-color: #f8f8f8;
		
		// 没有配送地址信息的提示
		.no-consignee {
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
			line-height: 22px;
			background-color: #fff;
			
			> view {
				position: relative;
				padding: 5px 10px;
				border-bottom: solid 1px $border-color;
				
				> p:first-of-type {
					width: calc(100% - 40px);
				}
				
				> p:last-of-type {
					width: calc(100% - 40px);
					color: #999;
				}
				
				> .compose {
					left: inherit;
					right: 10px;
					width: 30px;
					height: 30px;
				}
			}
			> view:active {
				background-color: #fafafa;
			}
			text {
				display: block;
				padding: 5px 10px 0 10px;
				color: #aaa;
			}
			> .add {
				text-align: center;
			}
		}
	}
</style>
