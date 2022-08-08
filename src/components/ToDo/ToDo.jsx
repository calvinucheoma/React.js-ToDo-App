import { Avatar, Box, Button, FormControl, Input, InputLabel, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';
import React, { useState } from 'react';
import './ToDo.css';
import db from '../../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';


const ToDo = ({id, todo}) => {

  const deleteTodo = async () => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'todos', id), {
        todo: input
    });
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (

    <>

        <Modal open={open} onClose={() => setOpen(false)}>

            <Box sx={style}>

                <FormControl>

                    <InputLabel className='todoInputLabel'> Edit ToDo</InputLabel>

                    <Input 
                        type="text"
                        placeholder={todo} 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        className='todoInput' 
                    />

                    <Button
                        type='submit'
                        color='secondary'
                        onClick={updateTodo}
                        className='editButton'
                        variant='contained'
                        disabled={!input}
                    > Update </Button>

                </FormControl>

            </Box>
            
        </Modal>

        <List className='todoList'>

            <ListItem className='todoItem'>

                <ListItemAvatar>
                    <Avatar src='https://media.istockphoto.com/vectors/open-diary-illustration-vector-id886145362?k=20&m=886145362&s=612x612&w=0&h=E7G17Frk9rJWH77f8OYbz2Eu4v_dTjvpOnNjOhMBS8o='/>
                </ListItemAvatar>

                <ListItemText primary={todo} secondary='ToDo' />

                <Delete onClick={deleteTodo} className='todoIcon1' />

                <Edit onClick={handleOpen} className='todoIcon2' />
                
            </ListItem>

        </List>

    </>
  )

};

export default ToDo;
