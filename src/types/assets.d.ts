    // src/types/assets.d.ts
declare module '*.jpg' {
  const content: number; // RN bundler returns a number (require id)
  export default content;
}
declare module '*.jpeg' { const content: number; export default content; }
declare module '*.png'  { const content: number; export default content; }
declare module '*.gif'  { const content: number; export default content; }
declare module '*.webp' { const content: number; export default content; }

// (you likely already have this for SVGs, but keep it here for completeness)
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
