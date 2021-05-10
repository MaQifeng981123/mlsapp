<template>
	<view>
		<uni-list>
			<uni-list-item v-if="historicalShow" title="Historical data" link="redirectTo" @click="historyList()" />

			<uni-list-item title="My Information" link="redirectTo" @click="myInfo()" />
			<uni-list-item title="Login out" clickable @click="loginOut()" />
		</uni-list>
		<u-tabbar :list="tabbar"></u-tabbar>
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
				uni.removeStorageSync("userInfo");
				uni.reLaunch({
					url: "../index/index"
				});
				// uni.navigateTo({
				// 	url: "../index/index"
				// });
			}
		},
		onReady() {
			let userInfo = uni.getStorageSync("userInfo");
			if (userInfo.staffType == '1') {
				this.historicalShow = true;
			}
			this.tabbar = this.$config.getMytabbar();
		},
		onLoad() {

		}
	};
</script>

<style>
	@charset "UTF-8";

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url("~@/static/uni.ttf") format("truetype");
	}

	/* #endif */
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}

	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 30px;
		height: 30px;
	}

	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
</style>
