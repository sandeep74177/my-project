import { useState } from "react";

// step --2  make a square function for change the value of square in the board
function Square({ value, onSquareClick }) {
  // step 6-- remove the prop and add a usestate for store the value

  // const [value,setValue]=useState(null);   // step-8 remove usestate from square

  // step--5
  // function handleClick(){     //step-9 cmnt this also
  //   setValue('x');
  // }
  return (
    // step--4 paases a prop value
    <button
      onClick={onSquareClick}
      className="text-3xl w-20 h-20 border-2 border-gray-500">
      {value}
    </button>
  );
}

// step --1
export default function Board() {
  const [xIsnext, setXIsnext] = useState(true);  //for fill out the squares
  const [squares, setSquares] = useState(Array(9).fill(null)); // step-7 create an array for each square

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsnext) {
      nextSquares[i] = "x";
    } else {
      nextSquares[i] = "0";
    }
    setSquares(nextSquares);
    setXIsnext(!xIsnext);
  }


const winner=calculateWinner(squares);
let  status;
  if(winner){
    status='Winner is  : '+ winner;

  }
  else{
    status= 'Next Player : ' +(xIsnext? 'x' :'0')
  }

  return (
    <>
    <div className="m-20 text-3xl">{status}</div>
      <div className="m-20 w-fit border-4 border-gray-600 rounded-lg p-4 shadow-lg">
        <div className="flex">
          {/* <button className="text-3xl w-20 h-20 border-2 border-gray-500">1</button> */}

          {/* step--3 reusable of Square code */}
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares){
  const lines=[
    [0,1,2]
    ,[3,4,5]
    ,[6,7,8]
    ,[0,3,6]
    ,[1,4,7]
    ,[2,5,8]
    ,[0,4,8]
    ,[2,4,6]
  ];

  for (let i=0; i<lines.length;i++){
    const [a,b,c]=lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a]=== squares[c]){
      return squares[a];
    }
  }

}
// step 7-- remove all the props value from 9 squares
