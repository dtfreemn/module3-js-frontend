class QuestionsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/questions'
  }

  getQuestions() {
    return fetch(this.baseUrl).then(response => response.json())
  }

  deleteQuestion(questionId) {
    const deleteUrl = `${this.baseUrl}/${questionId}`
    const questionDeleteParams = {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    }
    return fetch(deleteUrl, questionDeleteParams).then(response => response.json())
  }

  createQuestion(body) {
    const questionCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(body)
    }
    return fetch(this.baseUrl, questionCreateParams).then(resp => resp.json())
  }

}
