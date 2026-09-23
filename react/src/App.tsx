import { GameProvider, useGame } from './store/ContextoJogo'
import { Cabecalho } from './components/Cabecalho'
import { Grade } from './components/Grade'
import { ListaPalavras } from './components/ListaPalavras'
import { ModalFimDeJogo } from './components/ModalFimDeJogo'
import { getAllThemes } from './data/temas'

function GameScreen() {
  const { status, newGame, changeTheme, theme } = useGame()
  const themes = getAllThemes()

  const handleNextTheme = () => {
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    changeTheme(themes[nextIndex])
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
          onRestart={() => newGame(theme)}
          onClose={handleNextTheme}
        />
      )}
    </main>
  )
}

export default function App() {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  )
}