function breadhFirstSearch({ grid, startCol, startRow }) {
  let { currentNode, count } = breadhFirstSearchHelper({ grid, startCol, startRow })
  if (currentNode) {
    while (true) {
      animate(`${currentNode.row}-${currentNode.col}`, count)
      if (currentNode.isStart) {
        break
      }
      currentNode = currentNode.prevNode
      count++
    }
  }
}

function breadhFirstSearchHelper ({ grid, startCol, startRow }) {
  const queue = [grid[startRow][startCol]]
  let count = 0
  while (queue.length > 0 ) {
    const currentNode = queue.shift()
    if (currentNode.isFinish) {
      return { currentNode, count }
    }
    const children = getChildren(grid, currentNode.row, currentNode.col)
    for (const child of children) {
      if (!child.isVisited && !child.isWall) {
        child.prevNode = currentNode
        child.isVisited = true
        animate(`${child.row}-${child.col}`, count)
        queue.push(child)
        count++
      }
    }
  }

  return { currentNode: null, count: null }
}

function getChildren (grid, row, col) {
  const children = []
  const top = grid[row - 1]?.[col]
  const right = grid[row][col + 1]
  const bottom = grid[row + 1]?.[col]
  const left = grid[row][col - 1]
  !isEmpty(top) && children.push(top)
  !isEmpty(right) && children.push(right)
  !isEmpty(bottom) && children.push(bottom)
  !isEmpty(left) && children.push(left)
  return children
}

function isEmpty(item) {
  if (!item) {
    return true
  } else {
    return false
  }
}

function animate (id, count) {
  setTimeout(() => {
    const element = document.getElementById(id)
    if (!element.classList.contains('isVisited')) {
      element.classList.remove('revisited')
      element.classList.add('isVisited')
    } else {
      element.classList.add('revisited')
      element.classList.remove('isVisited')
    }
  }, count * 10)
}
