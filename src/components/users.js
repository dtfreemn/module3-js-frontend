class Users {
  constructor () {
    this.adapter = new UsersAdapter()
    this.initBindingsAndEventListeners()
    this.users = []
    Session.adapter = new SessionsAdapter()
  }

  initBindingsAndEventListeners () {
    this.signUpForm = $("#add-user-form")
    this.signUpContainer = $("#signup")
    this.userInformation = document.getElementById("user-information")

    this.signUpForm.on("submit", function (event) {
      event.preventDefault()
      this.addUserNameInput = document.getElementById("add-user-name")
      this.addUserEmailInput = document.getElementById("add-user-email")

      this.handleCreateUser(this.addUserNameInput.value, this.addUserEmailInput.value)
    }.bind(this))
  }

  handleCreateUser (name, email) {
    this.adapter.createUser({name: name, email: email}).then(userJSON => {
      Session.startSession(email)
      this.afterCreateActions.call(this, userJSON)
    })
  }

  afterCreateActions (userJSON) {
    this.users.push(new User(userJSON))
    this.userInformation.innerHTML = this.users[0].render()
    this.signUpContainer.addClass("hide-content")
  }
}
