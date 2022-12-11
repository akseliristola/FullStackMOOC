import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blogi={
    title: 'mikan blogi',
    author: 'sadfaaaaaa',
    url: 'sdfs',
    likes: 0 }
  render(<Blog blog={blogi}/>)
  const element = screen.getByText('mikan blogi')
  expect(element).toBeDefined()
})

test('presses view button',async() => {
  const testuser={
    name:'kalle',
    username:'kalle22',
    password:'63780a8fd37d871c716fa1b1' }
  const blogi={
    title: 'mikan blogi',
    author: 'kari',
    url: '1234',
    user: { username: 'aksu22' },
    likes: 22 }
  render(<Blog blog={blogi} user={testuser}/>)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)


  expect(document.querySelector('.kaikki')).toHaveTextContent('mikan blogi')
  expect(document.querySelector('.kaikki')).toHaveTextContent('kari')
  expect(document.querySelector('.kaikki')).toHaveTextContent(22)
  expect(document.querySelector('.kaikki')).toHaveTextContent('1234')
})


test('when liked twice eventlistener gets called twice',async() => {
  const testuser={
    name:'kalle',
    username:'kalle22',
    password:'63780a8fd37d871c716fa1b1' }
  const blogi={
    title: 'mikan blogi',
    author: 'kari',
    url: '1234',
    user: { username: 'aksu22' },
    likes: 22 }

  render(<Blog blog={blogi} user={testuser}/>)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likebutton=document.querySelector('.likebutton')
  expect(document.querySelector('.likediv')).toHaveTextContent(22)
  await user.click(likebutton)
  await user.click(likebutton)
  expect(document.querySelector('.likediv')).toHaveTextContent(24)
})
