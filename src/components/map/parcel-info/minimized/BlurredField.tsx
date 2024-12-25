import { useAuth } from "@/components/auth/AuthProvider";

interface BlurredFieldProps {
  value: string;
  onBlurredClick: () => void;
  className?: string;
}

export const BlurredField = ({ value, onBlurredClick, className = "" }: BlurredFieldProps) => {
  const { profile } = useAuth();

  if (profile) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span 
      className={`blur-sm select-none cursor-pointer hover:blur-md transition-all ${className}`}
      onClick={onBlurredClick}
    >
      {value}
    </span>
  );
};