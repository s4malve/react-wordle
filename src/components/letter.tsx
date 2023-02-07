export default function Letter({
  children,
  isSubmiting,
  isWriting,
  bg
}: LetterProps) {
  return (
    <div
      className={`border-2 border-slate-500 dark:border-slate-400 w-10 h-10 text-xl sm:text-2xl sm:w-11 sm:h-11 md:w-14 md:h-14 md:text-3xl flex items-center justify-center rounded font-semibold capitalize transition-[background-color,transform] ${
        isSubmiting ? `animate-flip-with-rotate ${bg}` : ''
      } ${isWriting ? 'animate-scale' : ''}`}
    >
      <div className={`${isSubmiting ? 'animate-reset-flipped-font' : ''}`}>
        {children}
      </div>
    </div>
  )
}

type LetterProps = {
  children?: string
  isWriting?: boolean
  isSubmiting?: boolean
  bg?: string
}
