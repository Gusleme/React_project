export type IdTema = 'animais' | 'frutas' | 'cores' | 'tecnologia' | 'escola' | 'natureza' | 'profissoes'

export type DirecaoPalavra = 'horizontal' | 'vertical' | 'diagonal-down' | 'diagonal-up'

export interface PosicaoCelula {
  linha: number
  coluna: number
}

export interface CelulaGrade {
  id: string
  letra: string
  posicao: PosicaoCelula
}

export interface Palavra {
  id: string
  texto: string
  normalizado: string
  categoria: IdTema
}

export interface PosicaoPalavra {
  palavra: Palavra
  direcao: DirecaoPalavra
  inicio: PosicaoCelula
  celdas: PosicaoCelula[]
}

export interface ConfiguracaoJogo {
  tamanhoGrade: number
  palavrasPorJogo: number
  temaPadrao: IdTema
  temas: readonly IdTema[]
}

export type StatusJogo = 'playing' | 'won'

export interface EstadoJogo {
  status: StatusJogo
  configuracao: ConfiguracaoJogo
  tema: IdTema
  palavras: Palavra[]
  grade: CelulaGrade[][]
  posicionamentos: PosicaoPalavra[]
  idsPalavrasEncontradas: string[]
  celdasSelecionadas: PosicaoCelula[]
  ancoraSelecao: PosicaoCelula | null
  selecionando: boolean
  segundosDecorridos: number
}

export interface ValorContextoJogo extends EstadoJogo {
  tick: () => void
  novoJogo: (tema?: IdTema) => void
  mudarTema: (tema: IdTema) => void
  iniciarSelecao: (posicao: PosicaoCelula) => void
  atualizarSelecao: (posicao: PosicaoCelula) => void
  finalizarSelecao: () => void
}
