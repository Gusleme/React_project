import { FornecedorJogo, usarJogo } from './store/ContextoJogo'
import { Cabecalho } from './components/Cabecalho'
import { Grade } from './components/Grade'
import { ListaPalavras } from './components/ListaPalavras'
import { ModalFimDeJogo } from './components/ModalFimDeJogo'
import { obterTodosTemas } from './data/temas'

function TelaJogo() {
  const { status, novoJogo, mudarTema, tema } = usarJogo()
  const temas = obterTodosTemas()

  const proximoTema = () => {
    const indiceAtual = temas.indexOf(tema)
    const proximoIndice = (indiceAtual + 1) % temas.length
    mudarTema(temas[proximoIndice])
  }

  return (
    <main className="app-container">
      <Cabecalho />

      <div className="game-area w-full flex-1 flex overflow-hidden flex-col md:flex-row">
        <section className="card animate-fade-in flex-1 min-w-0 flex flex-col items-center justify-center p-3" aria-label="Área do jogo">
          <Grade />
        </section>

        <ListaPalavras />
      </div>

      {status === 'won' && (
        <ModalFimDeJogo
          aoReiniciar={() => novoJogo(tema)}
          aoFechar={proximoTema}
        />
      )}
    </main>
  )
}

export default function App() {
  return (
    <FornecedorJogo>
      <TelaJogo />
    </FornecedorJogo>
  )
}
