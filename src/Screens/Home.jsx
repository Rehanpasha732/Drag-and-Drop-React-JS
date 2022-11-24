import React, { useState } from 'react';
import 'antd/dist/antd.css';
import swal from 'sweetalert';
import { Button, Modal } from 'antd';
import { getKeyThenIncreaseKey } from 'antd/lib/message';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { AiTwotoneEdit } from 'react-icons/ai';
import Draggable from 'react-draggable';

function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [add, setAdd] = useState()
  const [text, setText] = useState()
  const [number, SetNumber] = useState(0)
  const [progress, setProgrrss] = useState(0)
  const [data, setData] = useState([])
  const [touch, setTouch] = useState(true)
  const [touched, setTouched] = useState(true)




  const showModal = () => {
    setIsModalOpen(true);

  };

  const handleOk = () => {
    setIsModalOpen(false);

    if (!add || !text) {
      setIsModalOpen(true);
      alert("fill it")
    }
    else {
      let obj = {
        todo: add,
        text: text
      }
      setData(data.concat([obj]))
      setAdd('')
      setText('')

    };

    SetNumber(number + 1)

  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const ubtd = () => {
  //   setIsModalOpen(true);

  // }
  const hide = () => {
    setTimeout(() => {
      setTouch(false)



    }, [1000]);


  }


  return (
    <>
      <div className="main">
        <div className="header">
          <h1>Drag & Drop Taskboard</h1>
        </div>

        <div className="cards_section">
          <div className="cards">
            <div className="upper">
              <span className='upper_div_text'><h4>Todo</h4>{number}</span>

              <Button type="primary" onClick={showModal}>
                Add
              </Button>
            </div>
            <div className="all_todo">
              <Modal title="Add Item" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p><span className='star'>*</span> Title</p><input value={add} onChange={(e) =>
                  setAdd(e.target.value)
                } className='input' type="text" />
                <p><br /><span className='star'>*</span> Discription</p><textarea value={text} onChange={(e) => {
                  setText(e.target.value)
                }} name="" id="" cols="65" rows="5"></textarea>
              </Modal>

            </div>

            <div className="task">
              <br />
              {
                data.map((v, i) => {
                  console.log(i, "===> index")
                  return (
                    <>
                      <Draggable axis='x' >
                        <div onClick={hide} className="data" key={i}>
                          <div className="todo">
                            <span>{v.todo}</span>
                            <div className='icons'>
                              <span className='delete' onClick={() => {
                                let dlt = data.filter((value, index) => {
                                  return i != index
                                })
                                setData(dlt)
                                SetNumber(number - 1)
                                swal("Deleted! ❌");
                              }} ><RiDeleteBack2Fill /></span>
                              <span className='edit'
                                onClick={() => {
                                  setIsModalOpen(true);

                                }}
                              ><AiTwotoneEdit /></span>
                            </div>
                          </div>
                          <div className="text"><span>{v.text}</span></div>
                        </div>
                      </Draggable>
                    </>
                  )
                })

              }
            </div>

          </div>
          <div className="cards">
            <div className="upper">
              <span className='upper_div_text '><h4>In Progress</h4>

                {touch === true
                  ?
                  <p>(0)</p>
                  :
                  <p >{number}</p>
                }
              </span>
            </div>
          </div>
          <div className="cards">
            <div className="upper">
              <span className='upper_div_text'><h4>Done</h4></span>
              {touched === true
                ?
                <p>(0)</p>
                :
                <p >{number}</p>
              }
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default Home
