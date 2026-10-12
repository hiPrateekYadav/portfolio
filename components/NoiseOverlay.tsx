/** Film-grain texture laid over images. Control strength with an opacity class. */
export default function NoiseOverlay({ className = 'opacity-10' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none bg-[length:220px_220px] bg-repeat ${className}`}
      style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/noise.png)` }}
    />
  )
}
