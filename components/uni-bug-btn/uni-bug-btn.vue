<!-- 购买按钮 -->
<template>
	<view class="wrap-bug-btn">
		<uni-icon class="minus" v-if="num>0" type="minus" :color="num>0?'#029c45':'#bbb'" size="24" @click="clkMinus" />
		<span v-if="num>0">{{num}}</span>
		<uni-icon class="plus" type="plus-filled" :color="num<max?'#029c45':'#bbb'" size="24" @click="clkPlus" />
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	export default {
		components: {
			uniIcon
		},
		name: 'Bugbtn',
		data () {
			return {
				num: this.value
			};
		},
		props: {
			value: {
				default: 0
			},
			max: {
				default: 50
			}
		},
		watch: {
			value (val) {
				this.num = val;
			}
		},
		methods: {
			clkMinus () {
				this.num > 0 && (this.num -= 1);
				this.$emit('input', this.num);
				this.$emit('click', {
					'num': this.num
				});
			},
			clkPlus () {
				if (this.num < this.max) {
					this.num += 1;
					this.$emit('input', this.num);
					this.$emit('click', {
						'num': this.num
					});
				} else {
					this.$emit('click', {
						'error': '已达上限'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.wrap-bug-btn {
		position: relative;
		display: inline-block;
		width: 74px;
		height: 26px;
		text-align: right;
		background-color: #fff;
		
		> .minus,
		> .plus {
			vertical-align: middle;
		}
		> span {
			display: inline-block;
			width: 26px;
			height: 22px;
			line-height: 18px;
			vertical-align: middle;
			text-align: center;
		}
	}
</style> 