import type { GameState } from '@customTypes/game-state'

export default function GameModal({ gameState, handleClose }: GameModalProps) {
  const { message, title } = gameState ?? {}

  return (
    <div
      className='fixed inset-0 w-full h-full bg-slate-900/10 grid place-items-center'
      tabIndex={0}
      onClick={handleClose}
    >
      <div className='w-full max-w-sm rounded-lg p-6 bg-slate-100 text-slate-900 flex flex-col items-center text-center z-20'>
        <h2 className='font-semibold text-3xl mb-2'>{title}</h2>
        <p className='text-slate-500'>{message}</p>
      </div>
    </div>
  )
}

type GameModalProps = {
  gameState: GameState
  handleClose: () => void
}
