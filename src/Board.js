import React from 'react'
import "./Board.css"
function Board({board, handleClick}) {
  return (
    <div className='board'>
    {board.map((row, rowIndex)=>(
    <div key={rowIndex} className='board__row'>{row.map((cell, cellIndex)=>(
<button key={cellIndex} className='board__cell' onClick={()=>handleClick()}> {cell}</button>
    ))}</div> 
     ) )
}</div>)
}

export default Board