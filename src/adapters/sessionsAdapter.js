class SessionsAdapter {
	constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/sessions'
  }

  createSession(userEmail, rejectCallback, acceptCallback) {
  	return fetch(this.baseUrl, {
  		method: 'post',
  		body: JSON.stringify({email: userEmail}),
  		headers: {
        'Content-Type':'application/json'
      }
  	}).then(function(resp) {
  		if (resp.status === 404) {
  			throw 'error'
  		}	else {
  			acceptCallback(app)
  		}
  		return resp.json()
  	}).catch((e) => rejectCallback()).then(json => this.storeUser(json))
  }

  storeUser(json) {
		if (json) {
			localStorage.setItem('user', JSON.stringify(json))
			Session.renderLoginLogout()
		}
  }

  getUser() {
  	return JSON.parse(localStorage.getItem('user'))
  }

}
