// components/RingGauge.tsx
import React from 'react';
import Svg, { Circle } from 'react-native-svg';

type Ring = {
  value: number;  // 0..1 progress
  color: string;
};

export default function RingGauge({
  size = 120,
  trackColor = '#ECECEC',
  rings = [],
  spacing = 6,       // gap between rings
  strokeWidth = 6,   // same width for all
}: {
  size?: number;
  trackColor?: string;
  rings: Ring[];
  spacing?: number;
  strokeWidth?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;

  return (
    <Svg width={size} height={size}>
      {rings.map((r, i) => {
        // Each ring moves inward by spacing + strokeWidth
        const radius = size / 2 - strokeWidth / 2 - i * (strokeWidth + spacing);
        const circumference = 2 * Math.PI * radius;
        const dash = Math.max(0, r.value) * circumference;

        return (
          <React.Fragment key={i}>
            {/* Track */}
            <Circle
              cx={cx}
              cy={cy}
              r={radius}
              stroke={trackColor}
              strokeWidth={strokeWidth}
              fill="none"
              opacity={0.45}
            />

            {/* Progress */}
            <Circle
              cx={cx}
              cy={cy}
              r={radius}
              stroke={r.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference - dash}`}
              rotation={-90}
              origin={`${cx}, ${cy}`}
              fill="none"
            />
          </React.Fragment>
        );
      })}
    </Svg>
  );
}
