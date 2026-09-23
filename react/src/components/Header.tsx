import { useGame } from '../store/GameContext'
import { THEME_LABELS, getAllThemes } from '../data/themes'
import { useState, useRef, useEffect } from 'react'

export function Header() {
  const { status, theme, newGame, changeTheme } = useGame()
  const themes = getAllThemes()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="header animate-fade-in">
      <div className="brand">
        <span className="logo-mark">🔍</span>
        <span className="logo-text">Caça-Palavras</span>
      </div>

      <div className="header-actions">
        <div className="menu-container" ref={menuRef}>
          <button
            className="btn-icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Selecionar tema"
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            title="Temas"
          >
            ☰
          </button>
          <div
            className={`dropdown ${!isMenuOpen ? 'hidden' : ''}`}
            role="menu"
            aria-label="Selecionar tema"
          >
            {themes.map(t => (
              <button
                key={t}
                className={`dropdown-item ${theme === t ? 'active' : ''}`}
                role="menuitem"
                onClick={() => { changeTheme(t); setIsMenuOpen(false); }}
              >
                {THEME_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => newGame(theme)}
          disabled={status !== 'playing'}
          className="btn-icon"
          aria-label="Novo jogo"
          title="Novo Jogo"
        >
          ↻
        </button>
      </div>
    </header>
  )
}