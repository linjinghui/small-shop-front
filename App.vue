<script>
export default {
	onLaunch: function() {
		
		
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
	button:active,
	icon:active {
		opacity: 0.8;
	}
	
	image {
		will-change: transform;
	}
	
	.center-hv {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
	}
	
	.text-over {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.uni-list:before,
	.uni-list:after,
	.uni-list-item__container:after {
		background-color: $border-color!important;
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
	
	
</style>
