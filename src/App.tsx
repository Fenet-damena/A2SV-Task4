import React, { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

type Filter = 'all' | 'active' | 'completed' | 'overdue';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, dueDate: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      dueDate,
    };
    setTodos([newTodo, ...todos]);
  };

  const updateTodo = (id: string, updatedTitle: string, updatedDueDate: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: updatedTitle, dueDate: updatedDueDate } : todo
    ));
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <p>Stay organized and get things done</p>

      <TodoInput onAdd={addTodo} />

      {todos.length === 0 && (
        <p style={{ textAlign: 'center', margin: '2rem', color: '#aaa' }}>
          No tasks added
        </p>
      )}

      <TodoList
        todos={todos}
        filter={filter}
        onUpdate={updateTodo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <div className="filters" style={{ marginTop: '2rem' }}>
        {['all', 'active', 'completed', 'overdue'].map(f => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f as Filter)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <p>{todos.filter(t => t.completed).length} of {todos.length} tasks completed</p>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
