class App {
  constructor () {
    const questionId = helper.urlParams("id")
    if (!questionId) {
    	this.questions = new Questions();
    	Session.initBindingsAndEventListeners();
  	} else {
  		Session.adapter = new SessionsAdapter()
  		this.questions = new Questions([questionId])
  	}
  }
}
