import { Todo } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], { _start?: number; _limit?: number }>({
            query: ({ _start = 0, _limit = 10 }) => `todos?_start=${_start}&_limit=${_limit}`,
        }),
        addTodo: builder.mutation<Todo, Partial<Todo>>({
            query: (newTodo) => ({
                url: 'todos',
                method: 'POST',
                body: newTodo,
            }),
        }),
    }),
});

export const { useGetTodosQuery, useAddTodoMutation } = api;