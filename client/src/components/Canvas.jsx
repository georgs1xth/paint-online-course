import React, { useEffect, useRef, useState } from 'react'
import "../styles/canvas.scss"
import { observer } from 'mobx-react-lite'
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import canvasState from '../store/canvasState';
import {Modal, Button} from 'react-bootstrap';
import {useParams} from 'react-router-dom';

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams()
  // console.log(params)

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  useEffect(() => {
    if(canvasState.username) {
    const socket = new WebSocket(`ws://localhost:8008/`);
    socket.onopen = () => {
      console.log("WEBSOCKET OPEN")
      socket.send(JSON.stringify({
        id: params.id,
        username: canvasState.username,
        method: "connection"
      }))
    }
    socket.onmessage = (event) => {
      console.log(event.data)
    }
    }
  }, [canvasState.username])
  
  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
    // console.log(canvasState.undoList)
  }

  const connectionHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  }

  return (
    <div className='canvas'>
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
        <canvas 
          onMouseDown={() => mouseDownHandler()}
          ref={canvasRef} 
          width={600} 
          height={400}
          />
    </div>
  )
});

export default Canvas