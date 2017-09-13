class Replies {

	constructor(repliesJSON, questionId) {
		this.questionId = questionId
		this.adapter = new RepliesAdapter(this.questionId)
		this.replies = repliesJSON.map(reply => new Reply(reply, this.questionId))
		this.initBindingsAndEventListeners()
	}

	initBindingsAndEventListeners() {
		this.repliesContainer = document.getElementById('replies-container')
		this.replyForm = document.getElementById('add-reply')
		this.replyTitle = document.getElementById('add-reply-title')
		this.replyContent = document.getElementById('add-reply-content')
		this.replyForm.addEventListener('submit', this.handleAddReply.bind(this))
	}

	handleAddReply(event) {
		event.preventDefault()
		const body = {
			question_id: this.questionId,
			title: this.replyTitle.value,
			content: this.replyContent.value,
			replier_id: Session.adapter.getUser().id
		}
		this.adapter.createReply(body).then(replyJSON => this.replies.unshift(new Reply(replyJSON, this.questionId))).then(this.updatePage.bind(this))
	}

	updatePage() {
		this.render();
		this.repliesCount = document.querySelector('.reply-count')
		this.repliesCount.innerText = `${this.replies.length} replies`
		this.replyForm.reset()
	}

	render() {
		this.repliesContainer.innerHTML = this.replies.map(reply => reply.render()).join('')
	}


}