import React, { useState } from 'react';
import { Todo } from '../App';
import { toast } from 'react-toastify';

interface Props {
  todo: Todo;
  onUpdate: (id: string, title: string, dueDate: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onUpdate, onToggle, onDelete }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(todo.title);
  const [due, setDue] = useState(todo.dueDate);

  const save = () => {
    onUpdate(todo.id, value, due);
    toast.success('Task updated!');
    setEditMode(false);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {editMode ? (
        <>
          <input value={value} onChange={e => setValue(e.target.value)} />
          <input type="date" value={due} onChange={e => setDue(e.target.value)} />
          <button onClick={save}>💾</button>
        </>
      ) : (
        <>
          <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
          <span className="due-date">Due: {todo.dueDate}</span>
          <button onClick={() => setEditMode(true)}>✏️</button>
        </>
      )}
      <button onClick={() => onDelete(todo.id)}>🗑️</button>
    </div>
  );
};

export default TodoItem;
