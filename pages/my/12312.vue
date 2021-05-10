<template>
<view>
		<uni-list>
			<uni-list-item v-if="historicalShow" title="Historical data"  />

			<uni-list-item title="My Information" link="redirectTo"  />
			<uni-list-item title="Login out" clickable />
		</uni-list>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				},
				tabbar: [],
				historicalShow: false
			};
		},
		methods: {
			historyList() {
				uni.navigateTo({
					url: "../exam/list"
				})
			},
			myInfo() {
				uni.navigateTo({
					url: "./myInfo"
				})
			},
			loginOut() {
			  uni.clearStorageSync();
				uni.navigateTo({
					url: "../index/index"
				});

			}

		},
		onReady() {
			// let userInfo = uni.getStorageSync("userInfo");
			// if (userInfo.staffType == '1') {
			// 	this.historicalShow = true;
			// }
			
			alert("获取信息");
		}
	};
</script>

<style>
</style>
