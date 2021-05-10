<template>
	<view>
		<uni-list>
			<uni-list-chat v-for="item in listData" :key="item.id" :title="item.author_name" :avatar="item.cover"
				:note="item.title" :time="item.lastMsgDate" :clickable="true" :badge-text="item.text"
				@click="toMsg(item)"></uni-list-chat>
		</uni-list>
		<uni-fab v-if="!isDoctor" ref="fab" :pattern="fab.pattern" :horizontal="fab.horizontal" :vertical="fab.vertical"
			@trigger="trigger" @fabClick="fabClick" :popMenu="fab.popMenu" />

		<uni-drawer ref="showRight" mode="right" :mask-click="true" :width="200">
			<view class="scroll-view">
				<scroll-view class="scroll-view-box" scroll-y="true">
					<uni-card v-for="item in canSelectDoctor" :title="item.name" isShadow class="doctorCard"
						@click="toMsg(item)" :thumbnail="item.cover" extra="doctor">
						<text class="content-box-text">{{item.introduce}}</text>
					</uni-card>
				</scroll-view>
			</view>
		</uni-drawer>
		<u-tabbar :list="tabbar"></u-tabbar>

	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				tabbar: [],
				UNITS: {
					'年': 31557600000,
					'月': 2629800000,
					'天': 86400000,
					'小时': 3600000,
					'分钟': 60000,
					'秒': 1000
				},
				listData: [],
				canSelectDoctor: [],
				isDoctor: false,
				fab: {
					title: 'uni-fab',
					directionStr: '垂直',
					horizontal: 'left',
					vertical: 'bottom',
					direction: 'horizontal',
					popMenu: false,
					pattern: {
						color: '#7A7E83',
						backgroundColor: '#fff',
						selectedColor: '#007AFF',
					}
				},
				coverList: ['/static/c1.png', '/static/headImg/headImg1.png', '/static/headImg/headImg3.jpeg',
					'/static/headImg/headImg2.png'
				],
				avatarList: [{
					url: '/static/logo.png'
				}, {
					url: '/static/logo.png'
				}, {
					url: '/static/logo.png'
				}]
			}
		},
		onReady() {
			this.tabbar = this.$config.getMytabbar();
		},
		onLoad() {
			let userInfo = uni.getStorageSync("userInfo");
			if (userInfo.staffType == '0') {
				this.isDoctor = true;
			}
			this.getUserList();
		},
		methods: {
			trigger(e) {
				//console.log(e)
				this.content[e.index].active = !e.item.active
			},
			fabClick() {
				this.$refs['showRight'].open();
				if (this.canSelectDoctor == null || this.canSelectDoctor.length == 0) {
					uni.showToast({
						title: 'No Data',
						icon: 'none'
					});
				}
			},
			getCanSelectDoctor() {
				let userInfo = uni.getStorageSync("userInfo");
				uni.request({
					url: this.$config.api.getMyUnMsgUser,
					data: {
						userId: userInfo.userId
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						const result = res.data;
						if (result.status == '0') {
							uni.hideLoading();
							const data = result.result;

							if (data == null || data.length == 0) {
								return;
							}
							for (var i = 0; i < data.length; i++) {
								data[i].cover = this.coverList[i % 4];
								data[i].author_name = data[i].name;
								data[i].id = data[i].userId;
							}
							this.canSelectDoctor = data;
						}
						uni.hideLoading();
					}
				});
			},
			getUserList() {
				uni.showLoading({
					title: 'Loading'
				});
				let userInfo = uni.getStorageSync("userInfo");
				let data = {
					"userId": userInfo.userId,
					"staffType": "0"
				}
				if (userInfo.staffType == '0') {
					data.staffType = "1"
				}
				uni.request({
					url: this.$config.api.getMyMsgUser,
					data: data,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						const result = res.data;
						if (result.status == '0') {
							let userlist = result.result;
							console.log(userlist);
							if (userlist == null || userlist.length == 0) {
								uni.hideLoading();
								uni.showToast({
									title: 'No Data',
									icon: 'none'
								});
								return;
							}
							for (var i = 0; i < userlist.length; i++) {
								let u = userlist[i]
								let data = {};
								data.author_name = u.name;
								data.id = u.userId;
								data.title = u.lastMsgContent;
								data.lastMsgDate = u.lastMsgDate;
								if (i > 2) {
									data.cover = this.coverList[i % 4];
								} else {
									data.cover = this.coverList[i];
								}
								if (u.unReadMsgCount > 0) {
									data.text = u.unReadMsgCount;
								}
								this.listData.push(data);
							}
							this.getCanSelectDoctor();
						}
					}
				});
			},

			toMsg(e) {
				let flag = false;
				for (var i = 0; i < this.listData.length; i++) {
					if (this.listData[i].id == e.id) {
						flag = true;
						this.listData[i].text = 0;
						break;
					}
				}
				if (!flag) {
					this.listData.push(e);
				}
				//console.log(e);
				uni.navigateTo({
					url: "./chat?toUserName=" + e.author_name + "&headImg=" + e.cover + "&userId=" + e.id
				});
				this.$refs['showRight'].close();
			},
			avatar(count) {
				let arr = []
				this.avatarList.forEach((item, index) => {
					if (index < count) {
						arr.push(item)
					}
				})
				return arr
			},
			getList() {
				var data = {
					column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				uni.showLoading({
					title: 'Loading',
				});
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					data: data,
					success: data => {
						if (data.statusCode == 200) {
							let list = this.setTime(data.data);
							list = this.reload ? list : this.listData.concat(list);
							list.map(item => {
								item.text = Math.floor(Math.random() * (1 - 20) + 20)
								return item
							})
							this.listData = this.getRandomArrayElements(list, 3)
						}
						uni.hideLoading();
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				});
				//uni.hideLoading();
			},
			getRandomArrayElements(arr, count) {
				var shuffled = arr.slice(0),
					i = arr.length,
					min = i - count,
					temp, index;
				while (i-- > min) {
					index = Math.floor((i + 1) * Math.random());
					temp = shuffled[index];
					shuffled[index] = shuffled[i];
					shuffled[i] = temp;
				}
				return shuffled.slice(min);
			},
			setTime(items) {
				var newItems = [];
				items.forEach(e => {
					newItems.push({
						author_name: e.author_name,
						cover: e.cover,
						id: e.id,
						post_id: e.post_id,
						published_at: this.format(e.published_at),
						title: e.title
					});
				});
				return newItems;
			},
			format(dateStr) {
				var date = this.parse(dateStr)
				var diff = Date.now() - date.getTime();
				if (diff < this.UNITS['天']) {
					return this.humanize(diff);
				}
				var _format = function(number) {
					return (number < 10 ? ('0' + number) : number);
				};
				return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDate()) + ' ' +
					_format(date.getHours()) + ':' + _format(date.getMinutes());
			},
			parse(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
				var a = str.split(/[^0-9]/);
				return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
			},

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

	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}

	.doctorCard {}
</style>
