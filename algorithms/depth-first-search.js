function depthFirstSearch ({ grid, startCol, startRow }) {
  let timingForAnimation = 0
  return direction(startRow, startCol, timingForAnimation)
  
  function goTop(currentRow, currentCol, timingForAnimation) {
    grid[currentRow][currentCol].isVisited = true
    timingForAnimation = timingForAnimation + 1
    return direction(currentRow--, currentCol, timingForAnimation)
  }

  function goRight(currentRow, currentCol, timingForAnimation) {
    grid[currentRow][currentCol].isVisited = true
    timingForAnimation = timingForAnimation + 1
    return direction(currentRow, currentCol++, timingForAnimation)
  }

  function goBottom (currentRow, currentCol, timingForAnimation) {
    grid[currentRow][currentCol].isVisited = true
    timingForAnimation = timingForAnimation + 1
    return direction(currentRow++, currentCol, timingForAnimation)
  }

  function goLeft(currentRow, currentCol, timingForAnimation) {
    grid[currentRow][currentCol].isVisited = true
    timingForAnimation = timingForAnimation + 1
    return direction(currentRow, currentCol--, timingForAnimation)
  }

  function direction (currentRow, currentCol, timingForAnimation) {
    setTimeout(() => {
      document.getElementById(`${currentRow}-${currentCol}`).classList.add('isVisited')
    }, 30 * timingForAnimation)

    timingForAnimation = timingForAnimation + 1
    if (grid[currentRow][currentCol]?.isFinish) {
      return grid[currentRow][currentCol]
    }
    const topNode = grid[currentRow - 1]?.[currentCol]
    const rightNode = grid[currentRow]?.[currentCol + 1]
    const bottomNode = grid[currentRow + 1]?.[currentCol]
    const leftNode = grid[currentRow]?.[currentCol - 1]

    if (topNode && !topNode?.isVisited && !topNode?.isWall) {
      if (!grid[currentRow - 1][currentCol].prevNode) {
        grid[currentRow - 1][currentCol].prevNode = grid[currentRow][currentCol]
      }
      return goTop(currentRow - 1, currentCol, timingForAnimation)
    }else if (rightNode && !rightNode?.isVisited && !rightNode?.isWall) {
      if (!grid[currentRow][currentCol + 1].prevNode) {
        grid[currentRow][currentCol + 1].prevNode = grid[currentRow][currentCol]
      }
      return goRight(currentRow, currentCol + 1, timingForAnimation)
    } else if (bottomNode && !bottomNode?.isVisited && !bottomNode?.isWall) {
      if (!grid[currentRow + 1][currentCol].prevNode) {
        grid[currentRow + 1][currentCol].prevNode = grid[currentRow][currentCol]
      }
      return goBottom(currentRow + 1, currentCol, timingForAnimation)
    } else if (leftNode && !leftNode?.isVisited && !leftNode?.isWall) {
      if (!grid[currentRow][currentCol - 1].prevNode) {
        grid[currentRow][currentCol - 1].prevNode = grid[currentRow][currentCol]
      }
      return goLeft(currentRow, currentCol - 1, timingForAnimation)
    } else {
      if (!grid[currentRow][currentCol].isStart) {
        return direction(grid[currentRow][currentCol].prevNode.row, grid[currentRow][currentCol].prevNode.col, timingForAnimation)
      }
    }

    return false
  }
}
