import React from 'react';
import { useEffect } from 'react';
import './App.css';
import {TodoProvider} from "./contexts"
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {

  const  [todos, setTodos] = React.useState([]);

  //  adding functionality to the existing methods of todos e.g. addTodo(), updatedTodo(), deleteTodo()
  const addTodo = (todo) => {     //  in this state we are adding  the new todo to our list of todos variable
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])    //  in setTodos() we r passing a prev variable to don't delete the previous values of todos & it returns a callback fun, in that we include id(changing dynamic) & rest todo(using spread operator) & also prev values (using spread operator)
  }

  const updatedTodo = (id, todo) => {   //  here we want to update the todo(find by id)  
    setTodos((prev) => prev.map((eachtodo) => (eachtodo.id === id ? todo : eachtodo)))  // in setTodos() we r passing prev variable to catch any elements r their in todo array. To find todo we have looped through map() in map() it will can every single todo's id == existing todo's id if match finds give new todo else return eachtodo
  }

  const deleteTodo = (id) => {
    setTodos((prev) =>  prev.filter((e)=> e.id !== id))      //  remove the element with that specific ID from our array    //  and remove it from our list of todos
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((element) => element.id === id ? {...element, completed: !element.completed} : element))     //  when a user clicks on complete button for a task it will call this function and change    //  when a user clicks on complete button for a task it will be marked as completed will call this function & if id = todo's element  then include all todos & override the completed property
  }


  //  using localstorage of browser

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  


  return (
    <TodoProvider value={ {todos, addTodo, updatedTodo, deleteTodo, toggleComplete} }>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {
                          todos.map((todo) => (
                            <div key={todo.id} className='w-full'>
                              <TodoItem todo={todo}/>
                            </div>
                          ))
                        }
                    </div>
                </div>
      </div>
    </TodoProvider>        
  );
}

export default App;
