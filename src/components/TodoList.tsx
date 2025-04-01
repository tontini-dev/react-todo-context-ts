import React from 'react'
import { useTodoContext } from '../context/TodoContext'
import TodoItem from './TodoItem'

const TodoList = () => {
  const { filteredTodos } = useTodoContext()

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList