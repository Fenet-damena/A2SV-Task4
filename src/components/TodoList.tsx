import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../App';

type Filter = 'all' | 'active' | 'completed' | 'overdue';

interface Props {
  todos: Todo[];
  filter: Filter;
  onUpdate: (id: string, title: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, filter, onUpdate, onToggle, onDelete }: Props) => {
  const now = new Date();
  const filtered = todos.filter(todo => {
    const due = new Date(todo.dueDate);
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'overdue') return !todo.completed && due < now;
    return true;
  });

  return (
    <div className="todo-list">
      {filtered.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
