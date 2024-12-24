import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface EmailLoginFormProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

export const EmailLoginForm = ({ 
  isLoading, 
  onSubmit, 
  selectedRole,
  onRoleChange 
}: EmailLoginFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Type de compte</Label>
          <RadioGroup
            value={selectedRole}
            onValueChange={onRoleChange}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem
                value="taxpayer"
                id="taxpayer"
                className="peer sr-only"
              />
              <Label
                htmlFor="taxpayer"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Contribuable</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="developer"
                id="developer"
                className="peer sr-only"
              />
              <Label
                htmlFor="developer"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Promoteur</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="commune"
                id="commune"
                className="peer sr-only"
              />
              <Label
                htmlFor="commune"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Commune</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Adresse email</Label>
          <Input
            id="email"
            placeholder="nom@exemple.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            autoCapitalize="none"
            autoComplete="current-password"
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading || !selectedRole}>
          {isLoading && <Mail className="mr-2 h-4 w-4 animate-spin" />}
          Se connecter avec Email
        </Button>
      </div>
    </form>
  );
};