import React from 'react';

interface FiltersProps {
    setFilter: (filter: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ setFilter }) => {
    return (
        <div>
            <button onClick={() => setFilter('all')}>All</button>
            <button onClick={() => setFilter('active')}>Active</button>
            <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
    );
};

export default Filters;