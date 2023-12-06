import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Note from './Note'

test('renders content', () => {
  const noteContent = 'Component testing is done with react-testing-library'
  const note = {
    content: noteContent,
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText(noteContent)

  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const noteContent = 'Component testing is done with react-testing-library'
  const note = {
    content: noteContent,
    important: true
  }
  const mockHandler = jest.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})