<template>
	<view>
		<uni-list>
			<uni-list-item v-for="(item,index) in userList" :title="item.name" :note="item.icdNames" showArrow
				:thumb="coverList[index%4]" thumb-size="lg" rightText="详情" clickable @click="toUserInfo(item)" />
		</uni-list>
		<u-tabbar :list="tabbar"></u-tabbar>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				tabbar: [],
				userList: [],
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				},
				coverList: ['/static/c1.png', '/static/headImg/headImg1.png', '/static/headImg/headImg3.jpeg',
					'/static/headImg/headImg2.png'
				],
			};
		},
		onLoad() {
			this.tabbar = this.$config.getMytabbar();
			this.getUserList();
		},
		methods: {
			getUserList() {
				uni.request({
					url: this.$config.api.getUserList,
					data: {
						staffType: "0"
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						let result = res.data;
						if (result.status == '0') {
							this.userList = result.result;
						}
					}
				});
			},
			toUserInfo(userInfo) {
				console.log(userInfo);
				let i = uni.navigateTo({
					url: "../my/myInfo?userInfo=" + JSON.stringify(userInfo)
				});
			}
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
