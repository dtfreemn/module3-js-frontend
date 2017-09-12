class Questions {
  constructor() {
    this.questions = []
    this.initBindingsAndEventListeners()
    this.adapter = new QuestionsAdapter()
    this.fetchAndLoadQuestions()
  }

  initBindingsAndEventListeners() {
    this.questionsForm = document.getElementById('new-question-form')
    this.questionInput = document.getElementById('new-question-content')
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
    const body = {content: this.questionInput.value}
    this.adapter.createQuestion(body)
    .then( (questionJSON) => this.questions.push(new Question(questionJSON)) )
    .then(  this.render.bind(this) )
    .then( () => this.questionInput.value = '' )
  }

  handleDeleteQuestion() {
    if (event.target.dataset.action === 'delete-question' && event.target.parentElement.classList.contains("question-element")) {
      const questionId = event.target.parentElement.dataset.questionid
      this.adapter.deleteQuestion(questionId)
      .then( resp => this.removeDeletedQuestion(resp) )
    }
  }

  removeDeletedQuestion(deleteResponse) {
    this.questions = this.questions.filter( question => question.id !== deleteResponse.questionId )
    this.render()
  }

  questionsHTML() {
    return this.questions.map( question => question.render() ).join('')
  }

  render() {
    this.questionsNode.innerHTML = `<ul>${this.questionsHTML()}</ul>`
  }
}
