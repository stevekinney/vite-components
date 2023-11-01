import { useState, useEffect } from 'react';

const server = 'http://localhost:3000';

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${server}/todos`);
      if (res.ok) {
        const data = await res.json();
        setTodos(data);
      } else {
        setError(`Failed to fetch data: ${res.status} ${res.statusText}`);
      }
    } catch (err) {
      setError(`An error occurred: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createTodo = async (text: string) => {
    const res = await fetch(`${server}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  };

  const updateTodo = async (id: number, updatedFields: Partial<Todo>) => {
    const res = await fetch(`${server}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });
    const updatedTodo = await res.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const deleteTodo = async (id: number) => {
    await fetch(`${server}/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    loading,
    error,
    refetch: fetchData,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};

export default useTodos;
