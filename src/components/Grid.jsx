import Cell from "./Cell";

function Grid({
  grid,
  handleClick
}){

  return(

    <div
className="grid"
style={{
gridTemplateColumns:
`repeat(${grid[0]?.length || 0}, 32px)`
}}
>

      {grid.map((row)=>

        row.map((cell)=>(

          <Cell
          key={
            `${cell.row}-${cell.col}`
          }
          cell={cell}
          handleClick={handleClick}
          />

        ))

      )}

    </div>

  );

}

export default Grid;