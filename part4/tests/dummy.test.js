const listHelper = require('../utils/list_helper')

test('dummy returns one', async () => {
  const blogs = []

  const result = await listHelper.dummy(blogs)
  expect(result).toBe(1)
})