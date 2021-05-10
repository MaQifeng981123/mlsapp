const urlHead = "http://121.4.243.61:8086";
export default {
	api: {
		login: '/api/login',
		addUser: '/api/user/addUser',
		updateUser: '/api/user/updateUser',
		updateExamData: '/api/exam/uploadExamData',
		createCurrExamData: '/api/exam/createCurrExamData',
		addExamData: '/api/exam/addExamData',
		getExamDataList: '/api/exam/getExamDataList',
		sendMsg: '/api/message/sendMsg',
		getMsgList: '/api/message/getMsgList',
		getUserList: '/api/user/getUserList',
		addIcd: '/api/dictIcd/addIcd',
		getIcdList: '/api/dictIcd/getIcdList',
		getStatistics:'/api/exam/getStatistics'
	},
	setRequest(data, url, callback) {
		uni.request({
			url: url,
			data: data,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			success: (res) => {
				console.log(res);
				let result = res.data;
				if ('0' === result.status) {
					callback(e, result);
				} else {
					uni.showToast({
						title: '获取数据失败'
					})
				}
			}
		});
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
				n.text = 'Heart rate';
			} else if ('tw' == p) {
				n.text = 'temperature';
			} else if ('fhl' == p) {
				n.text = 'Vital capacity';
			}
			n.data = e[p];
			v.push(n);
		}
		return v;
	},
	alertFail(e) {

	}
}
