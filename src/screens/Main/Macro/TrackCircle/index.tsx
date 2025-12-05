import { FontSize } from '@constants';
import React from 'react';
import Svg, { G, Circle, Text as SvgText } from 'react-native-svg';

type Slice = { value: number; color: string; label?: string };

type Props = {
  size?: number;
  thickness?: number;
  gap?: number;               // degrees between slices
  data: Slice[];
  backgroundColor?: string;
  innerBg?: string;
  showPercent?: boolean;
  minLabelAngleDeg?: number;  // hide labels on very small slices
};

// …rest of imports

export default function DonutChart({
  size = 220,
  thickness = 28,
  gap = 1,
  data,
  backgroundColor = '#7B3AED',
  innerBg = '#7B3AED',
  showPercent = true,
  minLabelAngleDeg = 10,
}: Props) {
  const radius = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const total = data.reduce((s, d) => s + Math.max(0, d.value), 0) || 1;
  const circumference = 2 * Math.PI * radius;

  // 0° at top for label math (kept as-is)
  const polarToCartesian = (angleDeg: number, r: number) => {
    const a = (angleDeg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  let startAngle = 0;

  return (
    <Svg width={size} height={size}>
      <Circle cx={cx} cy={cy} r={size / 2} fill={backgroundColor} />

      {data.map((d, i) => {
        const pct = d.value / total;
        const sweep = Math.max(pct * 360 - gap, 0);
        const segLen = Math.max((sweep / 360) * circumference, 0);
        const rest = Math.max(circumference - segLen, 0);

        const midAngle = startAngle + sweep / 2;
        const labelPos = polarToCartesian(midAngle, radius);
        const pctText = `${Math.round(pct * 100)}%`;

        // advance to next slice
        const rotate = startAngle;
        startAngle += sweep + gap;

        return (
          <G key={i}>
            <Circle
              cx={cx}
              cy={cy}
              r={radius}
              stroke={d.color}
              strokeWidth={thickness}
              strokeDasharray={`${segLen} ${rest}`}
              // <<< align arc start to 12 o'clock >>>
              rotation={rotate - 90}
              originX={cx}
              originY={cy}
              strokeLinecap="butt"
              fill="none"
            />
            {showPercent && sweep >= minLabelAngleDeg && (
              <SvgText
                x={labelPos.x}
                y={labelPos.y}
                fontSize={FontSize.TEN}
                fontWeight="600"
                fill="#FFFFFF"
                textAnchor="middle"
                dy="0.35em"
              >
                {pctText}
              </SvgText>
            )}
          </G>
        );
      })}

      <Circle cx={cx} cy={cy} r={radius - thickness / 2} fill={innerBg} />
    </Svg>
  );
}

