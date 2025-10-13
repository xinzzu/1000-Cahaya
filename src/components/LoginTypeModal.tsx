"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface LoginTypeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginTypeModal({ isOpen, onClose }: LoginTypeModalProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleSelect = (type: "individu" | "lembaga") => {
    router.push(`/login?type=${type}`)
    onClose()
  }

  if (!mounted || !isOpen) return null

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-2xl p-6 w-full max-w-[380px] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        style={{
          position: 'relative',
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-center mb-6 text-black">
          Masuk sebagai apa?
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Individu Button */}
          <button
            onClick={() => handleSelect("individu")}
            className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-primary/20 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 active:scale-95"
          >
            <Image
              src="/Individu.svg"
              alt="Individu"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            <span className="text-sm font-medium text-black">Individu</span>
          </button>

          {/* Lembaga Button */}
          <button
            onClick={() => handleSelect("lembaga")}
            className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-primary/20 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 active:scale-95"
          >
            <Image
              src="/Building.svg"
              alt="Lembaga"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            <span className="text-sm font-medium text-black">Lembaga</span>
          </button>
        </div>
      </div>
    </div>
  )

  const portalRoot = document.getElementById("modal-root")
  return portalRoot ? createPortal(modalContent, portalRoot) : null
}