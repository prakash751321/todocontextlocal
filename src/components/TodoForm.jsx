import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
      e.preventDefault()

      if (!todo) return // if condition true return exisiting todos

      addTodo({ todo, completed: false})
      setTodo("")   // reset the input field after adding a new todo
    }

  return (
      <form onSubmit={add}  className="flex">
          <input
              type="text"
              placeholder="Write Todo..."
            //   className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-black/20 py-1.5 "
              className='w-full border border-black/10 rounded-lg px-4 outline-none'
              style={{ color: "black" }}
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" 
          // className="rounded-r-lg px-3 py-1 bg-green-600 shrink-0"
            style={{ borderRadius: '0.3rem', backgroundColor: "green",  fontWeight: "bold", flexShrink: '0', paddingLeft: '0.75rem', paddingRight: '0.75rem' , paddingTop: '0.25rem', paddingBottom: '0.25rem'}}
          >
              Add
          </button>
      </form>
  );
}

export default TodoForm;