class LikesAdapter {

	constructor(questionId, replyId) {
		this.questionId = questionId
		this.replyId = replyId
		this.baseUrl = `http://localhost:3000/api/v1/questions/${questionId}/replies/${replyId}/likes`
	}

	createLike(point) {
		return fetch(this.baseUrl, {
			method: 'post',
			headers: {
        'Content-Type':'application/json'
      },
			body: JSON.stringify({
				user_id: Session.adapter.getUser().id,
				reply_id: this.replyId,
				point: point
			})
		}).then(resp => {
				if (resp.status === 403) {
					throw 'already voted'
				} else {
				return {
					status: resp.status,
					json: resp.json()
				}
			}
		})
	}
}
