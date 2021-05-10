<template>
	<view>
		<uni-forms :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext">
			<uni-group top="0">
				<uni-forms-item name="name" required label="name">
					<uni-easyinput type="text" :inputBorder="true" v-model="formData.name" placeholder="请输入用户名"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="loginId" required label="loginId">
					<uni-easyinput type="text" :inputBorder="true" v-model="formData.loginId" placeholder="请输入用户名"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="password" required label="password">
					<uni-easyinput type="password" :inputBorder="true" v-model="formData.password" placeholder="请输入用户名"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item required name="staffType" label="Type">
					<uni-data-checkbox v-model="formData.staffType" :localdata="staffType" @change="staffTypeChange"></uni-data-checkbox>
				</uni-forms-item>

				<uni-forms-item name="Int" label="Int">
					<uni-easyinput type="textarea" v-model="formData.introduce" :maxlength="50" placeholder="请输入备注"></uni-easyinput>
				</uni-forms-item>
			</uni-group>
		</uni-forms>
		<uni-section title="Disease label" type="line" style="background-color:#FFFFFF;">
			<button class="button" type="primary" size="mini" @click="addDis()">add</button>
		</uni-section>
		<view class="example-body">
			<view class="tag-view" v-for="v in formData.icdNames">
				<uni-tag :inverted="true" :circle="true" :text="v" type="error" />
			</view>
		</view>
		<view class="example">
			<button class="button" type="primary" @click="submitForm()">Register</button>
		</view>

		<uni-popup id="popup" ref="popup" type="bottom" :animation="false">
			<view class="uni-list">
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in icdList" :key="item.icdCode">
						<view>
							<checkbox :value="item.icdName" :checked="formData.icdNames.includes(item.icdName)" />
						</view>
						<view>{{item.icdName}} ({{item.introduce}})</view>
					</label>
				</checkbox-group>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					icdNames: []
				},
				icdList: {},
				staffType: [{
					text: 'Patient',
					value: '1',
					checked: true
				}, {
					text: 'Doctor',
					value: '0'
				}]

			}
		},
		onLoad() {
			uni.request({
				url: this.$config.api.getIcdList,
				data: {},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (res) => {
					let result = res.data;
					if (result.status == '0') {
						this.icdList = result.result;
					}
				}
			});
		},
		onReady() {
			// this.$refs.form.setRules(this.rules)
		},
		methods: {
			/**
			 * 手动提交
			 * @param {Object} form
			 */
			submitForm() {
				let userInfo ={};
				userInfo.name = this.formData.name;
				userInfo.loginId = this.formData.loginId;
				userInfo.password = this.formData.password;
				userInfo.staffType = this.formData.staffType;
				userInfo.icdNames = this.formData.icdNames;
				let errorMsg = null;
				if (userInfo.name == null) {
					errorMsg = "Please enter  name";

				} else if (userInfo.loginId == null) {
					errorMsg = "Please enter  loginId";

				} else if (userInfo.password == null) {
					errorMsg = "Please enter your password";

				} else if (userInfo.staffType == null) {
					errorMsg = "Please enter your Type";
				}
				if (errorMsg != null) {
					uni.showToast({
						title: errorMsg,
						icon: "none"
					});
					return;
				}
				let icdNames = userInfo.icdNames;
				if (icdNames != null && icdNames.length > 0) {
					let icdNamesTemp = "";
					for (var i = 0; i < icdNames.length; i++) {
						icdNamesTemp += icdNames[i] + ","
					}
					userInfo.icdNames = icdNamesTemp;
				}
				console.log(userInfo)
				uni.request({
					url: this.$config.api.addUser,
					data: userInfo,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						let result = res.data;
						if (result.status == '0') {
							uni.showToast({
								title: "Register Success"
							});
						}
					}
				});
			},
			addDis() {
				this.$refs.popup.open();

			},
			checkboxChange(e) {
				this.formData.icdNames = e.detail.value;
				this.$forceUpdate();
			},
			staffTypeChange(e) {
				this.formData.staffType = e.detail.value;
			}
		}
	}
</script>

<style>
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

	.example {
		padding: 0 10px 10px;
	}

	.uni-input-border,
	.uni-textarea-border {
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.uni-input-border {
		padding: 0 10px;
		height: 35px;
	}

	.uni-textarea-border {
		padding: 10px;
		height: 80px;
	}

	.label-box {
		margin-right: 10px;
	}

	.transform-scale {
		transform: scale(0.7);
	}

	.button {
		margin: 10px auto;
	}

	.example-body {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 20rpx;
	}

	.tag-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		margin: 10rpx 15rpx;
		justify-content: center;
	}

	.uni-list-cell {
		justify-content: flex-start
	}
</style>
