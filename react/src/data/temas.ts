import type { ThemeId } from '../types/game'

export const THEME_LABELS: Record<ThemeId, string> = {
  animais: 'Animais',
  frutas: 'Frutas',
  cores: 'Cores',
  tecnologia: 'Tecnologia',
  escola: 'Escola',
  natureza: 'Natureza',
  profissoes: 'Profissões'
}

const LOCAL_THEME_WORDS: Record<ThemeId, readonly string[]> = {
  animais: [
    'CACHORRO', 'GATO', 'ELEFANTE', 'GIRAFA', 'LEAO', 'TIGRE', 'ZEBRA', 'MACACO',
    'CAVALO', 'VACA', 'OVELHA', 'PORCO', 'GALINHA', 'PATO', 'PEIXE', 'TARTARUGA',
    'COBRA', 'LAGARTO', 'SAPO', 'ABELHA', 'BORBOLETA', 'ARANHA', 'FORMIGA', 'MOSCA'
  ],
  frutas: [
    'BANANA', 'MACA', 'LARANJA', 'UVA', 'MORANGO', 'ABACAXI', 'MANGA', 'MELANCIA',
    'KIWI', 'PERA', 'PESSEGO', 'AMEIXA', 'CEREJA', 'FRAMBOESA', 'AMORA', 'MIRTILO',
    'GOIABA', 'MARACUJA', 'CAJU', 'ACEROLA', 'JABUTICABA', 'PITAIA', 'CARAMELADA', 'JACA'
  ],
  cores: [
    'VERMELHO', 'AZUL', 'VERDE', 'AMARELO', 'LARANJA', 'ROXO', 'ROSA', 'MARROM',
    'PRETO', 'BRANCO', 'CINZA', 'DOURADO', 'PRATEADO', 'BEJE', 'TURQUESA', 'VIOLETA',
    'INDIGO', 'CARMESIM', 'ESMERALDA', 'SAFIRA', 'AMBAR', 'CORAL', 'MAGENTA', 'OLIVA'
  ],
  tecnologia: [
    'COMPUTADOR', 'TECLADO', 'MOUSE', 'MONITOR', 'IMPRESSORA', 'ROTEADOR', 'SERVIDOR', 'CLOUD',
    'ALGORITMO', 'BANCO', 'DADOS', 'REDE', 'CODIGO', 'SISTEMA', 'APLICATIVO', 'INTERNET',
    'PROTOCOLO', 'FIREWALL', 'CRIPTOGRAFIA', 'INTELIGENCIA', 'ROBO', 'DRONE', 'SENSOR', 'IOT'
  ],
  escola: [
    'PROFESSOR', 'ALUNO', 'CADEIRA', 'MESA', 'QUADRO', 'GIZ', 'LAPIS', 'CANETA',
    'BORRACHA', 'REGUA', 'COMPASSO', 'TRANSPORTADOR', 'CALCULADORA', 'CADERNO', 'LIVRO', 'MOCHILA',
    'BIBLIOTECA', 'LABORATORIO', 'GINASIO', 'CANTEIRO', 'DIRETOR', 'COORDENADOR', 'SECRETARIA', 'PATIO'
  ],
  natureza: [
    'FLORESTA', 'RIO', 'MONTANHA', 'VALLE', 'LAGO', 'MAR', 'PRAIA', 'ILHA',
    'VULCAO', 'DESERTO', 'CAVERNA', 'CACHOEIRA', 'GEISER', 'GELO', 'NEVE', 'CHUVA',
    'TEMPESTADE', 'ARCOIRIS', 'NEVOA', 'BRISA', 'VENTO', 'TERREMOTO', 'TSUNAMI', 'AVALANCHE'
  ],
  profissoes: [
    'MEDICO', 'ENFERMEIRO', 'ADVOGADO', 'ENGENHEIRO', 'ARQUITETO', 'PROFESSOR', 'BOMBEIRO', 'POLITICO',
    'JORNALISTA', 'ESCRITOR', 'ARTISTA', 'MUSICO', 'ATOR', 'DANCARINO', 'CHEFE', 'GERENTE',
    'DESENVOLVEDOR', 'DESIGNER', 'CIENTISTA', 'PESQUISADOR', 'AGRICULTOR', 'PESCADOR', 'MINEIRO', 'OPERARIO'
  ]
}

export function getThemeWords(theme: ThemeId): readonly string[] {
  return LOCAL_THEME_WORDS[theme]
}

export function getAllThemes(): readonly ThemeId[] {
  return Object.keys(LOCAL_THEME_WORDS) as ThemeId[]
}