<template>
	<view>
		<uni-forms :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext">
			<uni-group title="My information" top="0">
				<uni-forms-item name="name" required label="name">
					<uni-easyinput :disabled="adminFlag" type="text" :inputBorder="true" v-model="formData.name" placeholder="请输入用户名">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item v-if="!adminFlag" name="loginId" required label="loginId">
					<uni-easyinput type="text" :inputBorder="true" disabled v-model="formData.loginId"
						placeholder="请输入用户名"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item v-if="!adminFlag" name="password" required label="password">
					<uni-easyinput type="password" :inputBorder="true" v-model="formData.password" placeholder="请输入用户名">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="Int" label="Int">
					<uni-easyinput type="textarea" v-model="formData.introduce" :maxlength="50" placeholder="请输入备注">
					</uni-easyinput>
				</uni-forms-item>
			</uni-group>
		</uni-forms>
		<uni-section title="Disease label" type="line" style="background-color:#FFFFFF;">
			<button class="button" type="primary" size="mini" @click="addDis()">add</button>
		</uni-section>
		<view class="example-body">
			<view class="tag-view" v-for="v in formData.icdNameArray">
				<uni-tag :inverted="true" :circle="true" :text="v" type="error" />
			</view>
		</view>
		<view class="example">
			<button class="button" type="primary" @click="submitForm()">Save</button>
		</view>
		<uni-popup id="popup" ref="popup" type="bottom" :animation="false">

			<view class="uni-list">
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in icdList" :key="item.icdCode">
						<view>
							<checkbox :value="item.icdName" :checked="formData.icdNameArray.includes(item.icdName)" />
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
				formData: {},
				icdList: {},
				adminFlag: false
			}
		},
		onLoad(user) {
			let userInfo = null;
			if (user == null ||user.userInfo==null ) {
				userInfo = uni.getStorageSync("userInfo");
			} else {
				this.adminFlag = true;
				userInfo = JSON.parse(user.userInfo);
			}
			this.formData = userInfo;
			if (userInfo.icdNames != null) {
				this.formData.icdNameArray = userInfo.icdNames.split(",");
			} else {
				this.formData.icdNameArray = [];
			}

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
				let array = this.formData.icdNameArray;
				let icdNames = "";
				if (array != null) {
					for (var i = 0; i < array.length; i++) {
						icdNames += "," + array[i];
					}
					if (icdNames.length > 0) {
						icdNames = icdNames.substr(1);
					}
				}

				uni.request({
					url: this.$config.api.updateUser,
					data: {
						icdNames: icdNames,
						userId: this.formData.userId,
						name: this.formData.name,
						introduce: this.formData.introduce
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						let result = res.data;
						console.log(res);
						if (result.status == '0') {
							uni.showToast({
								title: 'Save success'
							})
						}
					}
				});

			},
			addDis() {
				this.$refs.popup.open();

			},
			saveDis() {

			},
			checkboxChange(e) {
				this.formData.icdNameArray = e.detail.value;
				this.$forceUpdate();
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
