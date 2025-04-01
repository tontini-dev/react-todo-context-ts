import React from 'react'
import { useTodoContext } from '../context/TodoContext'

const Header = () => {
  const { setFilter, filter, darkMode, toggleTheme } = useTodoContext()

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h1 className="text-3xl font-bold mb-4 sm:mb-0">To-Do List</h1>
      <div className="flex gap-2 items-center">
        {["all", "completed", "pending"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as any)}
            className={`px-3 py-1 rounded ${
              filter === type ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {type[0].toUpperCase() + type.slice(1)}
          </button>
        ))}
        <button
          onClick={toggleTheme}
          className="ml-4 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  )
}

export default Header