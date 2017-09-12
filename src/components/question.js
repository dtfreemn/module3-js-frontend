class Question {
  constructor(questionJSON) {
    this.content = questionJSON.content
    this.id = questionJSON.id
  }

  render() {
    return `<li data-questionid='${this.id}' data-props='${JSON.stringify(this)}' class='question-element'>${this.content} <i data-action='delete-question' class="em em-scream_cat"></i></li>`
  }
}
