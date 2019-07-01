<template>
	<view class="content">
		<view class="header" :style="'background-image:url('+bgpUrl+')'">
			<template v-if="user.nickName">
				<image :src="user.avatarUrl"></image>
				<p>{{user.nickName}}</p>
			</template>
			<button v-else open-type="getUserInfo" @getuserinfo="clkLogin">点击登录</button>
		</view>
		<view class="main">
			<uni-list class="wrap-list">
				<uni-list-item class="list-item" :show-arrow="false" :show-extra-icon-font="true" :extra-icon="eiconShdz" title="收货地址" @click="clkLine('consignee','my')" />
			</uni-list>
			<uni-list class="wrap-list">
				<!-- <uni-list-item class="list-item" :show-arrow="false" :show-extra-icon-font="true" :extra-icon="eiconDfk" title="待付款" @click="clkLine('order',1)" />
				<uni-list-item class="list-item" :show-arrow="false" :show-extra-icon-font="true" :extra-icon="eiconDsh" title="待收货" @click="clkLine('order',2)" /> -->
				<uni-list-item class="list-item" :show-arrow="false" :show-extra-icon-font="true" :extra-icon="eiconQbdd" title="全部订单" @click="clkLine('order',3)" />
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import {turnPage} from '@/common/global.js';
	export default {
		components: {
			uniList,
			uniListItem
		},
		computed: {
			// ...mapState(['user'])
			user () {
				return this.userInfo || this.$store.getters.doneUser;
			}
		},
		data () {
			return {
				bgpUrl: require('static/img/mybgp.jpg'),
				eiconShdz: {
					color: '#58a6f0',
					size: '28',
					type: 'shdz'
				},
				eiconDfk: {
					color: '#fcb20a',
					size: '28',
					type: 'dfk'
				},
				eiconDsh: {
					color: '#fe7576',
					size: '28',
					type: 'dsh'
				},
				eiconQbdd: {
					color: '#17b356',
					size: '28',
					type: 'qbdd'
				},
				userInfo: ''
			};
		},
		onLoad () {},
		methods: {
			clkLine (type, obj) {
				turnPage(type, obj);
			},
			clkLogin (e) {
				this.userInfo = e.detail.userInfo;
				uni.showToast({title: '登录成功~'});
				setTimeout(function() {turnPage('home', '', true);}, 100);
			}
		}
	}
</script>

<style lang="scss">
	.content {

		> .header {
			padding: 0 20px;
			height: 150px;
			text-align: center;
			background-size: cover;
			background-position: center;
			
			> image {
				display: inline-block;
				margin-top: 20px;
				margin-bottom: 10px;
				width: 58px;
				height: 58px;
				border: solid 1px #fff;
				border-radius: 50%;
				vertical-align: middle;
			}
			> p {
				vertical-align: middle;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 18px;
				color: #fff;
			}
			> button {
				display: inline-block;
				margin-top: 50px;
				width: 120px;
				height: 34px;
				line-height: 34px;
				font-size: 14px;
			}
		}
		> .main {
			padding-top: 1px;
			height: calc(100% - 150px - 1px);
			background-color: #f4f5f6;
			
			.uni-list {
				margin-top: 10px;
				background-color: #fff;
				height: unset;
				view {
					height: unset;
				}
				.uni-list-item__icon {
					padding-top: 3px;
				}
			}
			
		}
	}
</style>
