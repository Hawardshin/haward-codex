import { MonitorShell } from "@/components/MonitorShell";
import { snapshot } from "@/lib/snapshot";

export default function Home() {
  return <MonitorShell snapshot={snapshot} />;
}

