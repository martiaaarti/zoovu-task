import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';
import Board from './components/Board';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
