import React, { useState } from 'react';

interface AddTodoProps {
    addTodo: (task: string, dueDate: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task && dueDate) {
            addTodo(task, dueDate);
            setTask('');
            setDueDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={e => setTask(e.target.value)}
                placeholder="Add a new task..."
            />
            <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTodo;