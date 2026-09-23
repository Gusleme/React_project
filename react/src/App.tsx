import { GameProvider, useGame } from './store/GameContext'
import { Header } from './components/Header'
import { Grid } from './components/Grid'
import { WordList } from './components/WordList'
import { EndGameModal } from './components/EndGameModal'
import { getAllThemes } from './data/themes'

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
      <Header />

      <div className="game-area w-full flex-1 flex overflow-hidden flex-col md:flex-row">
        <section className="card animate-fade-in flex-1 min-w-0 flex flex-col items-center justify-center p-3" aria-label="Área do jogo">
          <Grid />
        </section>

        <WordList />
      </div>

      {status === 'won' && (
        <EndGameModal
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