import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import bfs from "./algorithms/bfs";
import dfs from "./algorithms/dfs";
import "./App.css";

function App() {

  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);

  const [grid, setGrid] = useState([]);

  const [mode, setMode] = useState("wall");

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [speed, setSpeed] = useState(20);

  useEffect(() => {
    createGrid();
  }, []);

  function createGrid() {

    let newGrid = [];

    for (let r = 0; r < rows; r++) {

      let row = [];

      for (let c = 0; c < cols; c++) {

        row.push({
          row: r,
          col: c,

          isWall: false,
          isVisited: false,
          isPath: false,

          isStart: false,
          isEnd: false
        });

      }

      newGrid.push(row);

    }

    setGrid(newGrid);

    setStart(null);
    setEnd(null);

  }

  function clearPath() {

    let copy = grid.map(row =>
      row.map(cell => ({
        ...cell,
        isVisited: false,
        isPath: false
      }))
    );

    setGrid(copy);

  }

  function handleClick(r, c) {

    let copy = grid.map(row =>
      row.map(cell => ({ ...cell }))
    );

    if (mode === "wall") {

      if (
        !copy[r][c].isStart &&
        !copy[r][c].isEnd
      ) {

        copy[r][c].isWall =
          !copy[r][c].isWall;

      }

    }

    if (mode === "start") {

      copy.forEach(row =>
        row.forEach(cell =>
          cell.isStart = false
        )
      );

      copy[r][c].isWall = false;
      copy[r][c].isStart = true;

      setStart([r, c]);

    }

    if (mode === "end") {

      copy.forEach(row =>
        row.forEach(cell =>
          cell.isEnd = false
        )
      );

      copy[r][c].isWall = false;
      copy[r][c].isEnd = true;

      setEnd([r, c]);

    }

    setGrid(copy);

  }

  function animate(visited, path) {

    clearPath();

    visited.forEach((node, index) => {

      setTimeout(() => {

        setGrid(prev => {

          let copy = prev.map(row =>
            row.map(cell => ({ ...cell }))
          );

          let [r, c] = node;

          if (
            !copy[r][c].isStart &&
            !copy[r][c].isEnd
          ) {

            copy[r][c].isVisited = true;

          }

          return copy;

        });

      }, index * (101 - speed));

    });

    setTimeout(() => {

      path.forEach((node, index) => {

        setTimeout(() => {

          setGrid(prev => {

            let copy = prev.map(row =>
              row.map(cell => ({ ...cell }))
            );

            let [r, c] = node;

            if (
              !copy[r][c].isStart &&
              !copy[r][c].isEnd
            ) {

              copy[r][c].isPath = true;

            }

            return copy;

          });

        }, index * (101 - speed));

      });

    }, visited.length * (101 - speed));

  }

  function runBFS() {

    if (!start || !end) {

      alert("Set Start and End Nodes");
      return;

    }

    const result =
      bfs(grid, start, end);

    animate(
      result.visited,
      result.path
    );

  }

  function runDFS() {

    if (!start || !end) {

      alert("Set Start and End Nodes");
      return;

    }

    const result =
      dfs(grid, start, end);

    animate(
      result.visited,
      result.path
    );

  }

  return (

    <div className="app">

      <h1>
        Maze Solver Visualizer
      </h1>

      <div className="controls">

        <div className="size-inputs">

          <div className="input-group">

            <label>
              Rows
            </label>

            <input
              type="number"
              value={rows}
              min="5"
              max="50"
              onChange={(e) =>
                setRows(
                  Number(e.target.value)
                )
              }
            />

          </div>

          <div className="input-group">

            <label>
              Columns
            </label>

            <input
              type="number"
              value={cols}
              min="5"
              max="50"
              onChange={(e) =>
                setCols(
                  Number(e.target.value)
                )
              }
            />

          </div>

          <button
            onClick={createGrid}
          >
            Apply Grid
          </button>

        </div>

        <button
          onClick={() =>
            setMode("start")
          }
        >
          Set Start
        </button>

        <button
          onClick={() =>
            setMode("end")
          }
        >
          Set End
        </button>

        <button
          onClick={() =>
            setMode("wall")
          }
        >
          Add Walls
        </button>

        <button
          onClick={runBFS}
        >
          Run BFS
        </button>

        <button
          onClick={runDFS}
        >
          Run DFS
        </button>

        <button
          onClick={createGrid}
        >
          Reset
        </button>

        <div className="speed-control">

          <span>
            Speed: {speed}
          </span>

          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) =>
              setSpeed(
                Number(e.target.value)
              )
            }
          />

        </div>

      </div>

      <Grid
        grid={grid}
        handleClick={handleClick}
      />

    </div>

  );

}

export default App;