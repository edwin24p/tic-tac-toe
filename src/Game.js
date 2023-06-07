import "./Game.css"
import React, { useState }from 'react'
import Board from './Board'


function Game() {
    const [board, setBoard]=useState([[null, null, null],[null, null, null], [null, null, null]])
  return (
    <div className='game'>
    <h1>Tic-Tac-Toe</h1>
    <Board board={board} />
    </div>
  )
}

export default Game