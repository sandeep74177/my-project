
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="text-3xl w-20 h-20 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-200 transition"
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "x" : "0";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? `🎉 Winner: ${winner}`
    : `Next Player: ${xIsNext ? "x" : "0"}`;

  return (
    <div className="text-center">
      <div className="text-2xl font-semibold mb-4">{status}</div>
      <div className="inline-block border-4 border-gray-600 rounded-lg p-4 shadow-lg">
        <div className="grid grid-cols-3 gap-2">
          {squares.map((value, i) => (
            <Square key={i} value={value} onSquareClick={() => handleClick(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    const description = move === 0 ? "Go to game start" : `Go to move #${move}`;
    return (
      <li key={move}>
        <button
          className="mb-2 px-4 py-1 border border-blue-400 rounded hover:bg-blue-100 transition"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-10">Tic Tac Toe 🕹️</h1>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <div className="mt-10">
        <h2 className="text-xl font-medium mb-2">Game History</h2>
        <ol className="space-y-1">{moves}</ol>
      </div>
    </div>
  );
}
