import { busLines, nightBusLines, nightTramLines, tramLines } from "@/constants/vehicle";

export function getLineType(line: string): "tram" | "nightTram" | "bus" | "nightBus" | "unknown" {
  if (nightTramLines.includes(line)) return "nightTram";
  if (nightBusLines.includes(line)) return "nightBus";
  if (tramLines.includes(line)) return "tram";
  if (busLines.includes(line)) return "bus";
  return "unknown";
}
