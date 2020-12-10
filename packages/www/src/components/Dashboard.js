import React, { useContext, useReducer, useRef } from 'react';
import { Flex, Container, NavLink, Input, Button, Label, Checkbox, Heading } from 'theme-ui'
import { Router, Link } from "@reach/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { IdentityContext } from '../../identity-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
       id
    }   
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
        text
        done
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

const DELETE_TODO = gql`
    mutation DeleteTodo($id:ID!) {
      deleteTodo(id:$id) {
          text
    }
  }
`;


const todosReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [{ done: false, value: action.payload }, ...state];
    case "toggleTodoDone":
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value
      };
      return newState;
  }
};


export default () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  const [todos, dispatch] = useReducer(todosReducer, []);
  const inputRef = useRef();
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>          
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>         
          Dashboard
        </NavLink>

        {user && (
          <NavLink
            href="#!"
            p={2}
            onClick={() => {
              netlifyIdentity.logout();
            }}
          >
            Log out {user.user_metadata.full_name}
          </NavLink>
        )}          
      </Flex>
      
        <Flex sx={{margin:"auto"}}>
          <Heading as="h1" sx={{margin:"auto",color:"white",fontFamily:"system-ui"}} p={5}>
            Wellcome to JAMstack Serverless Todo App
          </Heading>
        </Flex>
       
      <Flex
        as="form"
        onSubmit={async (e) => {
          e.preventDefault();
          await addTodo({ variables: { text: inputRef.current.value } });
          inputRef.current.value = "";
          await refetch();
        }}
      >
        <Label sx={{ display: "flex" }}>
          <span> Add&nbsp;Todo </span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Button sx={{ marginLeft: 1 }}> Submit </Button>
      </Flex>

      <Flex sx={{ flexDirection: "column" }}>
        {loading ? <div>loading...</div> : null}
        {error ? <div>{error.message}</div> : null}

        {!loading && !error && (
          <ul sx={{ listStyleType: "none" }}>
            {data.todos.map((todo) => (
              <Flex
                key={todo.id}
                as="li"
                onClick={async () => {
                  console.log("updateTodoDone");
                  await updateTodoDone({ variables: { id: todo.id } });
                  console.log("refetching");
                  await refetch();
                }}
              >
                <Checkbox checked={todo.done} readOnly />
                <Flex
                  pl={2}
                  sx={{ justifyContent: "space-between", width: "100%" }}
                >
                  <span> {todo.text} </span>
                  <FontAwesomeIcon
                    onClick={async () => {
                      await deleteTodo({ variables: { id: todo.id } });
                      await refetch();
                    }}
                    icon={faTrashAlt}
                  />
                </Flex>
              </Flex>
            ))}
          </ul>
        )}
      </Flex>
    </Container>
  );
}
