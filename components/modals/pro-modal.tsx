"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useProModal } from "@/hooks/user-pro-modal";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

const ProModal = () => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogTitle className="p-0">
          <div className="aspect-video relative flex items-center justify-center">
            <Image src="/hero.svg" alt="Hero" className="object-cover" fill />
          </div>
        </DialogTitle>
         
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-se text-xl">Upgrade to Taskify Pro Today!</h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            className="w-full"
            variant="primary"
            disabled={isLoading}
            onClick={onClick}
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
