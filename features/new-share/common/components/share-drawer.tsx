"use client"

import * as React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"
import { IoClose } from "react-icons/io5"

interface ShareDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function ShareDrawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: ShareDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={(val) => !val && onClose()}>
      <DrawerContent
        className="
          ml-auto
          h-screen
          w-full
          max-w-full
          sm:w-full
          lg:w-[80vw]
          lg:max-w-[80vw]
          rounded-none
        "
      >
        {/* Header */}
        <DrawerHeader className="flex items-start justify-between gap-4 border-b px-6 py-4">
          <div className="flex flex-col gap-1">
            <DrawerTitle className="text-2xl font-semibold">
              {title}
            </DrawerTitle>
            {description && (
              <DrawerDescription className="text-sm text-muted-foreground">
                {description}
              </DrawerDescription>
            )}
          </div>

          <DrawerClose asChild>
            <button
              onClick={onClose}
              className="rounded-md p-2 transition hover:bg-muted"
              aria-label="Close"
            >
              <IoClose size={22} />
            </button>
          </DrawerClose>
        </DrawerHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t px-6 py-4">
            {footer}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
