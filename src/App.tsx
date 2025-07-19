// src/App.tsx
import React, { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

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

  // ✅ Load from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    console.log('Loaded from localStorage:', stored);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && todos.length === 0) {
          setTodos(parsed);
        }
      } catch (error) {
        console.error("Invalid localStorage data:", error);
      }
    }
  }, []);

  // ✅ Save to localStorage every time `todos` change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Saved to localStorage:', todos);
  }, [todos]);

  const addTodo = (title: string, dueDate: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      dueDate,
    };
    console.log('Adding new todo:', newTodo);
    setTodos([newTodo, ...todos]);
  };

  const updateTodo = (id: string, updatedTitle: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: updatedTitle } : todo
    ));
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Filtering
  const now = new Date();
  const filteredTodos = todos.filter(todo => {
    const due = new Date(todo.dueDate);
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'overdue') return !todo.completed && due < now;
    return true;
  });

  const getEmptyMessage = () => {
    if (todos.length === 0) return 'No task added';
    if (filter === 'completed') return 'No task is completed';
    if (filter === 'active') return 'No active task';
    if (filter === 'overdue') return 'No task is overdue';
    return null;
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <p>Stay organized and get things done</p>

      <TodoInput onAdd={addTodo} />

      {filteredTodos.length === 0 && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#222',
          borderRadius: '10px',
          color: '#ccc',
          fontSize: '1.1rem'
        }}>
          {getEmptyMessage()}
        </div>
      )}

      <TodoList
        todos={filteredTodos}
        filter={filter}
        onUpdate={updateTodo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <div className="filters" style={{ marginTop: '30px', marginBottom: '30px' }}>
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
    </div>
  );
};

export default App;
