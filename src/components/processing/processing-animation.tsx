"use client";

import { cn } from "@/lib/utils";

interface ProcessingAnimationProps {
  type?: "wireframe" | "dots" | "spinner";
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-24 h-24",
  md: "w-40 h-40",
  lg: "w-52 h-52",
};

export function ProcessingAnimation({
  type = "wireframe",
  size = "lg",
}: ProcessingAnimationProps) {
  if (type === "dots") {
    return (
      <div className="flex items-center gap-2" role="status" aria-label="Dang xu ly">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="size-3 rounded-full bg-primary"
            style={{
              animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
            }}
          />
        ))}
        <style>{`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  if (type === "spinner") {
    return (
      <div className={cn("relative", sizeMap[size])} role="status" aria-label="Dang xu ly">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    );
  }

  // Wireframe - rotating 3D polyhedron
  return (
    <div
      className={cn("relative", sizeMap[size])}
      role="status"
      aria-label="Dang xu ly"
      style={{ perspective: "600px" }}
    >
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          animation: "rotateShape 8s linear infinite",
        }}
      >
        {/* Tetrahedron wireframe using SVG */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 size-full"
          style={{
            transformStyle: "preserve-3d",
            animation: "rotateShape2 12s ease-in-out infinite",
          }}
        >
          {/* Main pyramid wireframe */}
          <polygon
            points="100,20 30,160 170,160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary opacity-80"
          />
          <polygon
            points="100,20 30,160 100,120"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/50"
          />
          <polygon
            points="100,20 170,160 100,120"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/50"
          />
          <line
            x1="30"
            y1="160"
            x2="170"
            y2="160"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary opacity-60"
          />
          <line
            x1="100"
            y1="120"
            x2="30"
            y2="160"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="text-primary/40"
          />
          <line
            x1="100"
            y1="120"
            x2="170"
            y2="160"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="text-primary/40"
          />

          {/* Vertex dots */}
          {[
            [100, 20],
            [30, 160],
            [170, 160],
            [100, 120],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="3"
              className="fill-primary"
              style={{
                animation: `pulse 2s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}

          {/* Animated dashed circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="6 6"
            className="text-primary/20"
            style={{ animation: "spin 20s linear infinite" }}
          />
        </svg>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl" />

      <style>{`
        @keyframes rotateShape {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes rotateShape2 {
          0%, 100% { transform: rotateX(0deg) rotateZ(0deg); }
          50% { transform: rotateX(15deg) rotateZ(5deg); }
        }
        @keyframes pulse {
          0%, 100% { r: 3; opacity: 0.8; }
          50% { r: 5; opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); transform-origin: center; }
          to { transform: rotate(360deg); transform-origin: center; }
        }
      `}</style>
    </div>
  );
}
