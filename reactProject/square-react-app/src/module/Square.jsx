import { useState } from "react";

import "./Square.css";

const Square = ({ value, onSquareClick }) => {
  return (
    <div className="square" onClick={onSquareClick}>
      {value}
    </div>
  );
};

const Board = ({ xIsNext, squares, onPlay }) => {
  const handleClick = (i) => {
    const currentSquares = [...squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    currentSquares[i] = xIsNext ? "X" : "O";
    onPlay(currentSquares);
  };

  const generateBoard = () => {
    const board = [];
    for (let row = 0; row < 3; row++) {
      const squaresRow = [];
      for (let col = 0; col < 3; col++) {
        const index = 3 * row + col;
        squaresRow.push(
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
          />
        );
      }
      board.push(
        <div key={row} className="board-row">
          {squaresRow}
        </div>
      );
    }
    return board;
  }

  const winner = calculateWinner(squares);
  let status;
  winner ? status = `Winner: ${winner}` : status = "Next player: " + (xIsNext ? "X" : "O");

  // if (winner) {
  //   status = <span dangerouslySetInnerHTML={{ __html: textHtml(winner) }} />;
  // } else {
  //   status = "Next player: " + (xIsNext ? "X" : "O");
  // }

  return (
    <>
      <div className="status">{status}</div>
      {generateBoard()}
    </>
  );
};

const textHtml = (winner) => {
  const createMarkup = (a) => {
    return {__html: a};
  };
  //fooにhtmlが含まれていてもエスケープされてしまう
  return <span dangerouslySetInnerHTML={createMarkup(winner)}></span>;
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const newHistory = history.slice(0, currentMove + 1);
    newHistory.push(nextSquares);
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  };

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;// 勝者がいない場合は null を返す
}

export default Game;
