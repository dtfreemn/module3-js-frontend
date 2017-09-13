class Reply {
	constructor(replyJSON, questionId) {
		this.id = replyJSON.id;
		this.title = replyJSON.title;
		this.content = replyJSON.content;
		this.replier = replyJSON.replier;
		this.questionId = questionId;
		this.likes = replyJSON.likes;
		this.createdAt = helper.formatDate(replyJSON.created_at);
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

		<div class="ui bottom right attached label" style="margin-top: 20px; text-align:center">
		<i class="arrow up icon" style="color:green"></i> <span class="likes" data-replyid="${this.id}">${this.likes.length} points &nbsp;</span>
		<i class="arrow down icon" style="color: #CC0000"></i></div>
    </div>`
	}
}
