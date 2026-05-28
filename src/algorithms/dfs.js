function dfs(
  grid,
  start,
  end
){

  let visited = [];

  let seen = new Set();

  let parent = {};

  function solve(x,y){

    let key =
    `${x},${y}`;

    if(

      x<0 ||
      y<0 ||
      x>=grid.length ||
      y>=grid[0].length ||

      grid[x][y]
      .isWall ||

      seen.has(key)

    ){
      return false;
    }

    seen.add(key);

    visited.push([x,y]);

    if(
      x===end[0] &&
      y===end[1]
    ){
      return true;
    }

    const dirs = [
      [0,1],
      [1,0],
      [-1,0],
      [0,-1]
    ];

    for(let [dx,dy]
      of dirs){

      let nx=x+dx;
      let ny=y+dy;

      parent[
        `${nx},${ny}`
      ] =
      `${x},${y}`;

      if(
        solve(nx,ny)
      ){
        return true;
      }

    }

    return false;

  }

  solve(
    start[0],
    start[1]
  );

  let path = [];

  let current =
  end.toString();

  while(current){

    let node =
    current
    .split(",")
    .map(Number);

    path.unshift(node);

    current =
    parent[current];

  }

  return{
    visited,
    path
  };

}

export default dfs;