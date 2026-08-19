const colors = [
    "#F87171", "#FB923C", "#FBBF24", "#FACC15",
    "#A3E635", "#4ADE80", "#34D399", "#2DD4BF",
    "#22D3EE", "#38BDF8", "#60A5FA", "#818CF8",
    "#A78BFA", "#C084FC", "#E879F9", "#F472B6",
    "#FB7185", "#F97316", "#EAB308", "#84CC16",
    "#10B981", "#06B6D4", "#3B82F6", "#8B5CF6",
];


export function getColorFromString(string) {
    let hash = 0;

    for (let i = 0; i < string.length; i++) {
        hash ^= string.charCodeAt(i);
        hash = Math.imul(hash, 0x5bd1e995);
        hash ^= hash >>> 13;
    }

    hash = Math.imul(hash ^ (hash >>> 16), 0x85ebca6b);
    hash = Math.imul(hash ^ (hash >>> 13), 0xc2b2ae35);
    hash ^= hash >>> 16;

    return colors[(hash >>> 0) % colors.length];
}
