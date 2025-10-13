"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface RegisterTypeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegisterTypeModal({ isOpen, onClose }: RegisterTypeModalProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Prevent body scroll
  useEffect(() => {
    setMounted(true)
    
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }
    
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleSelect = (type: "individu" | "lembaga") => {
    router.push(`/register?type=${type}`)
    onClose()
  }

  if (!isOpen || !mounted) return null

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-[380px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <h2 className="text-lg font-semibold text-center mb-6">
          Daftar sebagai apa?
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

  return createPortal(modalContent, document.getElementById("modal-root")!)
}