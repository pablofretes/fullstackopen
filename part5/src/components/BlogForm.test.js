import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BlogForm from './BlogForm'

test('title, author and url exist', () => {
  const createBlog = jest.fn()
  const component = render (
    <BlogForm createBlog={createBlog}/>
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeDefined()
})
