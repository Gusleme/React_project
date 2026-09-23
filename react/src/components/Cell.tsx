import type { GridCell } from '../types/game'

interface CellProps {
  cell: GridCell
  isSelected: boolean
  isFound: boolean
  onPointerDown: (position: { row: number; column: number }) => void
  onPointerEnter: (position: { row: number; column: number }) => void
}

export function Cell({ cell, isSelected, isFound, onPointerDown, onPointerEnter }: CellProps) {
  const className = [
    'grid-cell',
    isFound && 'found',
    isSelected && !isFound && 'selected'
  ].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      className={className}
      onPointerDown={() => onPointerDown(cell.position)}
      onPointerEnter={() => onPointerEnter(cell.position)}
      aria-label={`Letra ${cell.letter}, linha ${cell.position.row + 1}, coluna ${cell.position.column + 1}`}
      aria-selected={isSelected}
      aria-pressed={isFound}
    >
      {cell.letter}
    </button>
  )
}