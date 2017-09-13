class App {
  constructor() {
    const questionId = helper.urlParams('id')
    if (!questionId) {
    	this.questions = new Questions();
    	Session.initBindingsAndEventListeners();
  	} else {
  		this.questions = new Questions([questionId])
  	}
  }
}
