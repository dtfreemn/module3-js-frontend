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

		if (this.replyForm){
			this.replyForm.addEventListener('submit', this.handleAddReply.bind(this))
		}

		if (this.repliesContainer){
			this.repliesContainer.addEventListener('click', (event) => {
				event.preventDefault()
				const action = event.target.dataset.action

				if (action === 'delete-reply') {
					this.handleDeleteReply.call(this, event)
				} else if (['up-vote', 'down-vote'].includes(action)) {
					const replyDiv = event.target.parentElement.parentElement.parentElement
					const replyId = replyDiv.dataset.replyid
					const reply = this.replies.find(reply => reply.id === parseInt(replyId))
					reply.vote(action, replyDiv)
				}
			})
		}
	}

	handleDeleteReply(event) {
		if (event.target.dataset.action === 'delete-reply') {
			const replyId = parseInt(event.target.dataset.replyid)
			this.adapter.deleteReply(replyId)
			.then(() => this.removeDeletedReply(event, replyId))
		}
	}

	removeDeletedReply(event, replyId) {
		this.replies = this.replies.filter(reply => reply.id !== replyId)
    this.render()
    this.updateReplyCount();
	}

	handleAddReply(event) {
		event.preventDefault()
		const body = {
			question_id: this.questionId,
			title: this.replyTitle.value,
			content: this.replyContent.value,
			replier_id: Session.adapter.getUser().id
		}
		this.adapter.createReply(body)
		.then(replyJSON => this.replies.unshift(new Reply(replyJSON, this.questionId)))
		.then(this.updatePage.bind(this))
	}

	updateReplyCount() {
		this.repliesCount = document.querySelector('.reply-count')
		this.repliesCount.innerText = `${this.replies.length} replies`
	}

	updatePage() {
		this.render();
		this.updateReplyCount();
		this.replyForm.reset();
	}

	render() {
		if (this.replies.length === 0) {
			this.repliesContainer.innerHTML = "<p>No replies at this moment.</p>"
			return
		}
		this.repliesContainer.innerHTML = this.replies.map(reply => reply.render()).join('')
	}
}
