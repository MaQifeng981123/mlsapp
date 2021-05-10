//const language = "en";
export default {
	language: "en",
	getText() {
		if (this.language == 'en') {
			return {
				loginIdInput: "please enter user name!",
				passwordInput: "please enter password"
			}
		} else {
			return {
				loginIdInput: "please enter user name!",
				passwordInput: "please enter password"
			}
		}
	}
}
