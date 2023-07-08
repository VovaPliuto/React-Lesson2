import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export const Todos = () => {
  const [todos, setTodos] = useState(() =>
    JSON.parse(localStorage.getItem('todo') ?? [])
  );

  const addTodo = text => {
    const todo = {
      text,
      id: nanoid(),
    };

    setTodos(prevState => [todo, ...prevState]);
  };

  const deleteTodo = id => {
    setTodos(prevState => prevState.filter(todo => id !== todo.id));
  };

  useEffect(() => {
    window.localStorage.setItem('todo', JSON.stringify(todos));
  }, [todos]);
  console.log(todos);

  return (
    <>
      <SearchForm onHandleSearch={addTodo} />
      <Grid>
        {todos.map(({ text, id }, index) => {
          return (
            <GridItem key={id}>
              <Todo
                id={id}
                todo={text}
                counter={index + 1}
                deleteTodo={deleteTodo}
              />
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};
