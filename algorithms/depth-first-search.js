function depthFirstSearch ({ grid, startCol, startRow }) {
  let currentNode = grid[startRow][startCol]
  let count = 0

  while (currentNode) {
    animate(`${currentNode.row}-${currentNode.col}`, count)

    if (currentNode.isFinish) {
      return currentNode
    }

    grid[currentNode.row][currentNode.col].isVisited = true
    const topNode = grid[currentNode.row - 1]?.[currentNode.col]
    const right = grid[currentNode.row][currentNode.col + 1]
    const bottom = grid[currentNode.row + 1]?.[currentNode.col]
    const left = grid[currentNode.row][currentNode.col - 1]

    if (topNode && !topNode?.isWall && !topNode?.isVisited) {
      grid[topNode.row][topNode.col].prevNode = currentNode 
      currentNode = topNode
    } else if (right && !right?.isWall && !right?.isVisited) {
      grid[right.row][right.col].prevNode = currentNode
      currentNode = right
    } else if (bottom && !bottom?.isWall && !bottom?.isVisited) {
      grid[bottom.row][bottom.col].prevNode = currentNode 
      currentNode = bottom
    } else if (left && !left?.isWall && !left?.isVisited) {
      grid[left.row][left.col].prevNode = currentNode 
      currentNode = left
    } else {
      currentNode = currentNode.prevNode
    }

    count++
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
  }, count * 20)
}
