import React from 'react'
import { Todo } from '../types/todo'
import { useTodoContext } from '../context/TodoContext'
import { motion } from 'framer-motion'

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodoContext()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
      className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded shadow"
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className={`${todo.completed ? "line-through text-gray-500" : ""}`}>
          {todo.title}
        </span>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full 
            ${todo.priority === "Alta" ? "bg-red-100 text-red-600" :
              todo.priority === "Média" ? "bg-yellow-100 text-yellow-600" :
              "bg-green-100 text-green-600"}
          `}
        >
          {todo.priority}
        </span>
      </div>
      <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-700">
        ❌
      </button>
    </motion.div>
  )
}

export default TodoItem