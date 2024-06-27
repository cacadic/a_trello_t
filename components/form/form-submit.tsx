"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FormButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
}

const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "default",
}: FormButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={disabled || pending}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  );
};

export default FormSubmit;
