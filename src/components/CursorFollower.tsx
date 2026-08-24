import { useEffect, useRef, useState } from 'react'

export default function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const [active, setActive] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY } }
    const onEnter = () => setActive(true)
    const onLeave = () => setActive(false)
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    let raf: number
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15
      if (ref.current) {
        ref.current.style.left = pos.current.x + 'px'
        ref.current.style.top = pos.current.y + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`fixed w-5 h-5 border border-saif-text rounded-full pointer-events-none z-[9999] mix-blend-difference transition-[transform,opacity] duration-150 ${
        active ? 'opacity-100 scale-150' : 'opacity-0 scale-100'
      } ${clicking ? 'scale-75' : ''}`}
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  )
}
