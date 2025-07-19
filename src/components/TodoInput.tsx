import React, { useState } from 'react';

interface Props {
  onAdd: (title: string, dueDate: string) => void;
}

const TodoInput = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (!title.trim() || !dueDate) {
      setError('Please enter both task and due date.');
      setTimeout(() => setError(''), 3000);
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
      {error && <p style={{ color: 'tomato', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default TodoInput;
