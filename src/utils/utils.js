export function color(percantege) {
    return (percantege <= 25 ? "green" : percantege <= 85 ? "yellow" : "red")
}