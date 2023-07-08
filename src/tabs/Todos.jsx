import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  addTodo = text => {
    const todo = {
      text,
      id: nanoid(),
    };

    this.setState(prevState => ({ todos: [todo, ...prevState.todos] }));
  };

  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => id !== todo.id),
    }));
  };

  componentDidMount() {
    const todo = window.localStorage.getItem('todo');
    if (todo) {
      this.setState({ todos: JSON.parse(todo) || [] });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.todos !== this.state.todos) {
      window.localStorage.setItem('todo', JSON.stringify(this.state.todos));
    }
  }
  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onHandleSearch={this.addTodo} />
        <Grid>
          {todos.map(({ text, id }, index) => {
            return (
              <GridItem key={id}>
                <Todo
                  id={id}
                  todo={text}
                  counter={index + 1}
                  deleteTodo={this.deleteTodo}
                />
              </GridItem>
            );
          })}
        </Grid>
      </>
    );
  }
}
