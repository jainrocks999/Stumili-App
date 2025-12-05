// src/constants/fontSizes.ts
import { normalize } from "@utils/responsive";

const FontSizes = {
  get EIGHT() { return normalize(8); },
  get NINE() { return normalize(9); },
  get TEN() { return normalize(10); },
  get ELEVEN() { return normalize(11); },
  get TWELVE() { return normalize(12); },
  get THIRTEEN() { return normalize(13); },
  get FOURTEEN() { return normalize(14); },
  get FIFTEEN() { return normalize(15); },
  get SIXTEEN() { return normalize(16); },
  get SEVENTEEN() { return normalize(17); },
  get EIGHTEEN() { return normalize(18); },
  get NINETEEN() { return normalize(19); },
  get TWENTY() { return normalize(20); },
  get TWENTY_ONE() { return normalize(21); },
  get TWENTY_TWO() { return normalize(22); },
  get TWENTY_THREE() { return normalize(23); },
  get TWENTY_FOUR() { return normalize(24); },
  get TWENTY_FIVE() { return normalize(25); },
} as const;

export default FontSizes;
