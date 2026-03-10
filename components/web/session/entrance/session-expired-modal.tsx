import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SessionExpiredModal({ onExit }: { onExit: () => void }) {
  return (
    <Dialog open>
      <DialogContent className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          This session has ended or expired.
        </p>
        <Button onClick={onExit}>Go to nearby sessions</Button>
      </DialogContent>
    </Dialog>
  );
}
