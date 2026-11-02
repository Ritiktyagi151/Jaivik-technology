"use client";

import React, { useState, useEffect } from "react";

interface DottedNeonProgressProps {
  duration?: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
}

const DottedNeonProgress: React.FC<DottedNeonProgressProps> = ({
  duration = 10000,
  size = 320,
  strokeWidth = 10,
  showPercentage = true,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [rotationOffset, setRotationOffset] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (currentProgress / 100) * circumference;

  // Name updated to "LOADER" here
  const styleConfig = {
    dashArray: "8,4,2,4,8,15",
    glowColor: "#fca5a5",
    animation: "animate-pulse",
    name: "LOADER", 
  };

  useEffect(() => {
    setIsAnimating(true);
    setCurrentProgress(0);

    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnimating(false);
          return 100;
        }
        return prev + 100 / (duration / 60);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [duration]);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotationOffset((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(rotationInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(239, 68, 68, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
            animation: "backgroundShift 20s linear infinite",
          }}
        />
      </div>

      {/* Glow Effect */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at center, ${styleConfig.glowColor}15 0%, ${styleConfig.glowColor}08 30%, transparent 70%)`,
          transform: `rotate(${rotationOffset}deg)`,
        }}
      />

      {/* Displaying the Name "LOADER" */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 mb-2 tracking-widest">
          {styleConfig.name.toUpperCase()}
        </h1>
      </div>

      <div className="relative">
        <div className="relative">
          {/* Outer Particle Ring */}
          <svg
            width={size + 40}
            height={size + 40}
            className="absolute -top-5 -left-5 animate-spin"
            style={{ animationDuration: "30s" }}
          >
            {[...Array(24)].map((_, i) => {
              const angle = i * 15 * (Math.PI / 180);
              const x = (size + 40) / 2 + (radius + 25) * Math.cos(angle);
              const y = (size + 40) / 2 + (radius + 25) * Math.sin(angle);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="2"
                  fill={styleConfig.glowColor}
                  className="opacity-40 animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    filter: `drop-shadow(0 0 4px ${styleConfig.glowColor})`,
                  }}
                />
              );
            })}
          </svg>

          {/* Progress Ring */}
          <svg
            width={size}
            height={size}
            className="transform -rotate-90 relative z-10"
            style={{
              filter: `drop-shadow(0 0 20px ${styleConfig.glowColor}) drop-shadow(0 0 40px ${styleConfig.glowColor}80) drop-shadow(0 0 60px ${styleConfig.glowColor}40)`,
            }}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(55, 65, 81, 0.6)"
              strokeWidth={strokeWidth + 2}
              fill="transparent"
              strokeDasharray={styleConfig.dashArray}
              className="opacity-30"
            />

            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#dottedGradient)"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={styleConfig.dashArray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />

            <defs>
              <linearGradient id="dottedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f87171" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {showPercentage && (
                <>
                  <div
                    className="text-5xl font-bold text-red-400 mb-2 tabular-nums"
                    style={{
                      textShadow: `0 0 20px ${styleConfig.glowColor}`,
                      fontFamily: "monospace",
                    }}
                  >
                    {Math.round(currentProgress)}%
                  </div>
                  <div className="text-red-300 text-sm font-semibold tracking-[0.2em] uppercase">
                    {isAnimating ? "● LOADING ●" : "★ COMPLETE ★"}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes backgroundShift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </div>
  );
};

export default DottedNeonProgress;