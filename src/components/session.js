class Session {

	static initBindingsAndEventListeners() {
		this.loginForm = document.getElementById('input-container')
		this.emailInput = document.getElementById('user-email-input')
		this.loginForm.addEventListener('submit', function(event) {
			event.preventDefault();
			Session.adapter = new SessionsAdapter()
			Session.startSession(event)
		})
	}

	static startSession(event) {
		localStorage.clear()
		const userEmail = Session.emailInput.value;
		Session.adapter.createSession(userEmail, Session.failedLogin, Session.successfulLogin)
	}

	static failedLogin() {
		const errorDiv = document.createElement('div')
		errorDiv.className = 'ui red message'
		errorDiv.id = 'messages'
		errorDiv.innerText = 'User not found'
		Session.loginForm.prepend(errorDiv)
	}

	static successfulLogin() {
		$(Session.loginForm.parentElement).addClass('hide-content')
		$('#new-question-container').removeClass('hide-content')
	}
}