'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ToggleProps {
  checked: boolean
  onChange: (val: boolean) => void
  requireConfirmation?: boolean
  confirmationMessage?: string
  affectedCount?: number
  label?: string
  disabled?: boolean
}

export default function Toggle({
  checked,
  onChange,
  requireConfirmation = false,
  confirmationMessage,
  affectedCount,
  label,
  disabled = false,
}: ToggleProps) {
  const [confirming, setConfirming] = useState(false)

  function handleClick() {
    if (disabled) return
    if (requireConfirmation && checked) {
      setConfirming(true)
    } else {
      onChange(!checked)
    }
  }

  function confirm() {
    onChange(false)
    setConfirming(false)
  }

  function cancel() {
    setConfirming(false)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        {label && (
          <span className="text-[13px]" style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}>
            {label}
          </span>
        )}
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={handleClick}
          className={cn(
            'relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)] flex-shrink-0',
            checked ? 'bg-[var(--teal)]' : 'bg-[var(--p3)]',
            disabled && 'opacity-40 cursor-not-allowed'
          )}
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          <span
            className={cn(
              'inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200',
              checked ? 'translate-x-4' : 'translate-x-1'
            )}
            style={{ willChange: 'transform' }}
          />
        </button>
      </div>

      {confirming && (
        <div
          className="rounded-[8px] p-2.5 text-[12px]"
          style={{
            background: 'rgba(244,166,35,0.08)',
            border: '1px solid rgba(244,166,35,0.25)',
            color: 'var(--text)',
          }}
        >
          <p className="mb-2" style={{ color: '#f4a623' }}>
            {confirmationMessage ||
              `Tắt tính năng này${affectedCount ? ` sẽ ảnh hưởng ${affectedCount} users đang hoạt động` : ''}. Xác nhận?`}
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={confirm}
              className="px-2.5 py-1 rounded text-[11px] font-semibold"
              style={{ background: 'rgba(230,57,70,0.2)', color: '#E63946', border: '1px solid rgba(230,57,70,0.3)' }}
            >
              Xác nhận
            </button>
            <button
              onClick={cancel}
              className="px-2.5 py-1 rounded text-[11px] font-semibold"
              style={{ background: 'var(--p3)', color: 'var(--text2)', border: '1px solid var(--border)' }}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
