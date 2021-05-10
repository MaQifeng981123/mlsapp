//let apihead = "/api/";
let apihead="http://121.4.243.61:8086/mlsapp/";
//let apihead="http://121.4.243.61:8087/mlsapp/";
export default {
	api: {
		login: apihead + 'login',
		addUser: apihead + 'user/addUser',
		updateUser: apihead + 'user/updateUser',
		getMyMsgUser: apihead + 'user/getMyMsgUser',
		getMyUnMsgUser: apihead + 'user/getUnMyMsgUser',
		updateMsgRead: apihead + 'message/updateMsgRead',
		updateExamData: apihead + 'exam/uploadExamData',
		createCurrExamData: apihead + 'exam/createCurrExamData',
		addExamData: apihead + 'exam/addExamData',
		getExamDataList: apihead + 'exam/getExamDataList',
		sendMsg: apihead + 'message/sendMsg',
		getMyMsgList: apihead + 'message/getMyMsgList',
		getUserList: apihead + 'user/getUserList',
		addIcd: apihead + 'dictIcd/addIcd',
		getIcdList: apihead + 'dictIcd/getIcdList',
		getStatistics: apihead + 'exam/getStatistics'
		// login: 'http://121.4.243.61:8086/mlsapp/login',
		// updateUser: 'http://121.4.243.61:8086/mlsapp/user/updateUser',
		// updateExamData: 'http://121.4.243.61:8086/mlsapp/exam/uploadExamData',
		// addUser: 'http://121.4.243.61:8086/mlsapp/user/addUser',
		// updateUser: 'http://121.4.243.61:8086/mlsapp/user/updateUser',
		// createCurrExamData: 'http://121.4.243.61:8086/mlsapp/exam/createCurrExamData',
		// addExamData: 'http://121.4.243.61:8086/mlsapp/exam/addExamData',
		// getExamDataList: 'http://121.4.243.61:8086/mlsapp/exam/getExamDataList',
		// sendMsg: 'http://121.4.243.61:8086/mlsapp/message/sendMsg',
		// getMsgList: 'http://121.4.243.61:8086/mlsapp/message/getMsgList',
		// getUserList: 'http://121.4.243.61:8086/mlsapp/user/getUserList',
		// addIcd: 'http://121.4.243.61:8086/mlsapp/dictIcd/addIcd',
		// getIcdList: 'http://121.4.243.61:8086/mlsapp/dictIcd/getIcdList',
		// getStatistics:'http://121.4.243.61:8086/mlsapp/exam/getStatistics'
	},
	change(e) {
		let v = [];
		for (let p in e) {
			let n = {};

			if ('xz' == p) {
				continue;
			}

			if ('kfxt' == p) {
				n.text = 'GLU';
			} else if ('tz' == p) {
				n.text = 'weight';
			} else if ('sg' == p) {
				n.text = 'height';
			} else if ('xz' == p) {
				n.text = '血脂';
			} else if ('yw' == p) {
				n.text = 'M62';
			} else if ('xy' == p) {
				n.text = 'BP';
			} else if ('xl' == p) {
				if (Number(e[p]) < 60 || Number(e[p]) > 100) {
					n.abnormal = true;
				}
				n.text = 'Heart rate';
			} else if ('tw' == p) {
				n.text = 'temperature';
			} else if ('fhl' == p) {
				if (Number(e[p]) < 3500 || Number(e[p]) > 4000) {
					n.abnormal = true;
				}
				n.text = 'Vital capacity';
			}
			// if ('kfxt' == p) {
			// 	n.text = '空腹血糖';
			// } else if ('tz' == p) {
			// 	n.text = '体重';
			// } else if ('sg' == p) {
			// 	n.text = '身高';
			// } else if ('xz' == p) {
			// 	n.text = '血脂';
			// } else if ('yw' == p) {
			// 	n.text = '腰围';
			// } else if ('xy' == p) {
			// 	n.text = '血压';
			// } else if ('xl' == p) {
			// 	n.text = '心率';
			// } else if ('tw' == p) {
			// 	n.text = '体温';
			// } else if ('fhl' == p) {
			// 	n.text = '肺活量';
			// }
			n.data = e[p];
			v.push(n);
		}
		return v;
	},
	alertFail(e) {

	},
	getMytabbar() {
		let tabber = new Array();
		//type：all , 0 ,1, -1
		let configTabbar = [{
				text: "Today's data",
				pagePath: "/pages/exam/nowExam",
				iconPath: "/static/template.png",
				selectedIconPath: "/static/templateHL.png",
				type: '1'
			},
			{
				text: "Statistics",
				pagePath: "/pages/tj/tj",
				iconPath: "/static/extui.png",
				selectedIconPath: "/static/extuiHL.png",
				type: 'all'

			},
			{
				"text": "Message",
				"pagePath": "/pages/message/msg",
				"iconPath": "/static/component.png",
				"selectedIconPath": "/static/componentHL.png",
				'type': 'all',
				midButton: false,
				isDot: false
			},
			{
				"text": "My",
				"pagePath": "/pages/my/my",
				"iconPath": "/static/component.png",
				"selectedIconPath": "/static/componentHL.png",
				'type': 'all',
				midButton: false,
				isDot: false
			},
			{
				"text": "Patient",
				"pagePath": "/pages/index/patient",
				"iconPath": "/static/component.png",
				"selectedIconPath": "/static/componentHL.png",
				'type': '-1',
				midButton: false,
				isDot: false
			},
			{
				"text": "Doctor",
				"pagePath": "/pages/index/doctor",
				"iconPath": "/static/component.png",
				"selectedIconPath": "/static/componentHL.png",
				'type': '-1',
				midButton: false,
				isDot: false
			},
			{
				"text": "My",
				"pagePath": "/pages/my/my",
				"iconPath": "/static/component.png",
				"selectedIconPath": "/static/componentHL.png",
				'type': '-1',
				midButton: false,
				isDot: false
			}
		];

		// let configTabbar = [{
		// 		iconPath: "/static/uview/example/component.png",
		// 		selectedIconPath: "/static/uview/example/component_select.png",
		// 		text: '组件',
		// 		count: 2,
		// 		isDot: true,
		// 		pagePath: "/pages/index/index",
		// 		type: 'all'
		// 	},
		// 	{
		// 		iconPath: "/static/uview/example/js.png",
		// 		selectedIconPath: "/static/uview/example/js_select.png",
		// 		text: '工具',
		// 		midButton: true,
		// 		pagePath: "/pages/js/index",
		// 		type: 'all'
		// 	}
		// ]

		let userInfo = uni.getStorageSync("userInfo");
		console.log(userInfo);
		for (let i = 0; i < configTabbar.length; i++) {
			if (userInfo.staffType == '-1') {
				if (configTabbar[i].type == '-1') {

					tabber.push(configTabbar[i]);
				}
			} else {
				if (configTabbar[i].type == 'all' || configTabbar[i].type == userInfo.staffType) {

					tabber.push(configTabbar[i]);
				}
			}
		}
		return tabber;

	}
}
