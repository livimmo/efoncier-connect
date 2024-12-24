import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: () => void;
}

interface OTPSlot {
  char: string;
  hasFakeCaret: boolean;
  isActive: boolean;
}

export const OTPInput = ({ value, onChange, onComplete }: OTPInputProps) => {
  return (
    <div className="grid gap-4">
      <InputOTP
        value={value}
        onChange={(value) => {
          onChange(value);
          if (value.length === 6 && onComplete) {
            onComplete();
          }
        }}
        maxLength={6}
        render={({ slots }) => (
          <InputOTPGroup className="gap-2">
            {slots?.map((slot: OTPSlot, index: number) => (
              <InputOTPSlot key={index} {...slot} index={index} />
            )) || null}
          </InputOTPGroup>
        )}
      />
    </div>
  );
};