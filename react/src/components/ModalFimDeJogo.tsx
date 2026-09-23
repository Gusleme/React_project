import { usarJogo } from '../store/ContextoJogo'

function formatarTempo(segundos: number): string {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

interface PropsModalFimDeJogo {
  aoReiniciar: () => void
  aoFechar: () => void
}

export function ModalFimDeJogo({ aoReiniciar, aoFechar }: PropsModalFimDeJogo) {
  const { segundosDecorridos, palavras, idsPalavrasEncontradas } = usarJogo()

  return (
    <div
      className="modal-overlay animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="victory-title"
    >
      <div className="modal-content animate-slide-up">
        <div className="modal-header">
          <h2 id="victory-title">Vitoria!</h2>
          <button
            className="btn-icon"
            onClick={aoFechar}
            aria-label="Fechar"
          >
            &#215;
          </button>
        </div>
        <div className="modal-body text-center">
          <p className="mb-6">Você encontrou todas as palavras!</p>

          <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-lg">
            <div style={{ backgroundColor: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <p className="font-extrabold text-2xl">{formatarTempo(segundosDecorridos)}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Tempo</p>
            </div>
            <div style={{ backgroundColor: 'var(--color-correct)', color: 'var(--color-correct-text)' }}>
              <p className="font-extrabold text-2xl">{idsPalavrasEncontradas.length}</p>
              <p className="text-xs opacity-90">Encontradas</p>
            </div>
            <div style={{ backgroundColor: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <p className="font-extrabold text-2xl">{palavras.length}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Total</p>
            </div>
          </div>

          <div className="btn-row">
            <button
              onClick={aoReiniciar}
              className="btn btn-primary"
            >
              &#8635; Jogar Novamente
            </button>
            <button
              onClick={aoFechar}
              className="btn btn-secondary"
            >
              &#9679; Novo Tema
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
