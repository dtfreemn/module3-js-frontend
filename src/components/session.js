class Session {

  static initBindingsAndEventListeners () {
    Session.adapter = new SessionsAdapter()
    this.loginForm = document.getElementById("input-container")
    this.emailInput = document.getElementById("user-email-input")
    this.logoutLink = $("#logout")

    this.loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      Session.startSession(event);
    })

    this.checkLogin();
  }

  static logoutListener () {

    this.logoutLink.on("click", function (event) {
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
    console.log(Session.adapter.getUser())
    if (Session.adapter.getUser()) {
      this.logoutLink.text(`Logout`)
    } else {
      this.logoutLink.text(`Login`)
    }
  }

  static checkLogin () {
    if (Session.adapter.getUser()){
      Session.successfulLogin();
    }
  }

  static startSession (event) {
    localStorage.clear()
    const userEmail = Session.emailInput.value;

    Session.adapter.createSession(userEmail, Session.failedLogin, Session.successfulLogin)
  }

  static failedLogin () {
    const errorDiv = document.createElement("div")
    errorDiv.className = "ui red message"
    errorDiv.id = "messages"
    errorDiv.innerText = "User not found"

    Session.loginForm.prepend(errorDiv)
  }

  static successfulLogin () {
    $(Session.loginForm.parentElement).addClass("hide-content")
    $("#new-question-container").removeClass("hide-content")
  }
}
