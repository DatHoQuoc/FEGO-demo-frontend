import type { GeometryGraph } from "@/types/geometry3d.types"

/**
 * Demo graph: A tetrahedron with labeled vertices, edge lines,
 * a plane, a vector, a sphere, a cylinder, and a cone.
 */
export const demoGraph: GeometryGraph = {
  nodes: [
    // Points (tetrahedron vertices)
    {
      id: "p1",
      type: "point",
      name: "A",
      coordinates: [0, 0, 0],
      properties: { color: "#4a9eff", visible: true },
    },
    {
      id: "p2",
      type: "point",
      name: "B",
      coordinates: [3, 0, 0],
      properties: { color: "#4a9eff", visible: true },
    },
    {
      id: "p3",
      type: "point",
      name: "C",
      coordinates: [1.5, 0, 2.6],
      properties: { color: "#4a9eff", visible: true },
    },
    {
      id: "p4",
      type: "point",
      name: "D",
      coordinates: [1.5, 3, 0.87],
      properties: { color: "#f97316", visible: true },
    },

    // Edges of tetrahedron
    {
      id: "l1",
      type: "line",
      name: "AB",
      coordinates: [0, 0, 0],
      properties: {
        color: "#e2e8f0",
        visible: true,
        from: [0, 0, 0],
        to: [3, 0, 0],
      },
    },
    {
      id: "l2",
      type: "line",
      name: "AC",
      coordinates: [0, 0, 0],
      properties: {
        color: "#e2e8f0",
        visible: true,
        from: [0, 0, 0],
        to: [1.5, 0, 2.6],
      },
    },
    {
      id: "l3",
      type: "line",
      name: "BC",
      coordinates: [3, 0, 0],
      properties: {
        color: "#e2e8f0",
        visible: true,
        from: [3, 0, 0],
        to: [1.5, 0, 2.6],
      },
    },
    {
      id: "l4",
      type: "line",
      name: "AD",
      coordinates: [0, 0, 0],
      properties: {
        color: "#94a3b8",
        visible: true,
        from: [0, 0, 0],
        to: [1.5, 3, 0.87],
        dashed: true,
      },
    },
    {
      id: "l5",
      type: "line",
      name: "BD",
      coordinates: [3, 0, 0],
      properties: {
        color: "#e2e8f0",
        visible: true,
        from: [3, 0, 0],
        to: [1.5, 3, 0.87],
      },
    },
    {
      id: "l6",
      type: "line",
      name: "CD",
      coordinates: [1.5, 0, 2.6],
      properties: {
        color: "#e2e8f0",
        visible: true,
        from: [1.5, 0, 2.6],
        to: [1.5, 3, 0.87],
      },
    },

    // Solid tetrahedron
    {
      id: "s1",
      type: "solid",
      name: "Tetrahedron ABCD",
      coordinates: [0, 0, 0],
      properties: {
        color: "#f97316",
        visible: true,
        opacity: 0.35,
        solidType: "tetrahedron",
        vertices: [
          [0, 0, 0],
          [3, 0, 0],
          [1.5, 0, 2.6],
          [1.5, 3, 0.87],
        ],
        faces: [
          [0, 1, 2],
          [0, 1, 3],
          [1, 2, 3],
          [0, 2, 3],
        ],
      },
    },

    // Vector
    {
      id: "v1",
      type: "vector",
      name: "n",
      coordinates: [-3, 0, 0],
      properties: {
        color: "#eab308",
        visible: true,
        origin: [-3, 0, 0],
        direction: [0, 1, 0],
        length: 3,
      },
    },

    // Sphere
    {
      id: "sp1",
      type: "sphere",
      name: "Sphere S",
      coordinates: [6, 1.5, 0],
      properties: {
        color: "#ec4899",
        visible: true,
        center: [6, 1.5, 0],
        radius: 1.2,
        opacity: 0.5,
      },
    },

    // Cylinder
    {
      id: "cy1",
      type: "cylinder",
      name: "Cylinder",
      coordinates: [-3, 0, 4],
      properties: {
        color: "#14b8a6",
        visible: true,
        baseCenter: [-3, 0, 4],
        topCenter: [-3, 3, 4],
        radius: 0.8,
        opacity: 0.5,
      },
    },

    // Cone
    {
      id: "co1",
      type: "cone",
      name: "Cone",
      coordinates: [6, 0, 4],
      properties: {
        color: "#f43f5e",
        visible: true,
        baseCenter: [6, 0, 4],
        apex: [6, 3, 4],
        radius: 1,
        opacity: 0.5,
      },
    },

    // A plane
    {
      id: "pl1",
      type: "plane",
      name: "Floor plane",
      coordinates: [0, -0.01, 0],
      properties: {
        color: "#06b6d4",
        visible: true,
        opacity: 0.15,
        equation: [0, 1, 0, 0],
      },
    },
  ],
  edges: [
    { from: "p1", to: "p2", relationship: "contains" },
    { from: "p1", to: "p3", relationship: "contains" },
    { from: "p2", to: "p3", relationship: "contains" },
    { from: "p1", to: "p4", relationship: "contains" },
    { from: "p2", to: "p4", relationship: "contains" },
    { from: "p3", to: "p4", relationship: "contains" },
  ],
  metadata: {
    coordinateSystem: "cartesian",
    units: "units",
    bounds: {
      min: [-5, -5, -5],
      max: [10, 10, 10],
    },
  },
}
