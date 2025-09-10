import { busLines, nightBusLines, nightTramLines, tramLines } from "@/constants/vehicle";
export function getLineType(line) {
    if (nightTramLines.includes(line))
        return "nightTram";
    if (nightBusLines.includes(line))
        return "nightBus";
    if (tramLines.includes(line))
        return "tram";
    if (busLines.includes(line))
        return "bus";
    return "unknown";
}
