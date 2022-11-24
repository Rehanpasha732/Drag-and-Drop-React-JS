import React, { useState } from 'react'
import 'antd/dist/antd.css';
import swal from 'sweetalert';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Draggable from 'react-draggable';


function Home() {
    const [textAreaValue, setTextAreaValue] = useState()
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [todo, setTodo] = useState('')
    const [indexvalue, setIndexvalue] = useState('')
    const [show, setShow] = useState('hide')
    const [close, setClose] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        setTextAreaValue('')
        setTodo('')
    };
    const addtodo = () => {
        if (todo === '' || textAreaValue === '') {
            swal('please fill Todo')
        }
        else {
            let obj = {
                Todo: todo,
                Text:textAreaValue
            }
            setData(data.concat([obj]))
            setTodo('')
            setTextAreaValue('')
            setOpen(false)
            setClose(false)
        }
    }
    const updated = () => {
        data[indexvalue].Todo = todo
        data[indexvalue].Text = textAreaValue
        setShow('hide')
        setTodo('')
        setTextAreaValue('')
        setOpen(false)
        setClose(false)
    }
    const cancel = () => {
        setShow('hide')
        setOpen(false)
        setClose(false)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 440,
        bgcolor: 'background.paper',
        p: 4,
    };
    return (
        <div className='main'>
            <h1 className='heading'>Drag & Drop Taskboard</h1>
            <div className='container'>
                <div className='cards'>
                    <div className='card_inner_div'>
                        <div className='btn_div'>
                            <p className='paragraph2'>To Do</p>
                            <Button onClick={handleOpen} className='btn' >Add</Button>
                            <Modal
                                open={open}
                                aria-labelledby='modal-modal-title'
                                aria-describedby='modal-modal-description'
                            >
                                <Box sx={style}>
                                    <Typography id='modal-modal-title' variant='h6' component='h2' style={{ color: 'black', fontWeight: '600' }} >
                                        Add Item
                                    </Typography>
                                    <div id='modal-modal-description' sx={{ mt: 2 }}>
                                        <div className='head'>
                                            <div className='div'  >
                                                <div className='upper_div'>
                                                    <div>
                                                        <p className='paragraph'>Title</p>
                                                        <input className='input' value={todo} onChange={(e) => { setTodo(e.target.value) }} />
                                                        <br />
                                                        <p className='paragraph'>Description</p>
                                                        <textarea className='text_area' value={textAreaValue} onChange={(e) => { setTextAreaValue(e.target.value) }} cols='52' rows='6' ></textarea>
                                                    </div>
                                                </div>
                                                <div className='button_div'>
                                                    <button onClick={cancel} className='button cancel'> Cancel </button>
                                                    {show === 'hide' ? <button className='button ok' onClick={addtodo}>Ok</button> :
                                                        <button className='button' onClick={updated}>Ok</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                    {
                        data?.map((v, i) => {
                            return (
                                <Draggable 
                                axis="x">
                                    <div className='todo_list'>
                                    <div className='todo_div' id='todo_div1'>
                                        <p className='todo' key={i}>{v.Todo}</p>
                                        <div className='icon'>
                                            <EditOutlined onClick={() => {
                                                let todos = data[i].Todo
                                                                let description = data[i].Text
                                                                setTodo(todos)
                                                                setTextAreaValue(description)
                                                                setIndexvalue(i)
                                                                setShow('show')
                                                                setOpen(true)
                                                                setClose(false)
                                            }} />
                                        </div>
                                    </div>
                                    <div className="todo_div">
                                        <p className='text'>{v.Text}</p>
                                        <div className='icon'>
                                            <DeleteOutlined onClick={() => {
                                                let delet = data.filter((value, index) => {
                                                    return i != index
                                                })
                                                setData(delet)
                                            }} />
                                        </div>
                                    </div>
                                </div>
                                </Draggable>
                            )
                        })
                    }
                </div>
                <div className='cards'>
                    <div className='card_inner_div'>
                        <p className='paragraph2'>To Do</p>
                    </div>
                </div>
                <div className='cards'>
                    <div className='card_inner_div'>
                        <p className='paragraph2'>To Do</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
