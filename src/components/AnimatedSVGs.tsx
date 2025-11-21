import { useEffect, useRef } from "react";

// Animated Link Chain SVG
export const AnimatedLinkChain = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Left link */}
      <path
        d="M60 80 L60 60 A20 20 0 0 1 80 40 L100 40 A20 20 0 0 1 120 60 L120 80"
        stroke="url(#linkGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
      >
        <animate
          attributeName="stroke-dasharray"
          from="0,200"
          to="200,0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Right link */}
      <path
        d="M140 120 L140 140 A20 20 0 0 1 120 160 L100 160 A20 20 0 0 1 80 140 L80 120"
        stroke="url(#linkGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
      >
        <animate
          attributeName="stroke-dasharray"
          from="0,200"
          to="200,0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Connecting line */}
      <line
        x1="100"
        y1="80"
        x2="100"
        y2="120"
        stroke="url(#linkGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        filter="url(#glow)"
      >
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </line>

      {/* Particles */}
      {[0, 1, 2].map((i) => (
        <circle key={i} r="3" fill="#3b82f6">
          <animateMotion
            path="M60 80 L60 60 A20 20 0 0 1 80 40 L100 40 L100 80 L100 120 L100 160 L80 160 A20 20 0 0 1 60 140 L60 120"
            dur="3s"
            begin={`${i * 1}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin={`${i * 1}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
};

// Sun Icon for Light Mode
export const AnimatedSun = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sunGradient">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
      </defs>

      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 25 * Math.cos(rad);
        const y1 = 50 + 25 * Math.sin(rad);
        const x2 = 50 + 40 * Math.cos(rad);
        const y2 = 50 + 40 * Math.sin(rad);

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#sunGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="2s"
              begin={`${i * 0.1}s`}
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 50 50`}
              to={`360 50 50`}
              dur="20s"
              repeatCount="indefinite"
            />
          </line>
        );
      })}

      {/* Sun center */}
      <circle cx="50" cy="50" r="20" fill="url(#sunGradient)">
        <animate
          attributeName="r"
          values="20;22;20"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Inner glow */}
      <circle
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        opacity="0.5"
      >
        <animate
          attributeName="r"
          values="20;30;20"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.5;0;0.5"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

// Moon Icon for Dark Mode
export const AnimatedMoon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Moon crescent */}
      <path
        d="M 50 10 A 30 30 0 1 0 50 90 A 25 25 0 1 1 50 10"
        fill="url(#moonGradient)"
      >
        <animate
          attributeName="opacity"
          values="0.8;1;0.8"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Stars */}
      {[
        { cx: 20, cy: 25, delay: 0 },
        { cx: 75, cy: 20, delay: 0.5 },
        { cx: 85, cy: 50, delay: 1 },
        { cx: 25, cy: 70, delay: 1.5 },
      ].map((star, i) => (
        <g key={i}>
          <circle cx={star.cx} cy={star.cy} r="2" fill="#fbbf24">
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2s"
              begin={`${star.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
          <line
            x1={star.cx}
            y1={star.cy - 4}
            x2={star.cx}
            y2={star.cy + 4}
            stroke="#fbbf24"
            strokeWidth="1"
            opacity="0.5"
          >
            <animate
              attributeName="opacity"
              values="0.2;0.8;0.2"
              dur="2s"
              begin={`${star.delay}s`}
              repeatCount="indefinite"
            />
          </line>
          <line
            x1={star.cx - 4}
            y1={star.cy}
            x2={star.cx + 4}
            y2={star.cy}
            stroke="#fbbf24"
            strokeWidth="1"
            opacity="0.5"
          >
            <animate
              attributeName="opacity"
              values="0.2;0.8;0.2"
              dur="2s"
              begin={`${star.delay}s`}
              repeatCount="indefinite"
            />
          </line>
        </g>
      ))}
    </svg>
  );
};

// Animated Success Checkmark
export const AnimatedCheckmark = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Circle background */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#checkGradient)"
        strokeWidth="4"
        fill="none"
        strokeDasharray="283"
        strokeDashoffset="283"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="283"
          to="0"
          dur="0.6s"
          fill="freeze"
        />
      </circle>

      {/* Checkmark */}
      <path
        d="M30 50 L45 65 L70 35"
        stroke="url(#checkGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="60"
        strokeDashoffset="60"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="60"
          to="0"
          dur="0.4s"
          begin="0.3s"
          fill="freeze"
        />
      </path>

      {/* Celebration particles */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const startX = 50 + 35 * Math.cos(rad);
        const startY = 50 + 35 * Math.sin(rad);
        const endX = 50 + 60 * Math.cos(rad);
        const endY = 50 + 60 * Math.sin(rad);

        return (
          <circle
            key={i}
            cx={startX}
            cy={startY}
            r="2"
            fill="#10b981"
            opacity="0"
          >
            <animate
              attributeName="cx"
              from={startX}
              to={endX}
              dur="0.6s"
              begin="0.7s"
              fill="freeze"
            />
            <animate
              attributeName="cy"
              from={startY}
              to={endY}
              dur="0.6s"
              begin="0.7s"
              fill="freeze"
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="0.6s"
              begin="0.7s"
              fill="freeze"
            />
          </circle>
        );
      })}
    </svg>
  );
};

// Animated Loading Spinner
export const AnimatedSpinner = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
        </linearGradient>
      </defs>

      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="url(#spinnerGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Inner rotating dots */}
      {[0, 120, 240].map((angle, i) => (
        <circle key={i} r="4" fill="#8b5cf6">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`${angle} 50 50`}
            to={`${angle + 360} 50 50`}
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cx"
            values="50;70;50"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="50;50;50"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
};

// Animated Analytics Chart
export const AnimatedChart = ({ className = "" }: { className?: string }) => {
  const bars = [
    { height: 60, delay: 0 },
    { height: 80, delay: 0.1 },
    { height: 45, delay: 0.2 },
    { height: 90, delay: 0.3 },
    { height: 70, delay: 0.4 },
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Bars */}
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={20 + i * 35}
          y={100 - bar.height}
          width="25"
          height="0"
          fill="url(#barGradient)"
          rx="4"
        >
          <animate
            attributeName="height"
            from="0"
            to={bar.height}
            dur="0.8s"
            begin={`${bar.delay}s`}
            fill="freeze"
          />
          <animate
            attributeName="y"
            from="100"
            to={100 - bar.height}
            dur="0.8s"
            begin={`${bar.delay}s`}
            fill="freeze"
          />
        </rect>
      ))}

      {/* Animated line */}
      <polyline
        points="32.5,40 67.5,20 102.5,55 137.5,10 172.5,30"
        stroke="#10b981"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="300"
        strokeDashoffset="300"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="300"
          to="0"
          dur="1.5s"
          begin="0.5s"
          fill="freeze"
        />
      </polyline>

      {/* Data points */}
      {[32.5, 67.5, 102.5, 137.5, 172.5].map((x, i) => {
        const yValues = [40, 20, 55, 10, 30];
        return (
          <circle key={i} cx={x} cy={yValues[i]} r="0" fill="#10b981">
            <animate
              attributeName="r"
              from="0"
              to="4"
              dur="0.3s"
              begin={`${0.5 + i * 0.2}s`}
              fill="freeze"
            />
          </circle>
        );
      })}
    </svg>
  );
};

// Animated URL Shortening Process
export const AnimatedUrlProcess = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 300 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="urlGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Long URL */}
      <rect
        x="10"
        y="35"
        width="100"
        height="30"
        rx="15"
        stroke="url(#urlGradient)"
        strokeWidth="2"
        fill="none"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1"
          dur="0.5s"
          fill="freeze"
        />
      </rect>

      {/* Arrow with particles */}
      <path
        d="M120 50 L170 50"
        stroke="url(#urlGradient)"
        strokeWidth="2"
        strokeDasharray="50"
        strokeDashoffset="50"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="50"
          to="0"
          dur="0.8s"
          begin="0.5s"
          fill="freeze"
        />
      </path>

      <polygon points="170,50 165,45 165,55" fill="#8b5cf6" opacity="0">
        <animate
          attributeName="opacity"
          values="0;1"
          dur="0.3s"
          begin="1.3s"
          fill="freeze"
        />
      </polygon>

      {/* Particles along arrow */}
      {[0, 1, 2].map((i) => (
        <circle key={i} r="2" fill="#3b82f6" opacity="0">
          <animate
            attributeName="cx"
            from="120"
            to="170"
            dur="0.8s"
            begin={`${0.5 + i * 0.2}s`}
            fill="freeze"
          />
          <animate
            attributeName="cy"
            values="50;45;50"
            dur="0.8s"
            begin={`${0.5 + i * 0.2}s`}
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="0.8s"
            begin={`${0.5 + i * 0.2}s`}
            fill="freeze"
          />
        </circle>
      ))}

      {/* Short URL */}
      <rect
        x="190"
        y="35"
        width="60"
        height="30"
        rx="15"
        stroke="url(#urlGradient)"
        strokeWidth="2"
        fill="none"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1"
          dur="0.5s"
          begin="1.3s"
          fill="freeze"
        />
        <animate
          attributeName="width"
          values="100;60"
          dur="0.5s"
          begin="1.3s"
          fill="freeze"
        />
      </rect>

      {/* Success sparkle */}
      <circle cx="260" cy="40" r="3" fill="#fbbf24" opacity="0">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="0.6s"
          begin="1.8s"
          fill="freeze"
        />
        <animate
          attributeName="r"
          values="0;5;0"
          dur="0.6s"
          begin="1.8s"
          fill="freeze"
        />
      </circle>
    </svg>
  );
};

// Floating Particles Background
export const FloatingParticles = ({
  className = "",
}: {
  className?: string;
}) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="particleGradient">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {particles.map((particle) => (
        <circle
          key={particle.id}
          cx={particle.x}
          cy={particle.y}
          r={particle.size}
          fill="url(#particleGradient)"
        >
          <animate
            attributeName="cy"
            values={`${particle.y};${particle.y - 20};${particle.y}`}
            dur={`${particle.duration}s`}
            begin={`${particle.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.2;0.8;0.2"
            dur={`${particle.duration}s`}
            begin={`${particle.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
};

// Animated Copy Icon
export const AnimatedCopyIcon = ({
  className = "",
  copied = false,
}: {
  className?: string;
  copied?: boolean;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!copied ? (
        <>
          <rect
            x="9"
            y="9"
            width="13"
            height="13"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
            stroke="currentColor"
            strokeWidth="2"
          />
        </>
      ) : (
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="30"
          strokeDashoffset="30"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="30"
            to="0"
            dur="0.5s"
            fill="freeze"
          />
        </path>
      )}
    </svg>
  );
};

// Decorative Light Mode SVG
export const LightModeDecoration = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lightGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="lightGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>

      {/* Floating circles */}
      <circle cx="50" cy="50" r="30" fill="url(#lightGradient1)" opacity="0.3">
        <animate
          attributeName="cy"
          values="50;40;50"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        cx="150"
        cy="150"
        r="40"
        fill="url(#lightGradient2)"
        opacity="0.3"
      >
        <animate
          attributeName="cy"
          values="150;140;150"
          dur="5s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="150" cy="50" r="25" fill="url(#lightGradient1)" opacity="0.2">
        <animate
          attributeName="cx"
          values="150;160;150"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

// Decorative Dark Mode SVG
export const DarkModeDecoration = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="darkGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="darkGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Floating shapes */}
      <circle cx="50" cy="50" r="30" fill="url(#darkGradient1)" opacity="0.2">
        <animate
          attributeName="cy"
          values="50;40;50"
          dur="5s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="150" cy="150" r="40" fill="url(#darkGradient2)" opacity="0.2">
        <animate
          attributeName="cy"
          values="150;160;150"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Stars */}
      {[
        { cx: 30, cy: 150, delay: 0 },
        { cx: 170, cy: 30, delay: 1 },
        { cx: 100, cy: 100, delay: 2 },
      ].map((star, i) => (
        <circle key={i} cx={star.cx} cy={star.cy} r="2" fill="#fbbf24">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="3s"
            begin={`${star.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
};

// Mouse Follower Effect Hook
export const useMouseFollower = () => {
  const followerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      followerRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return followerRef;
};
