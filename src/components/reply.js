class Reply {
	constructor(replyJSON, questionId) {
		this.id = replyJSON.id;
		this.title = replyJSON.title;
		this.content = replyJSON.content;
		this.replier = replyJSON.replier;
		this.questionId = questionId;
		this.likes = replyJSON.likes;
		this.createdAt = helper.formatDate(replyJSON.created_at);
		console.log(this)
	}

	render() {
		return `<div class="ui blue raised segment" data-replyid='${this.id} data-questionid='${this.questionId}' data-props='${JSON.stringify(this)}' class='reply-element'>
    <h3 class="ui dividing header">
      ${this.title}
      <span class="floated-right"><i data-questionid="${this.questionId}" data-replyid="${this.id}" data-action='delete-reply' class="trash icon"></i></span>
    </h3>
    <p>${this.content}</p>
    <div class="ui divider"></div>
    <span>Posted by <a href="/users/${this.replier.id}">${this.replier.name}</a> on ${this.createdAt}</span> </span><span class="floated-right">${this.likes.length} likes</span> <span class="floated-right"><a href="#">Like</a>
    </div>`
	}
}