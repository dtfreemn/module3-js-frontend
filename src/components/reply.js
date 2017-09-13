class Reply {
	constructor(replyJSON, questionId) {
		this.id = replyJSON.id;
		this.title = replyJSON.title;
		this.content = replyJSON.content;
		this.replier = replyJSON.replier;
		this.questionId = questionId;
		this.likes = replyJSON.likes
		this.createdAt = helper.formatDate(replyJSON.created_at);
	}

	currentScore() {
		return this.likes.reduce(function(acc, el) { return acc += el.point},0)
	}

	vote(action, target) {
		this.likeAdapter = new LikesAdapter(this.questionId, this.id)
		let point
		if (action === 'up-vote'){
			point = 1
		} else if (action === 'down-vote') {
			point = -1
		}
		//NEED TO FIX THIS
		this.likeAdapter.createLike(point).catch(e => console.log(e)).then(likeJSON => {
			this.likes.push(likeJSON)
			target.querySelector(".likes").innerText = this.currentScore()
		})
		
	}

	render() {
		return `<div class="ui blue raised segment" data-replyid="${this.id}" data-questionid="${this.questionId}" data-props="${JSON.stringify(this)}" class="reply-element">

    <h3 class="ui dividing header">
      ${this.title}
      <span class="floated-right"><i data-questionid="${this.questionId}" data-replyid="${this.id}" data-action='delete-reply' class="trash icon"></i></span>
    </h3>
    <p>${this.content}</p>
    <div class="ui divider"></div>
    <span>Posted by <a href="/users/${this.replier.id}">${this.replier.name}</a> on ${this.createdAt}</span>

		<div class="ui bottom right attached label voting" style="margin-top: 20px; text-align:center">
		<a href="#"><i class="arrow up icon" data-action="up-vote" style="color:green"></i></a>
		
		<span class="likes" data-replyid="${this.id}">${this.currentScore()}</span> points &nbsp;
		
		<a href="#"><i class="arrow down icon" data-action="down-vote" style="color: #CC0000"></i></a>
		</div>
    </div>`
	}
}
