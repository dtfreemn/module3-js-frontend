class Questions {
  constructor() {
    this.questions = []
    this.initBindingsAndEventListeners()
    this.adapter = new QuestionsAdapter()
    this.fetchAndLoadQuestions()
  }

  initBindingsAndEventListeners() {
    this.questionsForm = document.getElementById('new-question-form')
    this.questionTitle = document.getElementById('new-question-title')
    this.questionContent = document.getElementById('new-question-content')
    this.questionsNode = document.getElementById('questions-container')
    this.questionsForm.addEventListener('submit',this.handleAddQuestion.bind(this))
    this.questionsNode.addEventListener('click',this.handleDeleteQuestion.bind(this))
  }

  fetchAndLoadQuestions() {
    this.adapter.getQuestions()
    .then( questionsJSON => questionsJSON.forEach( question => this.questions.push( new Question(question) )))
      .then( this.render.bind(this) )
      .catch( () => alert('The server does not appear to be running') )
  }

  handleAddQuestion() {
    event.preventDefault()
    const body = {
      questioner_id: 1,
      title: this.questionTitle.value,
      content: this.questionContent.value
    }
    this.adapter.createQuestion(body)
    .then( (questionJSON) => this.questions.unshift(new Question(questionJSON)) )
    .then(  this.render.bind(this) )
    .then( () => this.questionsForm.reset() )
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
    console.log(questionId, this.questions);
    this.render()
  }

  questionsHTML() {
    return this.questions.map( question => question.render() ).join('')
  }

  render() {
    this.questionsNode.innerHTML = this.questionsHTML()
  }
}
