import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// function component
function Square(props: {
  value: null | string;
  onClick: () => void;
}): JSX.Element {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component<
  {}, // empty props
  { squares: ("X" | "O" | null)[]; xIsNext: boolean }
> {
  // general state of the board
  // gets passed down to individual squares
  state = { squares: Array(9).fill(null), xIsNext: true };

  // method that gets passed down to the squares
  // gets called by the square when clicked
  handleclick(i: number) {
    // slice to create a copy of the state
    // you want to avoid modifying he state directly
    const squares = this.state.squares.slice();

    // return early if square has been set or if there is a winner
    if (calculateWinner(squares) || squares[i] != null) {
      return;
    }

    this.state.xIsNext ? (squares[i] = "X") : (squares[i] = "O");
    // update the state and toggle xIsNext
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }

  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleclick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? "X" : "0"}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: ("X" | "O" | null)[]): "X" | "O" | null {
  // lines in that result in a winner of tic tac toe
  // 3x3 array
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
  for (const [a, b, c] of lines) {
    if (
      squares[a] != null &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

// =======================================

ReactDOM.render(<Game />, document.getElementById("root"));
