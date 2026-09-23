import type { CelulaGrade } from '../types/game'

interface PropsCelula {
  celula: CelulaGrade
  estaSelecionada: boolean
  estaEncontrada: boolean
  aoPressionar: (posicao: { linha: number; coluna: number }) => void
  aoEntrar: (posicao: { linha: number; coluna: number }) => void
}

export function Celula({ celula, estaSelecionada, estaEncontrada, aoPressionar, aoEntrar }: PropsCelula) {
  const classe = [
    'grid-cell',
    estaEncontrada && 'found',
    estaSelecionada && !estaEncontrada && 'selected'
  ].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      className={classe}
      onPointerDown={() => aoPressionar(celula.posicao)}
      onPointerEnter={() => aoEntrar(celula.posicao)}
      aria-label={`Letra ${celula.letra}, linha ${celula.posicao.linha + 1}, coluna ${celula.posicao.coluna + 1}`}
      aria-selected={estaSelecionada}
      aria-pressed={estaEncontrada}
    >
      {celula.letra}
    </button>
  )
}
