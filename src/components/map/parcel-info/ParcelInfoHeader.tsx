interface ParcelInfoHeaderProps {
  title: string;
  ownerName: string;
  isMinimized: boolean;
  isDragging: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
}

export const ParcelInfoHeader = ({
  title,
  ownerName,
  isMinimized,
  isDragging,
  onToggleMinimize,
  onClose,
}: ParcelInfoHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {!isMinimized && <p className="text-sm text-muted-foreground">{ownerName}</p>}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMinimize}
          className="p-1 hover:bg-accent rounded-sm transition-colors"
        >
          {isMinimized ? (
            <span className="sr-only">Maximize</span>
          ) : (
            <span className="sr-only">Minimize</span>
          )}
        </button>
        <button
          onClick={onClose}
          className="p-1 hover:bg-accent rounded-sm transition-colors"
        >
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
};