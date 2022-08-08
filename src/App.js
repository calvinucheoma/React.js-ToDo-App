import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import './App.css';
import ToDo from './components/ToDo/ToDo';
import db from './firebase';


function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
     const getTodos = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

     const unsubscribe = onSnapshot(getTodos, (snapshot) => {
       setTodos(snapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data()
        })
      ))
     });
     return unsubscribe;
  }, []);

  const addTodo = (e) => {
     e.preventDefault();
     const todoRef = collection(db, 'todos');
     addDoc(todoRef, {
        todo: input,
        timestamp: serverTimestamp()
     });
     setInput('');
  };

  return (

    <div className="app">

      <h1 className='appHeader'> ToDo App✍️ </h1>

      <FormControl>

        <InputLabel className='appInputLabel'> Write a ToDo... </InputLabel>
  
        <Input 
          type='text' 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className='appInput'
        />
        
        <Button 
          type='submit' 
          onClick={addTodo} 
          className='submitButton'
          variant='contained'
          disabled={!input}
          color='secondary'
        > Add ToDo 
        </Button>

          {todos.map(({id, todo}) => {
            return (
              <ToDo key={id} todo={todo.todo} id={id} />
            )
          })}

      </FormControl>

    </div>

  );

};

export default App;
