<script>
export default {
	onLaunch: function() {
		const updateManager = uni.getUpdateManager();		
		updateManager.onCheckForUpdate(function (res) {
		  // 请求完新版本信息的回调
		  // console.log('onCheckForUpdate=', res);
		});
		
		updateManager.onUpdateReady(function (res) {
		  uni.showModal({
		    title: '更新提示',
		    content: '新版本已经准备好，是否重启应用？',
		    success(res) {
		      if (res.confirm) {
		        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		        updateManager.applyUpdate();
		      }
		    }
		  });
		
		});
		
		updateManager.onUpdateFailed(function (res) {
		  // 新的版本下载失败
		});
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
