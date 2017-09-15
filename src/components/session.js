class Session {

  static initBindingsAndEventListeners () {
    Session.adapter = new SessionsAdapter()
    this.loginForm = document.getElementById("input-container")
    this.emailInput = document.getElementById("user-email-input")
    this.signUpForm = $("#add-user-form")

    this.loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      Session.startSession();
    })

    this.checkLogin();
  }

  static logoutListener () {
    $("#logout").on("click", function (event) {
      if(Session.adapter.getUser()) {
        localStorage.clear()
        window.location.reload()
      } else if (window.location.pathname !== "/index.html") {
        window.location = "/index.html"
      }
    })
    this.renderLoginLogout()
  }

  static renderLoginLogout () {
    if (Session.adapter.getUser()) {
      $("#logout").text("Logout")
    } else {
      $("#logout").text("Login")
    }
  }

  static checkLogin () {
    console.log("in check login")
    if (Session.adapter.getUser()){
      Session.successfulLogin();
    }
  }

  static startSession (userEmail) {
    localStorage.clear()
    if (!userEmail) {
      userEmail = Session.emailInput.value;
    }

    Session.adapter.createSession(userEmail, Session.failedLogin, Session.successfulLogin).then(() => {
      const user = new User(Session.adapter.getUser())
      user.render()
    })
  }

  static failedLogin () {
    const errorDiv = document.createElement("div")
    errorDiv.className = "ui red message"
    errorDiv.id = "messages"
    errorDiv.innerText = "User not found"

    if (Session.loginForm) {
    Session.loginForm.prepend(errorDiv)
  } else if (Session.signUpForm) {
    Session.signUpForm.prepend(errorDiv)
  }
  }

  static successfulLogin (app) {
    $(Session.loginForm.parentElement).addClass("hide-content")
    $("#new-question-container").removeClass("hide-content")
    $("#signup").addClass("hide-content")
  }

  static hideQuestionerTrashButton () {
    if (Session.adapter.getUser() === null) {
      $(".question h3 i").remove()
      return
    }
    const userId = Session.adapter.getUser().id
    const questions = $(".question")

    $.each(questions, (index, question) => {
      const questionerId = JSON.parse(question.dataset.props).questioner.id

      if (questionerId !== userId) {
        $(question).children("h3").children("span").children().remove()
      }
    });
  }
}
