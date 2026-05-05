"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "danger";
  children: React.ReactNode;
}

export function SubmitButton({ children, className, variant, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastPending, setLastPending] = useState(false);

  useEffect(() => {
    if (lastPending && !pending) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
    setLastPending(pending);
  }, [pending, lastPending]);

  return (
    <Button 
      {...props as any}
      variant={showSuccess ? "secondary" : variant}
      disabled={pending || props.disabled}
      className={cn(
        "transition-all duration-300 min-w-[100px]",
        showSuccess && "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20",
        className
      )}
    >
      {pending ? (
        <Loader2 className="size-3 animate-spin" />
      ) : showSuccess ? (
        <Check className="size-3" />
      ) : null}
      
      <span>
        {pending ? "Salvando..." : showSuccess ? "Salvo!" : children}
      </span>
    </Button>
  );
}
