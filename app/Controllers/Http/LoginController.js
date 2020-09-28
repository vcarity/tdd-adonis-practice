'use strict'

class LoginController {
  async generate ({ auth, request, response}) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return response.ok({ token })
  }
}

module.exports = LoginController
