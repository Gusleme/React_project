import type { Palavra, PosicaoPalavra, ConfiguracaoJogo, DirecaoPalavra, PosicaoCelula, CelulaGrade } from '../types/game'

const DIRECOES: Record<DirecaoPalavra, [number, number]> = {
  horizontal: [0, 1],
  vertical: [1, 0],
  'diagonal-down': [1, 1],
  'diagonal-up': [-1, 1]
}

const CHAVES_DIRECAO: DirecaoPalavra[] = ['horizontal', 'vertical', 'diagonal-down', 'diagonal-up']

function inteiroAleatorio(maximo: number): number {
  return Math.floor(Math.random() * maximo)
}

function embaralhar<T>(vetor: T[]): T[] {
  const copia = [...vetor]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = inteiroAleatorio(i + 1)
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

function podeColocar(
  grade: string[][],
  palavra: Palavra,
  inicio: PosicaoCelula,
  direcao: DirecaoPalavra,
  tamanhoGrade: number
): boolean {
  const [dr, dc] = DIRECOES[direcao]
  const tamanho = palavra.normalizado.length
  const linhaFim = inicio.linha + dr * (tamanho - 1)
  const colunaFim = inicio.coluna + dc * (tamanho - 1)

  if (linhaFim < 0 || linhaFim >= tamanhoGrade || colunaFim < 0 || colunaFim >= tamanhoGrade) return false

  for (let i = 0; i < tamanho; i++) {
    const l = inicio.linha + dr * i
    const c = inicio.coluna + dc * i
    const existente = grade[l][c]
    if (existente !== '' && existente !== palavra.normalizado[i]) return false
  }
  return true
}

function colocarPalavra(
  grade: string[][],
  palavra: Palavra,
  inicio: PosicaoCelula,
  direcao: DirecaoPalavra
): PosicaoCelula[] {
  const [dr, dc] = DIRECOES[direcao]
  const tamanho = palavra.normalizado.length
  const celdas: PosicaoCelula[] = []

  for (let i = 0; i < tamanho; i++) {
    const l = inicio.linha + dr * i
    const c = inicio.coluna + dc * i
    grade[l][c] = palavra.normalizado[i]
    celdas.push({ linha: l, coluna: c })
  }
  return celdas
}

function encontrarPosicionamento(
  grade: string[][],
  palavra: Palavra,
  tamanhoGrade: number
): { inicio: PosicaoCelula; direcao: DirecaoPalavra; celdas: PosicaoCelula[] } | null {
  const direcoes = embaralhar([...CHAVES_DIRECAO])
  const posicoes: PosicaoCelula[] = []
  for (let l = 0; l < tamanhoGrade; l++) {
    for (let c = 0; c < tamanhoGrade; c++) posicoes.push({ linha: l, coluna: c })
  }
  embaralhar(posicoes)

  for (const direcao of direcoes) {
    for (const inicio of posicoes) {
      if (podeColocar(grade, palavra, inicio, direcao, tamanhoGrade)) {
        const celdas = colocarPalavra(grade, palavra, inicio, direcao)
        return { inicio, direcao, celdas }
      }
    }
  }
  return null
}

function preencherVazio(grade: string[][], tamanhoGrade: number): void {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let l = 0; l < tamanhoGrade; l++) {
    for (let c = 0; c < tamanhoGrade; c++) {
      if (grade[l][c] === '') {
        grade[l][c] = letras[inteiroAleatorio(letras.length)]
      }
    }
  }
}

function gradeParaCeldas(grade: string[][], tamanhoGrade: number): CelulaGrade[][] {
  const resultado: CelulaGrade[][] = []
  for (let l = 0; l < tamanhoGrade; l++) {
    const linha: CelulaGrade[] = []
    for (let c = 0; c < tamanhoGrade; c++) {
      linha.push({
        id: `${l},${c}`,
        letra: grade[l][c],
        posicao: { linha: l, coluna: c }
      })
    }
    resultado.push(linha)
  }
  return resultado
}

export function gerarGrade(palavras: Palavra[], configuracao: ConfiguracaoJogo): { grade: CelulaGrade[][]; posicionamentos: PosicaoPalavra[] } {
  const maxTentativas = 100
  const palavrasOrdenadas = [...palavras].sort((a, b) => b.normalizado.length - a.normalizado.length)

  for (let tentativa = 0; tentativa < maxTentativas; tentativa++) {
    const gradeVazia = Array.from({ length: configuracao.tamanhoGrade }, () =>
      Array.from({ length: configuracao.tamanhoGrade }, () => '')
    )
    const posicionamentos: PosicaoPalavra[] = []
    let sucesso = true

    for (const palavra of palavrasOrdenadas) {
      const posicionamento = encontrarPosicionamento(gradeVazia, palavra, configuracao.tamanhoGrade)
      if (!posicionamento) {
        sucesso = false
        break
      }
      posicionamentos.push({
        palavra,
        direcao: posicionamento.direcao,
        inicio: posicionamento.inicio,
        celdas: posicionamento.celdas
      })
    }

    if (sucesso) {
      preencherVazio(gradeVazia, configuracao.tamanhoGrade)
      const grade = gradeParaCeldas(gradeVazia, configuracao.tamanhoGrade)
      return { grade, posicionamentos }
    }
  }

  throw new Error('Não foi possível gerar a grade após múltiplas tentativas')
}
