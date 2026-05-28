function bfs(
  grid,
  start,
  end
){

  let queue = [start];

  let visited = [];

  let seen = new Set();

  let parent = {};

  seen.add(
    start.toString()
  );

  const dirs = [
    [0,1],
    [1,0],
    [-1,0],
    [0,-1]
  ];

  while(queue.length){

    let [x,y] =
    queue.shift();

    visited.push([x,y]);

    if(
      x===end[0] &&
      y===end[1]
    ){
      break;
    }

    for(let [dx,dy]
      of dirs){

      let nx=x+dx;
      let ny=y+dy;

      let key=
      `${nx},${ny}`;

      if(

        nx>=0 &&
        ny>=0 &&
        nx<grid.length &&
        ny<grid[0].length &&

        !grid[nx][ny]
        .isWall &&

        !seen.has(key)

      ){

        seen.add(key);

        parent[key] =
        `${x},${y}`;

        queue.push([nx,ny]);

      }

    }

  }

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

export default bfs;