class Questions {
  constructor(questionsId = []) {
    this.adapter = new QuestionsAdapter()
    this.questions = []
    this.initContentBindingsAndEventListeners()

    if (questionsId.length === 0 ){
      this.initFormBindingsAndEventListeners()
      this.fetchAndLoadQuestions()
    } else {
      questionsId.map(id => this.fetchSingleQuestion(id))
    }
  }

  initFormBindingsAndEventListeners() {
    this.questionsForm = document.getElementById('new-question-form')
    this.questionTitle = document.getElementById('new-question-title')
    this.questionContent = document.getElementById('new-question-content')
    this.questionsForm.addEventListener('submit', this.handleAddQuestion.bind(this))
  }

  initContentBindingsAndEventListeners() {
    this.questionsNode = document.getElementById('questions-container')
    this.questionsNode.addEventListener('click', this.handleDeleteQuestion.bind(this))
  }

  fetchSingleQuestion(id) {
    return this.adapter.getQuestionById(id)
    .then(question => this.questions.push( new Question(question)))
    .then(() => {this.render.call(this); return this})
    .then((questions) => questions.questions.map(question => question.replies.render()))
  }

  fetchAndLoadQuestions() {
    this.adapter.getQuestions()
    .then(questionsJSON => questionsJSON.forEach(question => this.questions.push(new Question(question))))
    .then(this.render.bind(this))
    .catch((e) =>{console.log(e); alert('The server does not appear to be running')})
  }

  handleAddQuestion() {
    event.preventDefault()
    const body = {
      questioner_id: Session.adapter.getUser().id,
      title: this.questionTitle.value,
      content: this.questionContent.value
    }
    this.adapter.createQuestion(body)
    .then((questionJSON) => this.questions.unshift(new Question(questionJSON)))
    .then(this.render.bind(this))
    .then(() => this.questionsForm.reset())
  }

  handleDeleteQuestion() {
    if (event.target.dataset.action === 'delete-question' && event.target.parentElement.classList.contains("floated-right")) {
      const questionId = parseInt(event.target.dataset.questionid)
      this.adapter.deleteQuestion(questionId)
      .then(() => this.removeDeletedQuestion(questionId))
    }
  }

  removeDeletedQuestion(questionId) {
    this.questions = this.questions.filter(question => question.id !== questionId)
    this.render()
  }

  questionsHTML() {
    return this.questions.map( question => question.render() ).join('')
  }

  render() {
    this.questionsNode.innerHTML = this.questionsHTML()
  }
}
