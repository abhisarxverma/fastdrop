import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadiusSelectType } from "./start-session-dialog";

interface RadiusSelectorProps {
  value: RadiusSelectType;
  onChange: React.Dispatch<React.SetStateAction<RadiusSelectType>>;
}

export default function RadiusSelector({ value, onChange }: RadiusSelectorProps) {

  return (
    <div className="flex flex-col gap-2">
      <Label>Session Radius</Label>

      <Select defaultValue="30" value={String(value)} onValueChange={(val) => onChange(parseInt(val) as RadiusSelectType)}>
        <SelectTrigger className="h-12 bg-muted/40 focus:ring-primary/20">
          <SelectValue placeholder="Select range" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="10">
            Very close <span className="text-muted-foreground">(same room)</span>
          </SelectItem>
          <SelectItem value="30">
            Nearby <span className="text-muted-foreground">(classroom / cafe)</span>
          </SelectItem>
          <SelectItem value="60">
            Around you <span className="text-muted-foreground">(building)</span>
          </SelectItem>
          <SelectItem value="100">
            Wider area <span className="text-muted-foreground">(block)</span>
          </SelectItem>
          <SelectItem value="150">
            Maximum range
          </SelectItem>
        </SelectContent>
      </Select>

      {/* <p className="text-xs text-muted-foreground px-1">
        Controls who can discover this session nearby.
      </p> */}
    </div>
  )
}
