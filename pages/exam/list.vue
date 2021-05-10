<template>
	<view>
		<uni-collapse :accordion="true">
			<uni-collapse-item v-for="item in accordion" :title="item.dataDate">
				<view class="example-body">
					<uni-grid :column="3" :highlight="true">
						<uni-grid-item v-for="(item, index) in item.dataList" :index="index" :key="index">
						
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
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accordion: []

			}
		},
		onLoad() {
			let userInfo = uni.getStorageSync("userInfo");

			uni.request({
				//url: "http://121.4.243.61:8086/mlsapp/exam/getExamDataList",
				url: this.$config.api.getExamDataList,
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
						for (var i = 0; i < v.length; i++) {
							let n = {};
							n.dataDate = v[i].createDate;
							n.dataList = this.$config.change(JSON.parse(v[i].examData));
							this.accordion.push(n);
						}
					} else {
						uni.showToast({
							title: '获取数据失败',
							icon: "none"
						});
					}
				},
				fail: (res) => {
					uni.showToast({
						title: '失败'
					});
				},
				complete: (res) => {
					uni.showToast({
						title: '完成'
					});
				}


			});
		},
		methods: {

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

	.example-body {
		flex-direction: column;
		flex: 1;
	}

	.content {
		padding: 15px;
		font-size: 14px;
		line-height: 20px;
		background-color: #f9f9f9;
		color: #666;
	}

	.button {
		font-size: 26rpx;
		line-height: 90rpx;
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
</style>
