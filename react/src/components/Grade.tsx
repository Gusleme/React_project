import { usarJogo } from '../store/ContextoJogo'
import { Celula } from './Celula'

export function Grade() {
  const { grade, posicionamentos, idsPalavrasEncontradas, celdasSelecionadas, selecionando, iniciarSelecao, atualizarSelecao, finalizarSelecao } = usarJogo()

  const posicoesEncontradas = new Set<string>()
  posicionamentos
    .filter(p => idsPalavrasEncontradas.includes(p.palavra.id))
    .forEach(p => p.celdas.forEach(pos => posicoesEncontradas.add(`${pos.linha},${pos.coluna}`)))

  const estaSelecionada = (linha: number, coluna: number) =>
    celdasSelecionadas.some(pos => pos.linha === linha && pos.coluna === coluna)

  const aoPressionar = (posicao: PosicaoCelula) => {
    iniciarSelecao(posicao)
  }

  const aoEntrar = (posicao: PosicaoCelula) => {
    if (selecionando) atualizarSelecao(posicao)
  }

  const aoSoltar = () => {
    finalizarSelecao()
  }

  const aoSair = () => {
  }

  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${grade[0]?.length ?? 10}, 1fr)` }}
      role="grid"
      aria-label="Grade do caça-palavras"
      onPointerUp={aoSoltar}
      onPointerLeave={aoSair}
    >
      {grade.map((linha, l) =>
        linha.map((celula, c) => (
          <Celula
            key={celula.id}
            celula={celula}
            estaSelecionada={estaSelecionada(l, c)}
            estaEncontrada={posicoesEncontradas.has(celula.id)}
            aoPressionar={aoPressionar}
            aoEntrar={aoEntrar}
          />
        ))
      )}
    </div>
  )
}
