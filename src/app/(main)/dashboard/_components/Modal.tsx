'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type ModalProps = {
  trigger: React.ReactNode;
  title: string;
  children: (onSuccess: () => void) => React.ReactNode;
};

function Modal({ trigger, title, children }: ModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className="sr-only">{title}</DialogDescription>
        {children(() => setOpen(false))}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
