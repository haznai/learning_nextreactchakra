import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// function component
function Square(props: { value: null | string; onClick: () => void }) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component<
  {}, // empty props
  { squares: (string | null)[]; xIsNext: boolean }
> {
  // general state of the board
  // gets passed down to individual squares
  state = { squares: Array(9).fill(null), xIsNext: true };

  // method that gets passed down to the squares
  // gets called by the square when clicked
  handleclick(i: number) {
    // return early if square has been set before
    if (this.state.squares[i] != null) {
      return;
    }

    const squares = this.state.squares.slice();
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
    const status = `Next player: ${this.state.xIsNext ? "X" : "0"}`;

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
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// =======================================

ReactDOM.render(<Game />, document.getElementById("root"));
