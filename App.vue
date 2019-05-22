<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		// setTimeout(() => {
		// 	// 设置角标
		// 	uni.setTabBarBadge({
		// 		index: 1,
		// 		text: '31'
		// 	});
		// 	// 设置红点
		// 	uni.showTabBarRedDot({
		// 		index: 3
		// 	});
		// }, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
	/*每个页面公共css */ 
	@import '@/common/global.scss';
	
	page {
		height: 100%;
		font-size: 14px;
	}
	
	p {
		height: unset;
	}
	
	ul {
		list-style: none;
	}
	
	button {
		border-radius: 0;
	}
	button:after {
		border: 0;
		border-radius: 0;
	}
	button:active {
		opacity: 0.8;
	}
	
	.name {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 18px;
	}
	
	.desc {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #aaa;
	}
	
	.price {
		display: inline-block;
		margin-right: 5px;
		color: $theme-2;
		font-size: 18px;
	}
	.price:before {
		content: '￥';
		font-size: 14px;
		color: inheirt;
	}
	.price.del {
		font-size: unset;
		color: #aaa;
		text-decoration: line-through;
	}
	
	.icon:active {
		opacity: 0.8;
	}
	
	.uni-list:before,
	.uni-list:after,
	.uni-list-item__container:after {
		background-color: $border-color!important;
	}
</style>
