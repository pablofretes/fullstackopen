import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('blog tests', () => {
  const testBlog = {
    user: { username: 'testUsername' },
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 0,
  }

  test('blog displays title and author by default, and doesnt display URL or likes', () => {
    const mockHandler = jest.fn()
    const component = render (
      <Blog blog={testBlog} toggleVisibility={mockHandler}/>
    )

    expect(component.container).toHaveTextContent(testBlog.title)
    expect(component.container).toHaveTextContent(testBlog.author)
    expect(component.container).not.toHaveTextContent(testBlog.url)
    expect(component.container).not.toHaveTextContent(testBlog.likes)
  })

  test('blog displays url and likes when button is clicked', () => {
    const mockHandler = jest.fn()
    const component = render (
      <Blog blog={testBlog} toggleVisibility={mockHandler}/>
    )
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(testBlog.likes)
    expect(component.container).toHaveTextContent(testBlog.url)
  })

  test('when button like is clicked twice the eventHandler is called twice', async () => {
    const mockHandler = jest.fn()
    const component = render (
      <Blog blog={testBlog} likeHandler={mockHandler}/>
    )
    const viewButton = component.getByText('view')
    await fireEvent.click(viewButton)
    const button = component.container.querySelector('.like-button')
    await fireEvent.click(button)
    await fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})