import React from 'react';
import { useState } from 'react';
import { useGetTodosQuery, useAddTodoMutation } from '@/lib/api';
import { useRouter } from 'next/router';
import { Todo } from '@/utils/types';
import styles from '@/styles/Home.module.css';

interface TodoPageProps {
  initialTodos: Todo[];
}

export const getStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const initialTodos = await response.json();

  return {
    props: {
      initialTodos,
    },
    revalidate: 60,
  };
};

const TodoPage: React.FC<TodoPageProps> = ({ initialTodos }) => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const { data: todos } = useGetTodosQuery(
    { _start: (page - 1) * 10, _limit: 10 },
    {
      initialData: initialTodos,
    } as any
  );
  const [newTodo, setNewTodo] = useState('');

  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return;

    await addTodo({ title: newTodo, completed: false, userId: 1 });
    setNewTodo('');
    router.replace(router.asPath);
  };

  if (!todos) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Todos</h1>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleAddTodo} disabled={isLoading} className={styles.buttonadd}>
            {isLoading ? (<>&#10003;</>) : '+'}
          </button>
        </div>
        <ul className={styles.ul}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.li}>{todo.title}</li>
          ))}
        </ul>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => router.push({ query: { page: page - 1 } })}
            disabled={page === 1}
            className={styles.button}
          >
            &#60;
          </button>
          <button onClick={() => router.push({ query: { page: page + 1 } })} className={styles.button}>
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
