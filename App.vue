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

<style>
	/*每个页面公共css */ 
	page,
	view {
		height: 100%;
		font-size: 14px;
	}
	
	p {
		height: unset;
	}
	
	ul {
		list-style: none;
	}
	
	.price:before {
		content: '￥';
		font-size: 14px;
		color: inheirt;
	}
	
	.icon:active {
		opacity: 0.8;
	}
</style>
