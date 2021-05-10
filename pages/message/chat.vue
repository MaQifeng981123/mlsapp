<template>
	<view class="content">
		<view class="content-box" @touchstart="touchstart" id="content-box" :class="{'content-showfn':showFunBtn}">
			<!-- 背景图- 定位方式 -->
			<view class="message" v-for="(item, index) in messageList" :key="index" :id="`msg-${item.hasBeenSentId}`">
				<view class="message-item " :class="item.isItMe ? 'right' : 'left'">
					<image class="img" :src="item.fromUserHeadImg" mode=""></image>
					<!-- contentType = 1 文本 -->
					<view class="content" v-if="item.contentType == 1">{{ item.content }}</view>

				</view>
			</view>
		</view>

		<!-- 底部聊天输入框 -->
		<view class="input-box" :class="{ 'input-box-mpInputMargin': mpInputMargin }">
			<view class="input-box-flex">
				<!-- #ifndef H5 -->
				<!-- <image v-if="chatType === 'voice'" class="icon_img" :src="require('@/static/voice.png')" @click="switchChatType('keyboard')"></image> -->
				<!-- <image v-if="chatType === 'keyboard'" class="icon_img" :src="require('@/static/keyboard.png')" @click="switchChatType('voice')"></image> -->
				<!-- #endif -->
				<view class="input-box-flex-grow">
					<input v-if="chatType === 'voice'" type="text" class="content" id="input" v-model="formData.content"
						:hold-keyboard="true" :confirm-type="'send'" :confirm-hold="true"
						placeholder-style="color:#DDDDDD;" :cursor-spacing="10" />
				</view>
				<button class="btn" type="primary" size="mini" @touchend.prevent="sendMsg(null)">发送</button>
				<!-- #ifdef H5 -->
				<!-- #endif -->
			</view>

			<view class="fun-box" :class="{'show-fun-box':showFunBtn}">
				<!-- <u-grid :col="4" hover-class="contentType2-hover-class" :border="false" @click="clickGrid">
					<u-grid-item v-for="(item, index) in funList" :index="index" :key="index" bg-color="#eaeaea">
						<view class="grid-text">{{ item.title }}</view>
					</u-grid-item>
				</u-grid> -->
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info: {
					"userName": '张三',
					"headImg": '../../static/c8.png',
					"id": '456',
					"messageId": "messageId"
				},
				fromUserInfo: {},
				formData: {
					content: '',
					limit: 15,
					index: 1
				},
				messageList: [],
				loading: true, //标识是否正在获取数据
				imgHeight: '1000px',
				mpInputMargin: false, //适配微信小程序 底部输入框高度被顶起的问题
				chatType: "voice", // 图标类型 'voice'语音 'keyboard'键盘
				voiceTitle: '按住 说话',
				Recorder: uni.getRecorderManager(),
				Audio: uni.createInnerAudioContext(),
				recording: false, //标识是否正在录音
				isStopVoice: false, //加锁 防止点击过快引起的当录音正在准备(还没有开始录音)的时候,却调用了stop方法但并不能阻止录音的问题
				voiceInterval: null,
				voiceTime: 0, //总共录音时长
				canSend: true, //是否可以发送
				PointY: 0, //坐标位置
				voiceIconText: "正在录音...",
				showFunBtn: false, //是否展示功能型按钮
				AudioExam: null, //正在播放音频的实例
				funList: [{
						icon: "photo-fill",
						title: "照片",
						uploadType: ["album"]
					},
					{
						icon: "camera-fill",
						title: "拍摄",
						uploadType: ["camera"]
					},
				],
			};
		},
		methods: {
			//拼接消息 处理滚动
			async joinData() {
				if (!this.loading) {
					//如果没有获取数据 即loading为false时，return 避免用户重复上拉触发加载
					return;
				}
				this.loading = false;
				const data = await this.getMessageData();
				//	console.log(data);
				//获取节点信息
				const {
					index
				} = this.formData;
				// const sel =
				// 	`#msg-${index > 1 ? this.messageList[0].hasBeenSentId : data[data.length - 1].hasBeenSentId}`;
				//this.messageList = [...data, ...this.messageList];
				this.messageList = [...data];
				//填充数据后，视图会自动滚动到最上面一层然后瞬间再跳回bindScroll的指定位置 ---体验不是很好，后期优化
				// this.$nextTick(() => {
				// 	this.bindScroll(sel);
				// 	//如果还有数据
				// 	if (this.formData.limit >= data.length) {
				// 		this.formData.index++;
				// 		setTimeout(() => {
				// 			this.loading = true;
				// 		}, 200);
				// 	}
				// });
			},
			//处理滚动
			bindScroll(sel, duration = 0) {
				let query = uni.createSelectorQuery().in(this);
				query
					.select(sel)
					.boundingClientRect(data => {
						uni.pageScrollTo({
							scrollTop: data && data.top - 40,
							duration
						});
					})
					.exec();
			},
			//获取消息
			getMessageData() {
				let userInfo = uni.getStorageSync("userInfo");
				uni.showLoading({
					title: 'Loading'
				});

				return new Promise((resolve, reject) => {
					uni.request({
						url: this.$config.api.getMyMsgList, //仅为示例，并非真实接口地址。
						data: {
							"msgSendId": userInfo.userId,
							"msgRecivceId": this.fromUserInfo.fromUserId
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res) => {
							let result = res.data;
							console.log(result)
							if (result.status == '0') {
								let msgList = result.result;
								let arr = [];
								if (msgList != null && msgList.length > 0) {
									for (let i = 0; i < msgList.length; i++) {
										let isItMe = userInfo.userId == msgList[i].msgSendId;
										let msg = {
											hasBeenSentId: msgList[i].msgId, //已发送过去消息的id
											content: msgList[i].msgData,
											fromUserHeadImg: isItMe ? this.user_info.headImg : this
												.fromUserInfo
												.fromUserHeadImg, //用户头像

											fromUserId: isItMe ? this.user_info.id : this
												.fromUserInfo
												.fromUserId,
											isItMe, //true此条信息是我发送的 false别人发送的

											createTime: msgList[i].createDate,
											contentType: 1, // 1文字文本 2语音
											anmitionPlay: false //标识音频是否在播放
										}
										arr.push(msg);
									}
								}
								uni.hideLoading();
								resolve(arr);
							}
						}
					});
				});


				// let getData = () => {
				// 	let arr = [];
				// 	let startIndex = (this.formData.index - 1) * this.formData.limit;
				// 	let endIndex = startIndex + this.formData.limit;
				// 	for (let i = startIndex; i < endIndex; i++) {
				// 		const isItMe = Math.random() > 0.5 ? true : false;
				// 		arr.unshift({
				// 			hasBeenSentId: i, //已发送过去消息的id
				// 			content: `很高兴认识你，这是第${i + 1}条消息。`,
				// 			fromUserHeadImg: isItMe ? this.user_info.headImg : this.fromUserInfo
				// 				.fromUserHeadImg, //用户头像

				// 			fromUserId: isItMe ? this.user_info.id : this.fromUserInfo.fromUserId,
				// 			isItMe, //true此条信息是我发送的 false别人发送的

				// 			createTime: Date.now(),
				// 			contentType: 1, // 1文字文本 2语音
				// 			anmitionPlay: false //标识音频是否在播放
				// 		});
				// 	}
				// 	return arr;
				// };
				// return new Promise((resolve, reject) => {
				// 	const data = getData();
				// 	setTimeout(() => {
				// 		resolve(data);
				// 	}, 500);
				// });
			},
			//切换语音或者键盘方式
			switchChatType(type) {
				this.chatType = type;
				this.showFunBtn = false;
			},
			//切换功能性按钮
			switchFun() {
				this.chatType = 'keyboard'
				this.showFunBtn = !this.showFunBtn;
				uni.hideKeyboard()
			},

			sendMsgToOther(param) {
				return new Promise((resolve, reject) => {
					uni.request({
						url: this.$config.api.sendMsg, //仅为示例，并非真实接口地址。
						data: param,
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res) => {
							let result = res.data;
							if (result.status == '0') {
								resolve(true);
							}
						}
					});
				});
			},
			//发送消息
			async sendMsg(data) {
				console.log(this.fromUserInfo);
				const params = {
					content: this.formData.content,
					msgData: this.formData.content,
					msgSendId: this.user_info.id,
					msgRecivceId: this.fromUserInfo.fromUserId,
					fromUserHeadImg: this.fromUserInfo.fromUserHeadImg, //用户头像
					fromUserId: this.fromUserInfo.fromUserId,
					isItMe: true, //true此条信息是我发送的  false别人发送的
					createTime: Date.now(),
					contentType: 1
				}

				if (data) {} else if (!this.$u.trim(this.formData.content)) {
					//验证输入框书否为空字符传
					return;
				}
				const flag = await this.sendMsgToOther(params);
				if (flag) {
					this.messageList.push(params);
				} else {
					uni.showToast({
						title: 'send fail'
					});
				}


				this.$nextTick(() => {
					this.formData.content = '';
					// #ifdef MP-WEIXIN
					if (params.contentType == 1) {
						uni.pageScrollTo({
							scrollTop: 99999,
							duration: 0, //小程序如果有滚动效果 input的焦点也会随着页面滚动...
						});
					} else {
						setTimeout(() => {
							uni.pageScrollTo({
								scrollTop: 99999,
								duration: 0, //小程序如果有滚动效果 input的焦点也会随着页面滚动...
							});
						}, 150)
					}
					// #endif

					// #ifndef MP-WEIXIN
					uni.pageScrollTo({
						scrollTop: 99999,
						duration: 100
					});
					// #endif

					if (this.showFunBtn) {
						this.showFunBtn = false;
					}

					// #ifdef MP-WEIXIN
					if (params.contentType == 1) {
						this.mpInputMargin = true;
					}
					// #endif
					//h5浏览器并没有很好的办法控制键盘一直处于唤起状态 而且会有样式性的问题
					// #ifdef H5
					uni.hideKeyboard();
					// #endif
				});
			},
			//用户触摸屏幕的时候隐藏键盘
			touchstart() {
				uni.hideKeyboard();
			},
			//关闭动画
			closeAnmition() {
				const hasBeenSentId = this.Audio.hasBeenSentId;
				const item = this.messageList.find(it => it.hasBeenSentId == hasBeenSentId);
				item.anmitionPlay = false;
			},
			//点击宫格时触发
			clickGrid(index) {
				if (index == 0) {
					this.chooseImage(['album'])
				} else if (index == 1) {
					this.chooseImage(['camera'])
				}
			},


		},
		onPageScroll(e) {
			if (e.scrollTop < 50) {
				this.joinData();
			}
		},
		onNavigationBarButtonTap({
			index
		}) {
			if (index == 0) {
				//用户详情 设置
			} else if (index == 1) {

			}
		},

		onLoad(info) {
			const userInfo = uni.getStorageSync("userInfo");
			this.user_info = {
				"userName": userInfo.name,
				"headImg": '../../static/c8.png',
				"id": userInfo.userId
			}
			this.fromUserInfo = {
				fromUserName: info.toUserName,
				fromUserHeadImg: info.headImg,
				fromUserId: info.userId
			};
			uni.request({
				url: this.$config.api.updateMsgRead,
				data: {
					"msgRecivceId": userInfo.userId,
					"msgSendId": info.userId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (res) => {

				}
			});

		},
		onReady() {
			//自定义返回按钮 因为原生的返回按钮不可阻止默认事件
			// #ifdef H5
			//	const icon = document.getElementsByClassName('uni-page-head-btn')[0];
			//icon.style.display = 'none';
			// #endif
			uni.setNavigationBarTitle({
				title: this.fromUserInfo.fromUserName
			});
			this.joinData();
			uni.getSystemInfo({
				success: res => {
					this.imgHeight = res.windowHeight + 'px';
				}
			});

			uni.onKeyboardHeightChange(res => {
				if (res.height == 0) {
					// #ifdef MP-WEIXIN
					this.mpInputMargin = false;
					// #endif
				} else {
					this.showFunBtn = false;
				}
			});
		}
	};
</script>

<style lang="scss" scoped>
	@import './index.scss'
</style>
