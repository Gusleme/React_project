import { usarJogo } from '../store/ContextoJogo'
import { ROTULO_TEMAS, obterTodosTemas } from '../data/temas'
import { useState, useRef, useEffect } from 'react'

export function Cabecalho() {
  const { status, tema, novoJogo, mudarTema } = usarJogo()
  const temas = obterTodosTemas()
  const [menuAberto, definirMenuAberto] = useState(false)
  const referenciaMenu = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clicarFora = (evento: MouseEvent) => {
      if (referenciaMenu.current && !referenciaMenu.current.contains(evento.target as Node)) {
        definirMenuAberto(false)
      }
    }
    document.addEventListener('mousedown', clicarFora)
    return () => document.removeEventListener('mousedown', clicarFora)
  }, [])

  return (
    <header className="header animate-fade-in">
      <div className="brand">
        <span className="logo-mark">CP</span>
        <span className="logo-text">Caça-Palavras</span>
      </div>

      <div className="header-actions">
        <div className="menu-container" ref={referenciaMenu}>
          <button
            className="btn-icon"
            onClick={() => definirMenuAberto(!menuAberto)}
            aria-label="Selecionar tema"
            aria-haspopup="true"
            aria-expanded={menuAberto}
            title="Temas"
          >
            &#9776;
          </button>
          <div
            className={`dropdown ${!menuAberto ? 'hidden' : ''}`}
            role="menu"
            aria-label="Selecionar tema"
          >
            {temas.map(t => (
              <button
                key={t}
                className={`dropdown-item ${tema === t ? 'active' : ''}`}
                role="menuitem"
                onClick={() => { mudarTema(t); definirMenuAberto(false); }}
              >
                {ROTULO_TEMAS[t]}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => novoJogo(tema)}
          disabled={status !== 'playing'}
          className="btn-icon"
          aria-label="Novo jogo"
          title="Novo Jogo"
        >
          &#8635;
        </button>
      </div>
    </header>
  )
}
