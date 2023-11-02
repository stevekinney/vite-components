import React, { useState } from 'react';
import Button from './components/button';
import Input from './components/input';
import useTodos from './use-todos';

const Application = () => {
  const { todos, createTodo, updateTodo, deleteTodo } = useTodos();
  const [newTodo, setNewTodo] = useState('');

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodo.trim()) return;
    createTodo(newTodo);
    setNewTodo('');
  };

  return (
    <div className="application">
      <h1>Important Things to Do</h1>
      <form onSubmit={handleNewTodoSubmit}>
        <Input type="text" value={newTodo} onChange={handleNewTodoChange} />
        <Button type="submit">Add Todo</Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => updateTodo(todo.id, { completed: !todo.completed })}
          >
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                deleteTodo(todo.id);
              }}
              dangerous
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Application;
