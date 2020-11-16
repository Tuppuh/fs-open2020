import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

const user = {
  user: {
      username: "Loser4",
      name: "Tuomo",
      id: "5f8c9712cfe6781a7c5ca96e"
  } 
}

const blog = {
  likes: 2,
  title: "TuomoBlogi",
  author: "TuomoAuthor",
  url: "www.tuomo.fi",
  user: user,
  id: "5f95edb3c290100ba4eac7aa"
}

test('renders default view', () => {
  const component = render(
    <Blog blog={blog} updateBlog={jest.fn()} user={user} deleteBlog={jest.fn()}/>
  )

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveValue(blog.likes)

})

test('renders detailed view', () => {
  const component = render(
    <Blog blog={blog} updateBlog={jest.fn()} user={user} deleteBlog={jest.fn()}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  component.debug()
  
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(blog.likes)
  
})

test('pressing like twice calls update function twice', () => {
  const mockUpdateHandler = jest.fn()
  const component = render(
    <Blog blog={blog} updateBlog={mockUpdateHandler} user={user} deleteBlog={jest.fn()}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockUpdateHandler.mock.calls).toHaveLength(2)
})
