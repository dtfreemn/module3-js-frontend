class RepliesAdapter {

	constructor(questionId) {
		this.baseUrl = `http://localhost:3000/api/v1/questions/${questionId}/replies`
	}

	createReply(body) {
		const createReplyParams = {
			method: 'post',
			headers: {
        'Content-Type':'application/json'
      },
			body: JSON.stringify(body)
		}
		return fetch(this.baseUrl, createReplyParams).then(resp => resp.json())
	}

	deleteReply(replyId) {
		const deleteUrl = `${this.baseUrl}/${replyId}`
    const replyDeleteParams = {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    }
    return fetch(deleteUrl, replyDeleteParams).then(response => response.json())
	}



}