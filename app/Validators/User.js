'use strict'

class User {
  get validateAll() {
    return true;
  }

  get rules () {
    return {
      username: 'required',
      email: 'required|email|unique:users',
      password: 'required'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response
      .status(422)
      .send(errorMessages)
  }
}

module.exports = User
