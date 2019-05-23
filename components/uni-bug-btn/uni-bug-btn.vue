<!-- 购买按钮 -->
<template>
	<view class="wrap-bug-btn">
		<uni-icon class="minus" v-if="value>0" type="minus" :color="value>0?'#029c45':'#bbb'" size="24" @click="clkMinus" />
		<span v-if="value>0">{{value}}</span>
		<uni-icon class="plus" type="plus-filled" :color="value<max?'#029c45':'#bbb'" size="24" @click="clkPlus" />
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
			return {};
		},
		props: {
			value: {
				default: 0
			},
			max: {
				default: 10
			}
		},
		watch: {
			value (val) {
				this.initValue();
			}
		},
		onLoad() {
			this.initValue();
		},
		methods: {
			initValue () {
				if (this.value !== 0 && !this.value) {
					this.value = 0;
				}
				console.log(value);
			},
			clkMinus () {
				this.value > 0 && (this.value -= 1);
				this.$emit('click', {
					'num': this.value
				});
			},
			clkPlus () {
				if (this.value < this.max) {
					this.value += 1;
					this.$emit('click', {
						'num': this.value
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