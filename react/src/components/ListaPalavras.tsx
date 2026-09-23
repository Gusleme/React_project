import { useGame } from '../store/ContextoJogo'
import { THEME_LABELS } from '../data/temas'

export function WordList() {
  const { words, foundWordIds, theme } = useGame()

  return (
    <aside className="w-full md:w-72 lg:w-80 flex-shrink-0">
      <div className="card animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-extrabold tracking-wide text-lg">
            Palavras ({foundWordIds.length}/{words.length})
          </h2>
          <span className="badge badge-fallback">{THEME_LABELS[theme]}</span>
        </div>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {words.map(word => {
            const found = foundWordIds.includes(word.id)
            return (
              <div
                key={word.id}
                className={`word-item ${found ? 'found' : ''}`}
              >
                <span
                  className="word-check flex-shrink-0"
                  aria-hidden="true"
                >
                  {found ? '&#x2713;' : ''}
                </span>
                <span className="font-base text-sm truncate">{word.text}</span>
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
