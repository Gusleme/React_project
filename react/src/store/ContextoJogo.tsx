import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { ValorContextoJogo, EstadoJogo, ConfiguracaoJogo, IdTema, PosicaoCelula } from '../types/game'
import { criarPalavra } from '../utils/palavras'
import { gerarGrade } from '../utils/gerarGrade'
import { obterPalavrasTema, obterTodosTemas } from '../data/temas'
import { obterCeldasLinha } from '../utils/palavras'
import { mesmaSequencia } from '../utils/palavras'

const CONFIGURACAO_PADRAO: ConfiguracaoJogo = {
  tamanhoGrade: 10,
  palavrasPorJogo: 8,
  temaPadrao: 'animais',
  temas: obterTodosTemas()
}

function carregarPalavrasParaTema(tema: IdTema, limite: number): string[] {
  const palavras = obterPalavrasTema(tema)
  const visto = new Set<string>()
  return palavras
    .map(p => p.trim().toUpperCase())
    .filter(p => {
      if (visto.has(p)) return false
      visto.add(p)
      return true
    })
    .slice(0, limite)
}

function construirEstado(tema: IdTema): EstadoJogo {
  const palavras = carregarPalavrasParaTema(tema, CONFIGURACAO_PADRAO.palavrasPorJogo).map((texto, indice) => criarPalavra(texto, tema, indice))
  const { grade, posicionamentos } = gerarGrade(palavras, CONFIGURACAO_PADRAO)

  return {
    status: 'playing',
    configuracao: CONFIGURACAO_PADRAO,
    tema,
    palavras,
    grade,
    posicionamentos,
    idsPalavrasEncontradas: [],
    celdasSelecionadas: [],
    ancoraSelecao: null,
    selecionando: false,
    segundosDecorridos: 0
  }
}

const ContextoJogo = createContext<ValorContextoJogo | null>(null)

export function FornecedorJogo({ filhos }: { filhos: React.ReactNode }) {
  const [estado, definirEstado] = useState<EstadoJogo>(() => construirEstado(CONFIGURACAO_PADRAO.temaPadrao))

  const tick = useCallback(() => {
    definirEstado(e => ({ ...e, segundosDecorridos: e.segundosDecorridos + 1 }))
  }, [])

  useEffect(() => {
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [tick])

  const iniciarJogo = useCallback((proximoTema: IdTema) => {
    definirEstado(construirEstado(proximoTema))
  }, [])

  const novoJogo = useCallback((tema?: IdTema) => {
    iniciarJogo(tema ?? estado.tema)
  }, [iniciarJogo, estado.tema])

  const mudarTema = useCallback((tema: IdTema) => {
    iniciarJogo(tema)
  }, [iniciarJogo])

  const iniciarSelecao = useCallback((posicao: PosicaoCelula) => {
    definirEstado(e => {
      if (e.status !== 'playing') return e
      if (!e.ancoraSelecao) {
        return { ...e, ancoraSelecao: posicao, celdasSelecionadas: [posicao], selecionando: true }
      }
      const celdas = obterCeldasLinha(e.ancoraSelecao, posicao)
      return { ...e, celdasSelecionadas: celdas ?? [posicao], selecionando: true }
    })
  }, [])

  const atualizarSelecao = useCallback((posicao: PosicaoCelula) => {
    definirEstado(e => {
      if (e.status !== 'playing' || !e.ancoraSelecao || !e.selecionando) return e
      const celdas = obterCeldasLinha(e.ancoraSelecao, posicao)
      return { ...e, celdasSelecionadas: celdas ?? [e.ancoraSelecao] }
    })
  }, [])

  const finalizarSelecao = useCallback(() => {
    definirEstado(e => {
      if (e.status !== 'playing' || e.celdasSelecionadas.length < 2) {
        return { ...e, celdasSelecionadas: [], ancoraSelecao: null, selecionando: false }
      }
      const selecionadas = e.celdasSelecionadas
      const correspondencia = e.posicionamentos.find(p =>
        mesmaSequencia(p.celdas, selecionadas) || mesmaSequencia([...p.celdas].reverse(), selecionadas)
      )
      if (correspondencia && !e.idsPalavrasEncontradas.includes(correspondencia.palavra.id)) {
        const proximasEncontradas = [...e.idsPalavrasEncontradas, correspondencia.palavra.id]
        const vencido = proximasEncontradas.length === e.palavras.length
        return {
          ...e,
          idsPalavrasEncontradas: proximasEncontradas,
          celdasSelecionadas: [],
          ancoraSelecao: null,
          selecionando: false,
          status: vencido ? 'won' : 'playing'
        }
      }
      return { ...e, celdasSelecionadas: [], ancoraSelecao: null, selecionando: false }
    })
  }, [])

  const valor: ValorContextoJogo = {
    ...estado,
    tick,
    novoJogo,
    mudarTema,
    iniciarSelecao,
    atualizarSelecao,
    finalizarSelecao
  }

  return <ContextoJogo.Provider value={valor}>{filhos}</ContextoJogo.Provider>
}

/* eslint-disable react-hooks/rules-of-hooks */
export function usarJogo(): ValorContextoJogo {
  const contexto = useContext(ContextoJogo)
  if (!contexto) throw new Error('usarJogo deve ser usado dentro de FornecedorJogo')
  return contexto
}
