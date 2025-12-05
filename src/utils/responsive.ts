    // src/utils/responsive.ts
import { Dimensions, PixelRatio } from 'react-native';

const guidelineBaseWidth = 375;  // iPhone 11 width
const guidelineBaseHeight = 812; // iPhone 11 height

/** Scales a size based on the smaller of width/height scale.
 *  This keeps sizes sane on tall phones & tablets.
 *  Clamps the result to avoid extremes across devices.
 */
export function normalize(
  size: number,
  {
    minScale = 0.85, // don’t go below 85% of base
    maxScale = 1.35, // don’t exceed 135% of base
  }: { minScale?: number; maxScale?: number } = {}
) {
  const { width, height } = Dimensions.get('window');

  // Scale by both dimensions, then use the smaller (safer on tablets)
  const scaleW = width / guidelineBaseWidth;
  const scaleH = height / guidelineBaseHeight;
  const chosenScale = Math.min(scaleW, scaleH);

  // Clamp to avoid over/under-scaling
  const clampedScale = Math.max(minScale, Math.min(chosenScale, maxScale));

  // Round to nearest pixel for crisp text
  const newSize = size * clampedScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/** If you want to DISABLE accessibility auto-scaling for a given Text,
 *  pass allowFontScaling={false} to <Text>. Otherwise, the OS will also
 *  scale fonts according to user settings (recommended).
 */
    