const { columns, grid, rows, startCol, startRow } = getInitialGrid()
createBoard()
document.getElementById('clear_board').addEventListener('click', clearBoard)
document.getElementById('dfs').addEventListener('click', () => {
  clearBeforeStart()
  depthFirstSearch({ grid, startCol, startRow })
})

function createBoard () {
  let boardHtml = ''
  for (let row = 0; row <= rows; row++) {
    boardHtml += `<tr id="${row}">`
    for (let col = 0; col <= columns; col++) {
      boardHtml += drawColumn(grid[row][col])
    }
    boardHtml += '<tr/>'
  }
  const board = document.getElementById('board_content')
  board.innerHTML = boardHtml
  const { nodeClick } = boardEvent(board)
  board.addEventListener('click', nodeClick)
}

function drawColumn (node) {
  if (node.isStart) {
    return `
      <td id="${node.row}-${node.col}" class="start-node">
        <i class="fas fa-chevron-right"></i>
      </td>
    `
  } else if (node.isFinish) {
    return `
      <td id="${node.row}-${node.col}" class="finish-node">
        <i class="fas fa-bullseye"></i>
      </td>
    `
  } else {
    return `<td id="${node.row}-${node.col}"></td>`
  }
}

function boardEvent (board) {
  let onMouseOutEvent = false

  function nodeClick (event) {
    onMouseOutEvent = !onMouseOutEvent
    fillNode(event)
    if (onMouseOutEvent) {
      board.addEventListener('mouseout', fillNode)
    } else {
      board.removeEventListener('mouseout', fillNode)
    }
  }

  function fillNode (event) {
    event.preventDefault()
    const target = event.target
    const [row, column] = target.id.split('-')
    if (!row || !column) {
      return
    }
    const node = grid[row][column]
    if (target.nodeName === 'TD' && !node.isFinish && !node.isStart) {
      if (node.isWall) {
        target.classList.remove('wall')
      } else {
        target.classList.add('wall')
      }
      grid[row][column].isWall = !grid[row][column].isWall
    }
  }

  return {
    nodeClick
  }
}

function clearBoard () {
  const walls = document.getElementsByClassName('wall')
  Array.from(walls).forEach(wall => {
    wall.classList.remove('wall')
    const [row, column] = wall.id.split('-')
    grid[row][column].isWall = false 
  })

  const isVisited = document.getElementsByClassName('isVisited')
  Array.from(isVisited).forEach(item => {
    item.classList.remove('isVisited')
    const [row, column] = item.id.split('-')
    grid[row][column].isVisited = false 
  })

  const revisited = document.getElementsByClassName('revisited')
  Array.from(revisited).forEach(item => {
    item.classList.remove('revisited')
    const [row, column] = item.id.split('-')
    grid[row][column].revisited = false
    grid[row][column].isVisited = false
  })
}

function clearBeforeStart () {
  const isVisited = document.getElementsByClassName('isVisited')
  Array.from(isVisited).forEach(item => {
    item.classList.remove('isVisited')
    const [row, column] = item.id.split('-')
    grid[row][column].isVisited = false 
  })

  const revisited = document.getElementsByClassName('revisited')
  Array.from(revisited).forEach(item => {
    item.classList.remove('revisited')
    const [row, column] = item.id.split('-')
    grid[row][column].revisited = false 
    grid[row][column].isVisited = false
  })
}
