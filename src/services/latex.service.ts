import type { Geometry2DGraph } from "@/types/geometry2d.types"

/**
 * Generate LaTeX/TikZ code from a 2D geometry graph.
 */
export function generateTikZCode(
  graph: Geometry2DGraph,
  scale = 0.025
): string {
  const lines: string[] = []
  lines.push("\\begin{tikzpicture}")

  // Draw axes
  lines.push("  \\draw[->,gray] (-5,0) -- (5,0) node[right] {$x$};")
  lines.push("  \\draw[->,gray] (0,-5) -- (0,5) node[above] {$y$};")
  lines.push("")

  // Draw polygons first (behind other elements)
  for (const poly of graph.polygons) {
    const pts = poly.vertices
      .map((v) => `(${(v.x * scale).toFixed(2)},${(-v.y * scale).toFixed(2)})`)
      .join(" -- ")
    const fill = poly.filled ? `fill=${poly.color ?? "blue"}, fill opacity=0.2, ` : ""
    lines.push(`  \\draw[${fill}thick] ${pts} -- cycle;`)
  }

  // Draw lines
  for (const line of graph.lines) {
    const style = line.dashed ? "dashed, " : ""
    const color = line.color ? `${line.color}, ` : ""
    const fx = (line.from.x * scale).toFixed(2)
    const fy = (-line.from.y * scale).toFixed(2)
    const tx = (line.to.x * scale).toFixed(2)
    const ty = (-line.to.y * scale).toFixed(2)
    lines.push(`  \\draw[${style}${color}thick] (${fx},${fy}) -- (${tx},${ty});`)
  }

  // Draw circles
  for (const circle of graph.circles) {
    const cx = (circle.center.x * scale).toFixed(2)
    const cy = (-circle.center.y * scale).toFixed(2)
    const r = (circle.radius * scale).toFixed(2)
    const fill = circle.filled ? "fill=blue!20, " : ""
    lines.push(`  \\draw[${fill}thick] (${cx},${cy}) circle (${r});`)
  }

  // Draw points (with labels)
  for (const pt of graph.points) {
    const px = (pt.x * scale).toFixed(2)
    const py = (-pt.y * scale).toFixed(2)
    const label = pt.label ?? pt.id
    lines.push(
      `  \\fill (${px},${py}) circle (2pt) node[above right] {$${label}$};`
    )
  }

  // Labels
  for (const lbl of graph.labels) {
    const lx = (lbl.position.x * scale).toFixed(2)
    const ly = (-lbl.position.y * scale).toFixed(2)
    lines.push(`  \\node at (${lx},${ly}) {${lbl.text}};`)
  }

  lines.push("\\end{tikzpicture}")
  return lines.join("\n")
}
