import { Input } from "@/components/ui/input";
import { NearbySession } from "@/types/sessions";

interface SessionCodeGateProps {
    sessionData: NearbySession;
}

export function SessionCodeGate({ sessionData }: SessionCodeGateProps) {
  return (
    <div className="h-full flex-1 flex items-center justify-center">
      <div className="flex flex-col gap-3 items-center">
        <div>
          <h3>{sessionData.title}</h3>
          <p>Please enter session code</p>
        </div>

        <Input
          inputMode="numeric"
          maxLength={6}
          placeholder="••••••"
          className="text-center tracking-widest text-lg"
        />
      </div>
    </div>
  );
}
