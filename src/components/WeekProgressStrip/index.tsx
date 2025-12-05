import { Colors, Fonts, FontSize } from '@constants';
import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';

type WeekDay = {
  label: string;
  date: number;
  fullDate: string;
  status: 'done' | 'missed' | 'current' | 'future';
};

type Props = {
  week: WeekDay[];
};

export default function WeekProgressStrip({ week = [] }: Props) {
  console.log("this is week",week);
  
  const [cells, setCells] = useState<{ x: number; w: number }[]>(
    Array(7).fill({ x: 0, w: 0 }),
  );
  const rowRef = useRef<View>(null);

  const onCellLayout = (i: number) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setCells(prev => {
      const next = [...prev];
      next[i] = { x, w: width };
      return next;
    });
  };

  // 🔥 FIND ALL STREAK BLOCKS
  const pillBlocks = useMemo(() => {
    const blocks: { from: number; to: number }[] = [];
    let start: number | null = null;

    for (let i = 0; i < week.length; i++) {
      if (week[i].status === 'done') {
        if (start === null) start = i;
      } else {
        if (start !== null) {
          blocks.push({ from: start, to: i - 1 });
          start = null;
        }
      }
    }

    if (start !== null) blocks.push({ from: start, to: week.length - 1 });

    return blocks;
  }, [week]);

  // Convert pill blocks to absolute x/width
  const pillFrames = useMemo(() => {
    if (cells.some(c => c.w === 0)) return [];
    return pillBlocks
      .map(block => {
        const start = cells[block.from];
        const end = cells[block.to];
        if (!start || !end) return null;

        const left = start.x + 2;
        const right = end.x + end.w - 2;
        return {
          left,
          width: right - left,
        };
      })
      .filter(Boolean) as { left: number; width: number }[];
  }, [cells, pillBlocks]);

  return (
    <View style={styles.wrap}>
      {/* Top Labels */}
      <View style={styles.labelsRow}>
        {week.map((d, i) => (
          <View key={`lbl-${i}`} style={styles.cell}>
            <Text style={styles.label}>{d.label}</Text>
          </View>
        ))}
      </View>

      {/* Dates Row */}
      <View ref={rowRef} style={styles.datesRow}>
        {/* 🔥 Render MULTIPLE pills */}
        {pillFrames.map((p, idx) => (
          <View
            key={idx}
            style={[styles.pill, { left: p.left, width: p.width }]}
          />
        ))}

        {week.map((d, i) => {
          const isDone = d.status === "done";
          const isCurrent = d.status === "current";
          const isMissed = d.status === "missed";
          const isFuture = d.status === 'future';
          const isWarning = d.status === "warning";

          return (
            <View
              key={`num-${i}`}
              onLayout={onCellLayout(i)}
              style={[styles.cell, { marginTop: 5 }]}
            >
              {/* Current Day Badge */}
              {isCurrent && (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentTick}>✓</Text>
                </View>
              )}

              {/* Done */}
              {isDone && <Text style={[styles.dateOnPill]}>✓</Text>}

              {/* Missed */}
              {isMissed && <Text style={styles.missed}>✕</Text>}

              {/* Future */}
              {isFuture && !isDone && !isMissed && !isCurrent && (
                <Text style={styles.futureDate}>{d.date}</Text>
              )}
              {isWarning && (
                <View style={styles.warningBadge}>
                  <Text style={styles.warningIcon}>⚠️</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 20 },

  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    paddingVertical: 4,
  },
  cell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#E9FDF2',
    fontSize: 13,
    fontFamily: 'WorkSans-Medium',
  },

  // Pill
  pill: {
    position: 'absolute',
    height: 32,
    borderRadius: 80,
    backgroundColor: '#FC610F94',
    top: 4,
  },

  dateOnPill: {
    fontSize: 15,
    color: '#000',
    fontFamily: Fonts.WorkSans.Bold,
  },

  missed: {
    fontSize: 16,
    color: 'red',
    fontFamily: Fonts.WorkSans.Bold,
  },

  futureDate: {
    fontSize: FontSize.SIXTEEN,
    color: Colors.WHITE,
    fontFamily: Fonts.WorkSans.Medium,
  },

  currentBadge: {
    position: 'absolute',
    right: '4%',
    top: -4.5,
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: '#F7C768',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#A8742C',
    zIndex: 2,
  },
  currentTick: {
    color: '#EA8A00',
    fontSize: 12,
    fontFamily: 'WorkSans-SemiBold',
  },
  warningBadge: {
    position: 'absolute',
    top: -4,
    right: '25%',
    width: 28,
    height: 28,
    borderRadius: 18,
    backgroundColor: '#FFEBCC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF9900',
    zIndex: 3,

  },

  warningIcon: {
    fontSize: FontSize.TWELVE,
    color: '#FF9900',
    fontFamily: Fonts.WorkSans.Bold,
    marginTop: -5,
  },
});
