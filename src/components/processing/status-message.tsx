"use client";

interface StatusMessageProps {
  message: string;
}

export function StatusMessage({ message }: StatusMessageProps) {
  return (
    <div className="text-center">
      <p className="text-lg font-medium text-foreground">
        {message}
        <span className="inline-block w-8 text-left animate-ellipsis" />
      </p>
      <style>{`
        @keyframes ellipsis {
          0% { content: ''; }
          25% { content: '.'; }
          50% { content: '..'; }
          75% { content: '...'; }
          100% { content: ''; }
        }
        .animate-ellipsis::after {
          content: '';
          animation: ellipsis 1.5s steps(4, end) infinite;
        }
      `}</style>
    </div>
  );
}
