<template>
	<view class="qiun-columns">
		<view v-if="userSelect.show">
			<button style="margin-top: 10px;display: block;margin-left: 5px;margin-right: 5px;" class="button"
				size="mini" plain="true" type="primary" @click="openPopup()">Select patient</button>
		</view>
		<uni-popup id="popup" ref="popup" type="top" :animation="false">
			<uni-list>
				<uni-list-item v-for="item in userSelect.userList" :title="item.name" clickable
					@click="selectUser(item.userId)" />
			</uni-list>
		</uni-popup>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">Vital capacity line chart</view>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
		</view>
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio"
				:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true
				@touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA"
				@touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">Temperature line chart </view>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
		</view>
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasLineB" id="canvasLineB" class="charts" :width="cWidth*pixelRatio"
				:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true
				@touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasLineB" id="canvasLineB" class="charts" disable-scroll=true @touchstart="touchLineA"
				@touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">Heart rate line chart </view>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
		</view>
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasLineC" id="canvasLineC" class="charts" :width="cWidth*pixelRatio"
				:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true
				@touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasLineC" id="canvasLineC" class="charts" disable-scroll=true @touchstart="touchLineA"
				@touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">Height line chart</view>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
		</view>
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasLineD" id="canvasLineD" class="charts" :width="cWidth*pixelRatio"
				:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true
				@touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasLineD" id="canvasLineD" class="charts" disable-scroll=true @touchstart="touchLineA"
				@touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">Weight line chart</view>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
		</view>
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasLineE" id="canvasLineE" class="charts" :width="cWidth*pixelRatio"
				:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true
				@touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasLineE" id="canvasLineE" class="charts" disable-scroll=true @touchstart="touchLineA"
				@touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
		</view>
		<u-tabbar :list="tabbar"></u-tabbar>
	</view>
</template>

<script>
	import uCharts from '../../components/u-charts/u-charts.js';
	var _self;
	var canvasObj = {};

	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				cWidth2: '', //横屏图表
				cHeight2: '', //横屏图表
				cWidth3: '', //圆弧进度图
				cHeight3: '', //圆弧进度图
				arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
				gaugeWidth: '', //仪表盘宽度,此设置可使各端宽度一致
				tips: '',
				pixelRatio: 1,
				serverData: '',
				itemCount: 30, //x轴单屏数据密度
				sliderMax: 50,
				userSelect: {
					show: false,
					userList: []
				},
				tabbar: []

			}
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.cWidth2 = uni.upx2px(700);
			this.cHeight2 = uni.upx2px(1100);
			this.cWidth3 = uni.upx2px(250);
			this.cHeight3 = uni.upx2px(250);
			this.arcbarWidth = uni.upx2px(24);
			this.gaugeWidth = uni.upx2px(30);

			//this.fillData(Data);
		},
		onReady() {
			this.tabbar = this.$config.getMytabbar();
			let userInfo = uni.getStorageSync("userInfo");
			let userId = "";
			if (userInfo.staffType != '1') {
				uni.request({
					url: this.$config.api.getUserList,
					data: {
						staffType: "1"
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						let result = res.data;
						if (result.status == '0') {
							this.userSelect.show = true;
							this.userSelect.userList = result.result;
						}
					}
				});
			} else {
				userId = userInfo.userId;
				this.getServerData(userId);
			}
		},
		methods: {
			openPopup() {
				this.$refs.popup.open();
			},
			selectUser(userId) {
				this.getServerData(userId);
				this.$refs.popup.close();
			},
			getServerData(userId) {
				uni.showLoading({
					title: 'Loading'
				})
				uni.request({
					url: this.$config.api.getStatistics,
					data: {
						userId: userId
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						let result = res.data;
						console.log(result);
						if (result.status == '0') {
							_self.fillData(result.result);
							uni.hideLoading();
						}
					}
				});

			},
			fillData(data) {
				let datearray = [];
				if (data != null) {
					datearray = data[0].createDate;
				}

				let LineTz = {
					categories: datearray,
					series: [{
						color: "#1890ff",
						legendShape: "line",
						pointShape: "circle",
						show: true,
						type: "line",
						name: "weight"
					}]
				};
				let LineSg = {

					categories: datearray,
					series: [{
						color: "#1890ff",
						legendShape: "line",
						pointShape: "circle",
						show: true,
						type: "line",
						name: "height"
					}]
				};
				let LineFhl = {
					markLine: [{
							value: 3500,
							showLabel: true
						},
						{
							value: 4000,
							showLabel: true

						}
					],
					min: 3200,
					max: 4500,
					categories: datearray,
					series: [{
						color: "#1890ff",
						legendShape: "line",
						pointShape: "circle",
						show: true,
						type: "line",
						name: "Vital capacity"
					}]
				};
				let LineXy = {
					markLine: [{
							value: 60,
							showLabel: true
						},
						{
							value: 100,
							showLabel: true

						}
					],
					min: 50,
					max: 120,
					categories: datearray,
					series: [{
						color: "#1890ff",
						legendShape: "line",
						pointShape: "circle",
						show: true,
						type: "line",
						name: "Heart rate"
					}]
				};
				let LineTw = {
					markLine: [{
						value: 37,
						showLabel: true
					}],
					min: 36,
					max: 39,
					categories: datearray,
					series: [{
						color: "#1890ff",
						legendShape: "line",
						pointShape: "circle",
						show: true,
						type: "line",
						name: "temperature"
					}]
				};


				if (data != null) {
					LineFhl.series[0].data = data[0].fhl;
					LineTw.series[0].data = data[0].tw;
					LineXy.series[0].data = data[0].xy;
					LineSg.series[0].data = data[0].sg;
					LineTz.series[0].data = data[0].tz;
				}

				this.showLineFhl("canvasLineA", LineFhl);
				this.showLineFhl("canvasLineB", LineTw);
				this.showLineFhl("canvasLineC", LineXy);
				this.showLineA("canvasLineD", LineSg);
				this.showLineA("canvasLineE", LineTz);

			},

			getEveryDayDateByBetweenDate(start_date, end_date) {
				var dateList = [start_date];
				if (start_date == end_date) return dateList;
				var i = 1;
				while (true) {
					var dateTime = new Date(dateList[i - 1]);
					dateTime = dateTime.setDate(dateTime.getDate() + 1);
					var date = new Date(dateTime).format("yyyy-MM-dd");
					dateList.push(date);
					if (date == end_date) {
						break;
					}
					i++;
				}
				return dateList;
			},
			showColumn(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: false,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						format: (val) => {
							return val.toFixed(0) + '元'
						}
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});
			},
			showColumnMeter(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: false,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'meter',
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length,
							meter: {
								border: 4,
								fillColor: '#E5FDC3'
							}
						}
					}
				});

			},
			showLineFhl(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 5,
					},
					// rotate:true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						min: chartData.min,
						max: chartData.max,
						gridType: 'dash',
						format: (val) => {
							return val.toFixed(0);
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'straight',
						markLine: {
							type: "dash",
							data: chartData.markLine
						}
					},
				});

			},
			showLineA(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 5,
					},
					dataLabel: false,
					dataPointShape: false,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						// min: chartData.min,
						// max: chartData.max,
						gridType: 'dash',
						format: (val) => {
							return val.toFixed(0);
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'straight',
						markLine: {
							type: "dash",
							//	data: chartData.markLine
						}
					},
				});

			},
			showLineB(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 5,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					rotate: true, //开启图表横屏
					// #ifdef MP-ALIPAY
					rotateLock: true, //百度及支付宝需要锁定旋转
					// #endif
					categories: chartData.categories,
					animation: false,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
					},
					width: _self.cWidth2 * _self.pixelRatio,
					height: _self.cHeight2 * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'curve'
					},
				});
			},
			showArea(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'area',
					fontSize: 11,
					padding: [0, 15, 10, 15],
					legend: {
						show: true,
						position: 'top',
						float: 'center',
						itemGap: 30,
						padding: 5,
						lineHeight: 18,
						margin: 0,
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						boundaryGap: 'justify' //两端不留白配置
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						area: {
							type: 'curve',
							opacity: 0.2,
							addLine: true,
							width: 2
						}
					}
				});
			},
			showPie(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					},
				});
			},
			showRing(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					padding: [5, 5, 5, 5],
					legend: {
						show: true,
						position: 'right',
						float: 'center',
						itemGap: 10,
						padding: 5,
						lineHeight: 26,
						margin: 5,
						//backgroundColor:'rgba(41,198,90,0.2)',
						//borderColor :'rgba(41,198,90,0.5)',
						borderWidth: 1
					},
					title: {
						name: '70%',
						color: '#7cb5ec',
						fontSize: 25 * _self.pixelRatio,
					},
					subtitle: {
						name: '收益率',
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
					},
					extra: {
						pie: {
							lableWidth: 15,
							ringWidth: 40 * _self.pixelRatio, //圆环的宽度
							offsetAngle: 0 //圆环的角度
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
				});

			},
			showFunnel(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'funnel',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						funnel: {
							border: true,
							borderWidth: 2,
							borderColor: '#FFFFFF'
						}
					},
				});
			},
			showRadar(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'radar',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: false,
					dataLabel: true,
					categories: chartData.categories,
					series: chartData.series,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						radar: {
							max: 200 //雷达数值的最大值
						}
					}
				});
			},
			showArcbar(canvasId, chartData) {
				new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					title: {
						name: Math.round(chartData.series[0].data * 100) + '%',
						color: chartData.series[0].color,
						fontSize: 25 * _self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15 * _self.pixelRatio
					},
					extra: {
						arcbar: {
							type: 'default',
							width: _self.arcbarWidth * _self.pixelRatio, //圆弧的宽度
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth3 * _self.pixelRatio,
					height: _self.cHeight3 * _self.pixelRatio,
					dataLabel: true,
				});

			},
			showArcbar2(canvasId, chartData) {
				new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					title: {
						name: Math.round(chartData.series[0].data * 100) + '%',
						color: chartData.series[0].color,
						fontSize: 25 * _self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15 * _self.pixelRatio
					},
					extra: {
						arcbar: {
							type: 'default',
							width: _self.arcbarWidth * _self.pixelRatio, //圆弧的宽度
							backgroundColor: '#ffe3e8',
							startAngle: 1.25,
							endAngle: 0.75
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth3 * _self.pixelRatio,
					height: _self.cHeight3 * _self.pixelRatio,
					dataLabel: true,
				});

			},
			showArcbar3(canvasId, chartData) {
				new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					title: {
						name: Math.round(chartData.series[0].data * 100) + '%',
						color: chartData.series[0].color,
						fontSize: 25 * _self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15 * _self.pixelRatio
					},
					extra: {
						arcbar: {
							type: 'circle', //整圆类型进度条图
							width: _self.arcbarWidth * _self.pixelRatio, //圆弧的宽度
							startAngle: 0.5 //整圆类型只需配置起始角度即可
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth3 * _self.pixelRatio,
					height: _self.cHeight3 * _self.pixelRatio,
					dataLabel: true,
				});

			},
			showGauge(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'gauge',
					fontSize: 11,
					title: {
						name: Math.round(chartData.series[0].data * 100) + '%',
						color: chartData.categories[1].color,
						fontSize: 25 * _self.pixelRatio,
						offsetY: 50 * _self.pixelRatio, //新增参数，自定义调整Y轴文案距离
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
						offsetY: -50 * _self.pixelRatio, //新增参数，自定义调整Y轴文案距离
					},
					extra: {
						gauge: {
							type: 'default',
							width: _self.gaugeWidth * _self.pixelRatio, //仪表盘背景的宽度
							startAngle: 0.75,
							endAngle: 0.25,
							startNumber: 0,
							endNumber: 100,
							splitLine: {
								fixRadius: 0,
								splitNumber: 10,
								width: _self.gaugeWidth * _self.pixelRatio, //仪表盘背景的宽度
								color: '#FFFFFF',
								childNumber: 5,
								childWidth: _self.gaugeWidth * 0.4 * _self.pixelRatio, //仪表盘背景的宽度
							},
							pointer: {
								width: _self.gaugeWidth * 0.8 * _self.pixelRatio, //指针宽度
								color: 'auto'
							}
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
				});
			},
			changeGaugeData() {
				let series = [{
					name: "完成率",
					data: Math.random()
				}]; //这里是随机数据，生产环境请从服务器获取，注意series数据类型为数组
				//这里我借用之前的categories数据，判断一下新数据的title.color，没有写死在程序里，以便于自定义
				let newTitleColor;
				for (let i = 0; i < _self.serverData.Gauge.categories.length; i++) {
					if (series[0].data <= _self.serverData.Gauge.categories[i].value) {
						newTitleColor = _self.serverData.Gauge.categories[i].color;
						break;
					}
				}

				canvasObj['canvasGauge'].updateData({
					series: series, //这里给了新数值
					categories: _self.serverData.Gauge.categories,
					title: {
						name: Math.round(series[0].data * 100) + '%',
						color: newTitleColor,
						fontSize: 25 * _self.pixelRatio,
						offsetY: 50 * _self.pixelRatio, //新增参数，自定义调整Y轴文案距离
					},
					subtitle: {
						name: '更新数据',
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
						offsetY: -50 * _self.pixelRatio, //新增参数，自定义调整Y轴文案距离
					}
				});
			},
			showCandle(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'candle',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 8,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					enableMarkLine: true,
					/***需要开启标记线***/
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: true, //不绘制X轴网格线
						labelCount: 4, //X轴文案数量
						//type:'grid',
						//gridType:'dash',
						itemCount: _self.itemCount, //可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'right',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						splitNumber: 5,
						format: (val) => {
							return val.toFixed(0)
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: false,
					dataPointShape: true,
					extra: {
						candle: {
							color: {
								upLine: '#f04864',
								upFill: '#f04864',
								downLine: '#2fc25b',
								downFill: '#2fc25b'
							},
							average: {
								show: true,
								name: ['MA5', 'MA10', 'MA30'],
								day: [5, 10, 20],
								color: ['#1890ff', '#2fc25b', '#facc14']
							}
						},
						tooltip: {
							bgColor: '#000000',
							bgOpacity: 0.7,
							gridType: 'dash',
							dashLength: 5,
							gridColor: '#1890ff',
							fontColor: '#FFFFFF',
							horizentalLine: true,
							xAxisLabel: true,
							yAxisLabel: true,
							labelBgColor: '#DFE8FF',
							labelBgOpacity: 0.95,
							labelAlign: 'left',
							labelFontColor: '#666666'
						},
						markLine: {
							type: 'dash',
							dashLength: 5,
							data: [{
								value: 2150,
								lineColor: '#f04864',
								showLabel: true
							}, {
								value: 2350,
								lineColor: '#f04864',
								showLabel: true
							}]
						}
					}
				});
			},
			touchCandle(e) {
				canvasObj['canvasCandle'].scrollStart(e);
			},
			moveCandle(e) {
				canvasObj['canvasCandle'].scroll(e);
			},
			touchEndCandle(e) {
				canvasObj['canvasCandle'].scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvasObj['canvasCandle'].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			changeData() {
				canvasObj['canvasColumn'].updateData({
					series: _self.serverData.ColumnB.series,
					categories: _self.serverData.ColumnB.categories
				});
			},
			touchLineA(e) {
				canvasObj['canvasLineA'].scrollStart(e);
			},
			moveLineA(e) {
				canvasObj['canvasLineA'].scroll(e);
			},
			touchEndLineA(e) {
				canvasObj['canvasLineA'].scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvasObj['canvasLineA'].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			showMix(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'mix',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 6,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
					},
					yAxis: {
						gridType: 'dash',
						dashLength: 4,
						splitNumber: 5,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0)
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						column: {
							width: 20 * _self.pixelRatio
						},
						tooltip: {
							bgColor: '#000000',
							bgOpacity: 0.7,
							gridType: 'dash',
							dashLength: 8,
							gridColor: '#1890ff',
							fontColor: '#FFFFFF',
							horizentalLine: true,
							xAxisLabel: true,
							yAxisLabel: true,
							labelBgColor: '#DFE8FF',
							labelBgOpacity: 0.95,
							labelAlign: 'left',
							labelFontColor: '#666666'
						}
					},
				});
			},
			touchMix(e) {
				canvasObj['canvasMix'].scrollStart(e);
			},
			moveMix(e) {
				canvasObj['canvasMix'].scroll(e);
			},
			touchEndMix(e) {
				canvasObj['canvasMix'].scrollEnd(e);
				canvasObj['canvasMix'].touchLegend(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvasObj['canvasMix'].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			touchIt(e, id) {
				canvasObj[id].touchLegend(e, {
					animation: false
				});
				canvasObj[id].showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
					}
				});
			},
			touchPie(e, id) {
				canvasObj[id].showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
		}
	}
</script>

<style>
	page {
		background: #fff;
		/* width: 750rpx; */
		/* width: 100%; */
		overflow-x: hidden;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10rpx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10rpx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10rpx solid #0ea391;
		padding-left: 10rpx;
		font-size: 32rpx;
		color: #000000
	}

	/* 通用样式 */
	.qiun-charts {
		/* width: 750rpx; */
		/* width:100%; */
		height: 500rpx;
		background-color: #FFFFFF;
	}

	.charts {
		/* width: 750rpx; */
		width: 100%;
		height: 500rpx;
		background-color: #FFFFFF;
	}

	/* 横屏样式 */
	.qiun-charts-rotate {
		width: 700rpx;
		height: 1100rpx;
		background-color: #FFFFFF;
		padding: 25rpx;
	}

	.charts-rotate {
		width: 700rpx;
		height: 1100rpx;
		background-color: #FFFFFF;
	}

	/* 圆弧进度样式 */
	.qiun-charts3 {
		/* width: 750rpx;
		width:100%; */
		height: 250rpx;
		background-color: #FFFFFF;
		position: relative;
	}

	.charts3 {
		position: absolute;
		width: 250rpx;
		height: 250rpx;
		background-color: #FFFFFF;
	}

	.qiun-tip {
		display: block;
		width: auto;
		overflow: hidden;
		padding: 15rpx;
		height: 30rpx;
		line-height: 30rpx;
		margin: 10rpx;
		background: #ff9933;
		font-size: 30rpx;
		border-radius: 8rpx;
		justify-content: center;
		text-align: center;
		border: 1px solid #dc7004;
		color: #FFFFFF;
	}
</style>
