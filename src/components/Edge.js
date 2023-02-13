export const Edge = ({ edge }) => {
    const { source, target, dir, p } = edge
    const x1 = source.x * 10 + 50
    const y1 = source.y * 10 + 50
    const x2 = target.x * 10 + 50
    const y2 = target.y * 10 + 50
    const ys = Math.sign(y2 - y1)
    const xs = Math.sign(x2 - x1)

    if ((dir === 'up' || dir === 'down') && x1 !== x2) {
        return <>
            <path
                d={`M ${x1} ${y1} L ${x1} ${y2 - 5 * ys} A 5 5 0 0 ${xs > 0 ? ys > 0 ? 0 : 1 : ys > 0 ? 1 : 0} ${x1 + 5 * xs} ${y2} L ${x2 - 3 * xs} ${y2}`}
                fill="none"
                stroke="black"
                strokeWidth="0.1"
                markerEnd="url(#arrowhead)" />
        </>
    }
    if ((dir === 'left' || dir === 'right') && y1 !== y2) {
        return <>
            <path
                d={`M ${x1} ${y1} L ${x2 - 5 * xs} ${y1} A 5 5 0 0 ${xs > 0 ? ys > 0 ? 1 : 0 : ys > 0 ? 0 : 1} ${x2} ${y1 + 5 * ys} L ${x2} ${y2 - 3 * ys}`}
                fill="none"
                stroke="black"
                strokeWidth="0.1"
                markerEnd="url(#arrowhead)" />
        </>
    }

    return <>
        <line
            x1={x1}
            y1={y1}
            x2={x2 - 3 * xs}
            y2={y2 - 3 * ys}
            stroke="black"
            strokeWidth="0.1"
            markerEnd="url(#arrowhead)" />
    </>
}

export default Edge
