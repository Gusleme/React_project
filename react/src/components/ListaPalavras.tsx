import { usarJogo } from '../store/ContextoJogo'
import { ROTULO_TEMAS } from '../data/temas'

export function ListaPalavras() {
  const { palavras, idsPalavrasEncontradas, tema } = usarJogo()

  return (
    <aside className="w-full md:w-72 lg:w-80 flex-shrink-0">
      <div className="card animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-extrabold tracking-wide text-lg">
            Palavras ({idsPalavrasEncontradas.length}/{palavras.length})
          </h2>
          <span className="badge badge-fallback">{ROTULO_TEMAS[tema]}</span>
        </div>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {palavras.map(palavra => {
            const encontrada = idsPalavrasEncontradas.includes(palavra.id)
            return (
              <div
                key={palavra.id}
                className={`word-item ${encontrada ? 'found' : ''}`}
              >
                <span
                  className="word-check flex-shrink-0"
                  aria-hidden="true"
                >
                  {encontrada ? '&#x2713;' : ''}
                </span>
                <span className="font-base text-sm truncate">{palavra.texto}</span>
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
