"use client"

import { memo, useEffect, useRef } from "react"
import { useSceneStore } from "@/stores/sceneStore"
import type { GeometryGraph, GeometryNode } from "@/types/geometry3d.types"
import Point3D from "@/components/three/objects/Point3D"
import Line3D from "@/components/three/objects/Line3D"
import Plane3D from "@/components/three/objects/Plane3D"
import Vector3D from "@/components/three/objects/Vector3D"
import Polygon3D from "@/components/three/objects/Polygon3D"
import Solid3D from "@/components/three/objects/Solid3D"
import Sphere3D from "@/components/three/objects/Sphere3D"
import Cylinder3D from "@/components/three/objects/Cylinder3D"
import Cone3D from "@/components/three/objects/Cone3D"

interface SceneManagerProps {
  graph?: GeometryGraph
}

function renderNode(node: GeometryNode) {
  switch (node.type) {
    case "point":
      return <Point3D key={node.id} node={node} />
    case "line":
      return <Line3D key={node.id} node={node} />
    case "plane":
      return <Plane3D key={node.id} node={node} />
    case "vector":
      return <Vector3D key={node.id} node={node} />
    case "polygon":
      return <Polygon3D key={node.id} node={node} />
    case "solid":
      return <Solid3D key={node.id} node={node} />
    case "sphere":
      return <Sphere3D key={node.id} node={node} />
    case "cylinder":
      return <Cylinder3D key={node.id} node={node} />
    case "cone":
      return <Cone3D key={node.id} node={node} />
    default:
      return null
  }
}

function SceneManager({ graph: externalGraph }: SceneManagerProps) {
  const storeGraph = useSceneStore((s) => s.graph)
  const setGraph = useSceneStore((s) => s.setGraph)
  const hiddenIds = useSceneStore((s) => s.hiddenIds)
  const initialized = useRef(false)

  const graph = externalGraph ?? storeGraph

  // Sync external graph to store
  useEffect(() => {
    if (externalGraph && !initialized.current) {
      setGraph(externalGraph)
      initialized.current = true
    } else if (externalGraph) {
      setGraph(externalGraph)
    }
  }, [externalGraph, setGraph])

  const visibleNodes = graph.nodes.filter(
    (n) => n.properties.visible !== false && !hiddenIds.has(n.id)
  )

  return <group>{visibleNodes.map(renderNode)}</group>
}

export default memo(SceneManager)
