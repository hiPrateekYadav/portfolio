/** Film-grain texture laid over images. Control strength with an opacity class. */
export default function NoiseOverlay({ className = 'opacity-10' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none bg-[url('/images/noise.png')] bg-[length:220px_220px] bg-repeat ${className}`}
    />
  )
}
