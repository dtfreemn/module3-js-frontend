class UsersAdapter {
  constructor () {
    this.baseUrl = `http://localhost:3000/api/v1/users`
  }

  createUser (body) {
    const createUserParams = {
			method: 'post',
			headers: {
        'Content-Type':'application/json'
      },
			body: JSON.stringify(body)
		}
		return fetch(this.baseUrl, createUserParams).then(resp => resp.json())
  }
}
