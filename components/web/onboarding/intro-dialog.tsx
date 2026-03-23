"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Rocket, Share2, MapPin } from "lucide-react";
import Container from "@/components/layouts/container"

export default function IntroDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function checkSeen() {
        const seen = localStorage.getItem("fastdrop_intro_seen");
        if (!seen) {
            setOpen(true);
        }
    }
    checkSeen();
  }, []);

  const handleClose = () => {
    localStorage.setItem("fastdrop_intro_seen", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-w-[560px] overflow-hidden">
        <Container className="py-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Welcome to Fastdrop
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              A faster, cleaner way to share files, code, texts and links with nearby devices.
            </p>
          </DialogHeader>

          <div className="mt-6 space-y-6">

            <div className="flex gap-4">
              <div className="size-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Create a session</p>
                <p className="text-xs text-muted-foreground">
                  Start a session to create a shared space for your lab or team quickly.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="size-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Nearby discovery</p>
                <p className="text-xs text-muted-foreground">
                  Devices around you can instantly find your session using location-based visibility and join your session.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="size-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Start sharing</p>
                <p className="text-xs text-muted-foreground">
                  Upload files, links, or code — everything syncs in real time.
                </p>
              </div>
            </div>

          </div>

          <Separator className="my-6" />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="w-full" onClick={handleClose}>
              Get started
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-muted-foreground"
              onClick={handleClose}
            >
              Skip
            </Button>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
}