<!-- dateTime picker组件 -->
<template>
	<!-- <view>xxxx</view> -->
	<picker mode="multiSelector" :range="multiArray" :value="multiIndex" @columnchange="bindMultiPickerColumnChange" @change="bindTimeChange">{{value||'尽快送达'}}</picker>
</template>

<script>
	export default {
		name: 'DateTime',
		components: {},
		data () {
			return {
				cyear: new Date().getFullYear(),
				cmonth: new Date().getMonth() + 1,
				cday: new Date().getDate(),
				multiArray: [],
				multiIndex: [0, 0, 1, 0]
			}
		},
		props: {
			value: ''
		},
		watch: {},
		mounted () {
			this.initDate();
		},
		methods: {
			getYears () {
				var arr = [];
				for (var i = 0;i < 2;i++) {
					arr.push(this.cyear + i + '年');
				}
				return arr;
			},
			getMonths (year) {
				var month = this.cmonth;
				var arr = [];
				if (year && year != new Date().getFullYear()) {
					month = 1;
				}
				for (var i = month - 1;i < 12;i++) {
					arr.push(i + 1 + '月');
				}
				return arr;
			},
			getDays (year, month) {
				var arr = [];
				var day = this.cday;
				var allDays = this.getMonthAllDays(year, month);
				// 如果不是当月，从1日开始
				if (year != this.cyear || month != this.cmonth) {
					day = 1;
				}
				for (var i = day - 1;i < allDays;i++) {
					arr.push(i + 1 + '日');
				}
				return arr;
			},
			getHours (year, month, day) {
				var arr = [];
				if (year == this.cyear && month == this.cmonth && day == this.cday) {
					arr = ['尽快送达'];
				} else {
					for (var i = 9;i < 24;i++) {
						arr.push(i + 1 + ' 点前');
					}
				}
				return arr;				
			},
			// 获取某月的总天数
			getMonthAllDays (year, month) {
				var d = new Date();
				d.setFullYear(year || new Date().getFullYear());
				d.setMonth(month || new Date().getMonth() + 1);
				d.setDate(0);
				return d.getDate();
			},
			// 初始化日期数据
			initDate () {
				var years = this.getYears();
				var months = this.getMonths();
				var days = this.getDays(this.cyear, this.cmonth);
				var hours = this.getHours();
				this.multiArray = [years, months, days, hours];
			},
			getDateStrByMultiIndex () {
				var arr = this.multiIndex;
				var _arr = [];
				for (var i = 0;i < arr.length;i++) {
					_arr.push(this.multiArray[i][arr[i]]);
				}
				return _arr;
			},
			bindMultiPickerColumnChange (e) {
				this.multiIndex[e.detail.column] = e.detail.value;
				var dateArr = this.getDateStrByMultiIndex();
				var year = dateArr[0].replace('年', '');
				var month = dateArr[1].replace('月', '');
				var day = dateArr[2].replace('日', '');
				
				switch (e.detail.column) {
					// 拖动第1列 - 年
					case 0:
						this.multiArray[1] = this.getMonths(year);
						this.multiIndex[1] = 0;
						break
					// 拖动第2列 - 月， 更新 日
					case 1: 
						this.multiArray[2] = this.getDays(year, month);
						this.multiIndex[2] = 0;
						break
				}
				dateArr = this.getDateStrByMultiIndex();
				year = dateArr[0].replace('年', '');
				month = dateArr[1].replace('月', '');
				day = dateArr[2].replace('日', '');
				// 如果是当天， 更新 hour
				this.multiArray[3] = this.getHours(year, month, day);
				if (this.multiArray[3].length === 1) {
					this.multiIndex[3] = 0;
				}
				this.$forceUpdate();
			},
			bindTimeChange (e) {
				var arr = this.getDateStrByMultiIndex() || [];
				if (arr[arr.length - 1] === '尽快送达') {
					arr = ['尽快送达'];
				}
				this.$emit('input', arr.join(''));
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/global.scss';
</style>