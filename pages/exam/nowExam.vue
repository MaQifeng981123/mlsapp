<template>
	<view class="warp">
		<uni-section title="Today's data" type="line"></uni-section>
		<view class="example-body">
			<uni-grid :column="3" :highlight="true">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<view v-if="item.abnormal" class="grid-item-box"
						style="background-color: #fff;border: #dd0202 1px solid;">
						<!-- <image :src="item.url" class="image" mode="aspectFill" /> -->
						<text class="text" style="font-size: large;">{{ item.data }}</text>
						<text class="text">{{ item.text }}</text>
					</view>
					<view v-if="!item.abnormal" class="grid-item-box"
						style="background-color: #fff;">
						<!-- <image :src="item.url" class="image" mode="aspectFill" /> -->
						<text class="text" style="font-size: large;">{{ item.data }}</text>
						<text class="text">{{ item.text }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view>
			<u-button type="primary" size="default" class="custom-style" @click="addData()">Save</u-button>
		</view>
		<u-tabbar :list="tabbar"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dynamicList: [],
				list: [],
				tabbar: [],
				dataInfo: {}
			}
		},
		methods: {
			addData() {
				let userInfo = uni.getStorageSync("userInfo");

				console.log(userInfo);
				uni.request({
					url: this.$config.api.updateExamData, //仅为示例，并非真实接口地址。
					data: {
						"userId": userInfo.userId,
						"uploadFlag": '1',
						"examId": this.dataInfo.examId,
						"userId": userInfo.userId
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						let result = res.data;
						if (result.status == '0') {
							uni.showToast({
								title: "Save success!",
								duration: 3000
							});
						}
					}
				});
			}
		},
		onLoad() {
			this.tabbar = this.$config.getMytabbar();
			const userInfo = uni.getStorageSync("userInfo");
			console.log(userInfo)
			uni.request({
				url: this.$config.api.createCurrExamData, //仅为示例，并非真实接口地址。
				data: {
					"userId": userInfo.userId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (res) => {
					let result = res.data;
					if ('0' === result.status) {
						let v = result.result;
						this.dataInfo = v;
						let examData = JSON.parse(v.examData);
						this.list = this.$config.change(examData);
					} else {
						uni.showToast({
							title: 'Fail!'
						})
					}
				}
			});

		}
	}
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

	.image {
		width: 50rpx;
		height: 50rpx;
	}

	.text {
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.grid-dynamic-box {
		margin-bottom: 15px;
	}

	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}

	.swiper {
		height: 420px;
	}

	/* #ifdef H5 */
	@media screen and (min-width: 768px) and (max-width: 1425px) {
		.swiper {
			height: 630px;
		}
	}

	@media screen and (min-width: 1425px) {
		.swiper {
			height: 830px;
		}
	}

	/* #endif */

	.custom-style {
		width: 80%;
		margin-top: 20px;
	}
</style>
