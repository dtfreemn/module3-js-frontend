class Question {
  constructor(questionJSON) {
    this.id = questionJSON.id;
    this.title = questionJSON.title;
    this.content = questionJSON.content;
    this.questioner = questionJSON.questioner;
    this.replies = questionJSON.replies;
    this.createdAt = helper.formatDate(questionJSON.created_at);
  }

  render() {
    return `<div class="ui raised segment" data-questionid='${this.id}' data-props='${JSON.stringify(this)}' class='question-element'>
    <h3 class="ui dividing header">
      <a href="/questions/${this.id}" title="${this.title}">${this.title}</a>
      <span class="floated-right"><i data-action='delete-question' class="trash icon"></i></span>
    </h3>
    <p>${this.content}</p>
    <div class="ui divider"></div>
    <span>Asked by <a href="/users/${this.questioner.id}">${this.questioner.name}</a> on ${this.createdAt}</span> <span class="floated-right">${this.replies.length} replies</span>
    </div>`
  }
}
