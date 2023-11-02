import React, { useState } from 'react';
import Button from './components/button';
import Input from './components/input';

const Application = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        text: newTodo,
        completed: false,
      },
    ]);
    setNewTodo('');
  };

  const handleTodoClick = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleTodoDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
          <li key={todo.id} onClick={() => handleTodoClick(todo.id)}>
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
                handleTodoDelete(todo.id);
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
