'use strict'

const Factory = use('Factory')
const User = use('App/Models/User')
const { test, trait } = use('Test/Suite')('User/Login')

trait('Test/ApiClient')

test('a JWT is generated for a logged in user',  async  ({ assert, client })  =>  {
  const  { username, email, password }  =  await Factory
    .model('App/Models/User')
    .make()

  await User
    .create({ username, email, password })

  const response =  await client
    .post('api/login')
    .send({ email, password })
    .end()

  response.assertStatus(200)

  assert.isDefined(response.body.token.type)
  assert.isDefined(response.body.token.token)
})
