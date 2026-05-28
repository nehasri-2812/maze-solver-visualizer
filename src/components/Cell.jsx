function Cell({
  cell,
  handleClick
}){

  let className = "cell";

  if(cell.isWall)
    className += " wall";

  if(cell.isVisited)
    className += " visited";

  if(cell.isPath)
    className += " path";

  if(cell.isStart)
    className += " start";

  if(cell.isEnd)
    className += " end";

  return(

    <div
    className={className}
    onClick={()=>
    handleClick(
      cell.row,
      cell.col
    )}
    />

  );

}

export default Cell;