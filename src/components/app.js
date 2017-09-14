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
    this.users = new Users()

    if (Session.adapter.getUser()) {
      this.users.users.push(new User(Session.adapter.getUser()))
      this.users.users[0].render()
    }
  }
}
