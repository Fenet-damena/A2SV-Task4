import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  onAdd: (title: string, dueDate: string) => void;
}

const TodoInput = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const submit = () => {
    if (!title.trim() || !dueDate) {
      toast.error('Please enter both task name and due date');
      return;
    }

    onAdd(title, dueDate);
    setTitle('');
    setDueDate('');
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={submit}>+ Add Task</button>
      </div>
    </div>
  );
};

export default TodoInput;
