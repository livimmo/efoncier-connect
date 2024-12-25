import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  onChange?: (value: number) => void;
  children: React.ReactNode;
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, value, onChange, children, ...props }, ref) => {
    const items = React.Children.toArray(children);
    
    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        <div className="flex items-center">
          {items.map((item, index) => {
            const isCompleted = value > index;
            const isCurrent = value === index;
            
            return (
              <React.Fragment key={index}>
                <div 
                  className={cn(
                    "relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary",
                    !isCompleted && !isCurrent && "border-muted"
                  )}
                  onClick={() => onChange?.(index)}
                  style={{ cursor: onChange ? 'pointer' : 'default' }}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className={cn(
                      "text-sm font-medium",
                      isCurrent && "text-primary",
                      !isCurrent && "text-muted-foreground"
                    )}>
                      {index + 1}
                    </span>
                  )}
                </div>
                {index < items.length - 1 && (
                  <div 
                    className={cn(
                      "flex-1 h-0.5 mx-2",
                      isCompleted ? "bg-primary" : "bg-muted"
                    )} 
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex justify-between px-2">
          {items.map((item, index) => {
            const StepItem = item as React.ReactElement;
            return (
              <div key={index} className="text-center flex-1">
                <div className="text-sm font-medium">
                  {StepItem.props.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {StepItem.props.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
Steps.displayName = "Steps";

interface StepsItemProps {
  title: string;
  description?: string;
}

export const StepsItem: React.FC<StepsItemProps> = () => {
  return null; // This is just a data component
};

interface StepsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export const StepsContent = React.forwardRef<HTMLDivElement, StepsContentProps>(
  ({ value, children, className, ...props }, ref) => {
    const items = React.Children.toArray(children);
    const currentItem = items[value];

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {currentItem}
      </div>
    );
  }
);
StepsContent.displayName = "StepsContent";