import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
}

export const MessageDialog = ({ open, onOpenChange, title }: MessageDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Message</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{title}</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Plus tard
            </Button>
            <Button onClick={() => navigate('/messages')}>
              Répondre maintenant
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};