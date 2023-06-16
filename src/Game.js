import "./Game.css"
import React, { useState }from 'react'
import Board from './Board'

//game component
function Game() {
    const [board, setBoard]=useState([[null, null, null],[null, null, null], [null, null, null]])
    const [winner, setWinner]=useState(null);
    const [player, setPlayer]=useState('X');


//this checks if there is a winner everytime one or the computer makes a move
    const checkWinner=(board)=>{
const lines=[
  //rows
  [board[0][0], board[0][1], board[0][2]],
  [board[1][0], board[1][1], board[1][2]],
  [board[2][0], board[2][1], board[2][2]],

  //columns
  [board[0][0], board[1][0], board[2][0]],
  [board[0][1], board[1][1], board[2][1]],
  [board[0][2], board[1][2], board[2][2]],

  //diagonals
  [board[0][0], board[1][1], board[2][2]],
  [board[0][2], board[1][1], board[2][0]]
]
for(const line of lines){
  if(line[0]&&line[0]===line[1]&&line[1]===line[2]){
    return line[0];
  } 
}
const isBoardFull = board.every((row) => row.every((cell) => cell !== null));
if (isBoardFull) {
  return 'tie';
}
return null;

    }

    //this checks what is the best possible move by finding the score of each possible move the computer can make
    const computerMove=(board)=>{
     
      let bestScore=-Infinity;
      let move=null;
      for(let i=0; i<3;i++ ){
        for(let j=0;j<3;j++){
          if(board[i][j]==null){
            
        board[i][j] = 'O';
            let score=minimax(board, 0,-Infinity, Infinity, false);
            
            board[i][j]=null;
         
            if(score > bestScore){
              bestScore=score;
              move=[i, j];
            }
            
          }
          
        }
      }
  
      return move;
      
    }
let scores={
  X:-1,
  O:1,
  tie:0
}
const minimax = (board, depth, alpha, beta, isMaximizing) => {
  
  const result = checkWinner(board);
  // Base cases
  if (result!==null) {
    
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          board[i][j] = 'O';
          const score = minimax(board, depth + 1,alpha, beta, false);
          board[i][j] = null;
          bestScore = Math.max(score, bestScore);
          alpha=Math.max(alpha, bestScore);
          if(beta<=alpha){
            break;
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          board[i][j] = 'X';
          const score = minimax(board, depth + 1, alpha, beta, true);
          board[i][j] = null;
          bestScore = Math.min(score, bestScore);
          beta=Math.min(beta, bestScore);
          if(beta<=alpha){
            break;
          }
        }
      }
    }
    return bestScore;
  }
  
};

    //this executes everytime we click on a square
    //it checks if there is already a winner or if the square is already filled
    //after that it fills the square, check if there is a winner and passes the turn to the computer
    const onClickHandler=(row, col)=>{
      //check if cell is already filled or if the game already ended
      if(board[row][col]||winner){
        
        return;
      }
      const updatedPlayerBoard=board.map((newRow, rowIndex)=>newRow.map((cell, cellIndex)=>rowIndex===row&& cellIndex===col?player:cell))
      setBoard(updatedPlayerBoard)
      const newWinner=checkWinner(updatedPlayerBoard);
      setWinner(newWinner)
      
  if(newWinner===null ){
    
  const [computerRow, computerCol]=computerMove(updatedPlayerBoard);
  const updatedComputerBoard=updatedPlayerBoard.map((newRow, rowIndex)=>newRow.map((cell, cellIndex)=>rowIndex===computerRow&&cellIndex===computerCol?'O':cell));
  setBoard(updatedComputerBoard);
  setWinner(checkWinner(updatedComputerBoard));
  
}


    }
  return (
    
    <div className='game'>
    <h1>Tic-Tac-Toe</h1>
    <Board board={board} handleClick={onClickHandler} />
    </div>
  )
}

export default Game