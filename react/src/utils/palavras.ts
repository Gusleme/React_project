export function normalizarPalavra(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
}

export function criarPalavra(texto: string, categoria: string, indice: number): import('../types/game').Palavra {
  const normalizado = normalizarPalavra(texto)
  return {
    id: `${categoria}-${indice}-${normalizado}`,
    texto,
    normalizado,
    categoria: categoria as import('../types/game').IdTema
  }
}

export function chavePosicao(posicao: import('../types/game').PosicaoCelula): string {
  return `${posicao.linha},${posicao.coluna}`
}

export function saoPosicoesIguais(a: import('../types/game').PosicaoCelula, b: import('../types/game').PosicaoCelula): boolean {
  return a.linha === b.linha && a.coluna === b.coluna
}

export function obterCeldasLinha(
  inicio: import('../types/game').PosicaoCelula,
  fim: import('../types/game').PosicaoCelula
): import('../types/game').PosicaoCelula[] | null {
  const dr = Math.sign(fim.linha - inicio.linha)
  const dc = Math.sign(fim.coluna - inicio.coluna)
  const diferencaLinha = Math.abs(fim.linha - inicio.linha)
  const diferencaColuna = Math.abs(fim.coluna - inicio.coluna)

  const reta = diferencaLinha === 0 || diferencaColuna === 0 || diferencaLinha === diferencaColuna
  if (!reta) return null

  const passos = Math.max(diferencaLinha, diferencaColuna)
  const celdas: import('../types/game').PosicaoCelula[] = []

  for (let i = 0; i <= passos; i++) {
    celdas.push({ linha: inicio.linha + dr * i, coluna: inicio.coluna + dc * i })
  }

  return celdas
}

export function mesmaSequencia(
  a: import('../types/game').PosicaoCelula[],
  b: import('../types/game').PosicaoCelula[]
): boolean {
  if (a.length !== b.length) return false
  return a.every((posicao, i) => saoPosicoesIguais(posicao, b[i]))
}
