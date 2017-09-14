class User {
  constructor (userJSON) {
    this.id = userJSON.id
    this.name = userJSON.name
    this.email = userJSON.email
  }

  render (target) {
    let html = ""
    if (!target) {
      target = document.getElementById("user-information")
      html = `<div class="ui black segment" data-userid="${this.id}">
                  <h3 class="ui dividing header">User Information</h3>
                  <p id="user-name">${this.name}</p>
                  <p id="user-email">${this.email}</p>
                  <ul id="user-questions">
                  </ul>
                </div>`
    }

    target.innerHTML = html
    return html
  }
}
