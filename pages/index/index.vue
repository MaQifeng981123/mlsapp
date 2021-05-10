<template>
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="../../static/veer-163534045.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="form">
			<view class="inputWrapper">
				<input class="input" ref="loginId" v-model="loginId" type="text"
					placeholder="please enter user name!" />
			</view>
			<view class="inputWrapper">
				<input class="input" v-model="password" type="password" placeholder="please enter password!" />
			</view>
			<view class="loginBtn">
				<text class="btnValue" @click="login()">Login</text>
			</view>
			<view class="registerBtn">
				<span @click="toRegister">register</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginId: '',
				password: ''
			}
		},
		onLoad() {

		},
		onReady() {
			uni.onWindowResize((res) => {
				let windowWidth = res.size.windowWidth;
				if (windowWidth >= 700) {
					console.log("宽屏")
				}
			})
		},
		methods: {

			navigateByStaffType(staffType) {
				let url = '';
				if ('-1' == staffType) {
					url = '/pages/index/patient';
				} else if ('0' === staffType) {
					//医生
					url = '/pages/tj/tj';
				} else {
					//患者
					url = '../exam/nowExam';
				}
				// console.log(url)
				let i = uni.switchTab({
					url: url
				});
				// let i=uni.redirectTo({
				// 	url: url
				// });
				// console.log(i);
			},
			loginSccess(res) {
				res = res.data;
				let msg = res.message;
				if (res.status === '0') {
					//登陆成功
					let userInfo = res.result;
					uni.showToast({
						title: "login success!",
						duration: 3000
					});
					uni.setStorageSync('userInfo', userInfo);
					this.navigateByStaffType(userInfo.staffType);
				} else {
					uni.show
					uni.showToast({
						title: 'login Fail',
						duration: 3000,
						icon: "none"
					});
				}
			},

			login() {

				let loginId = 'admin';
				let pwd = 'admin';
				let loginUrl = this.$config.api.login;
				uni.request({
					url: loginUrl, //仅为示例，并非真实接口地址。
					data: {
						loginId: this.loginId,
						password: this.password
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						this.loginSccess(res);
					}
				});
			},
			toRegister() {
				uni.navigateTo({
					url: "./register"
				})
			}

		}
	}
</script>

<style>
	.content {
		background: #377EB4;
		width: 100vw;
		height: 100vh;
	}

	.avatorWrapper {
		height: 30vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.avator {
		width: 200upx;
		height: 200upx;
		overflow: hidden;
	}

	.avator .img {
		width: 100%
	}

	.form {
		padding: 0 100upx;
		margin-top: 80px;
	}

	.inputWrapper {
		width: 100%;
		height: 80upx;
		background: white;
		border-radius: 20px;
		box-sizing: border-box;
		padding: 0 20px;
		margin-top: 25px;
	}

	.inputWrapper .input {
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 15px;
	}

	.loginBtn {
		width: 100%;
		height: 80upx;
		background: #77B307;
		border-radius: 50upx;
		margin-top: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.registerBtn {
		margin-top: 5px;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.loginBtn .btnValue {
		color: white;
	}

	.forgotBtn {
		text-align: center;
		color: #EAF6F9;
		font-size: 15px;
		margin-top: 20px;
	}
</style>
