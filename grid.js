const createNode = (col, row, isStart = false, isFinish = false) => ({
  col,
  row,
  isStart,
  isFinish,
  isVisited: false,
  isWall: false
})

function getInitialGrid () {
  const rows = Math.floor((screen.availHeight - 20) / 40)
  const columns = Math.floor((screen.availWidth - 20) / 30)
  const isStartRow = Math.floor(rows / 2)
  const isStartColumn = Math.floor(columns * 0.1)
  const isFinishRow = Math.floor(rows / 2)
  const isFinishColumn = Math.floor(columns * 0.8)

  let grid = []
  for (let row = 0; row <= rows; row++) {
    let currentRow = []
    for (let col = 0; col <= columns; col++) {
      if (isStartRow === row  && isStartColumn === col) {
        currentRow = [
          ...currentRow,
          createNode(col, row, true)
        ]
      } else if (isFinishRow === row && isFinishColumn === col) {
        currentRow = [
          ...currentRow,
          createNode(col, row, false, true)
        ]
      } else {
        currentRow = [
          ...currentRow,
          createNode(col, row)
        ]
      }
    }
    grid = [...grid, currentRow]
  }
  return {
    grid,
    rows,
    columns,
    startCol: isStartColumn,
    startRow: isStartRow
  }
}
