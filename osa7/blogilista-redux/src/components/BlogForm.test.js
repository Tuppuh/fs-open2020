import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

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

test('create blog callback called correctly', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlog}/>
  )
  const titleInput = component.container.querySelector('.titleinput')
  const urlInput = component.container.querySelector('.urlinput')
  const authorInput = component.container.querySelector('.authorinput')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { 
    target: { value: blog.title } 
  })
  fireEvent.change(authorInput, { 
    target: { value: blog.author } 
  })
  fireEvent.change(urlInput, { 
    target: { value: blog.url } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
})