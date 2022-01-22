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
      return goTop(currentRow - 1, currentCol, timingForAnimation)
    }else if (rightNode && !rightNode?.isVisited && !rightNode?.isWall) {
      return goRight(currentRow, currentCol + 1, timingForAnimation)
    } else if (bottomNode && !bottomNode?.isVisited && !bottomNode?.isWall) {
      return goBottom(currentRow + 1, currentCol, timingForAnimation)
    } else if (leftNode && !leftNode?.isVisited && !leftNode?.isWall) {
      return goLeft(currentRow, currentCol - 1, timingForAnimation)
    }

    return false
  }
}
