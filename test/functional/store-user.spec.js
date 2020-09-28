'use strict'

const Factory = use('Factory')
const User = use('App/Models/User')
const { test, trait } = use('Test/Suite')('Store User')

trait('Test/ApiClient')

test('Store a new user and generates a jwt', async ({ assert, client }) => {
  const { username, email, password } = await Factory.model('App/Models/User')
    .make()

  const response = await client.post('/api/store')
    .send({
      username,
      email,
      password
    })
    .end()

  response.assertStatus(200)

  response.assertJSONSubset({
    user: {
      email,
      username
    }
  })

  assert.isDefined(response.body.token)

  await User
    .query()
    .where({ email })
    .firstOrFail()
})


test("Returns an error if user already exists", async ({ assert, client }) => {
  const { username, email, password } = await Factory.model('App/Models/User')
    .create()

  const response = await client.post('/api/store')
  .send({
    username,
    email,
    password
  })
  .end()

  response.assertStatus(422)

  assert.isUndefined(response.body.token)
})
