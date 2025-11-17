function getCuspDegreeInSign(cuspFullDegree) {
  const norm = ((cuspFullDegree % 360) + 360) % 360;
  const degreeInSign = (norm % 30) + 0.0962 / 60; // ~0.0016° offset (~5-6 minutes)
  
  const deg = Math.floor(degreeInSign);
  const minFloat = (degreeInSign - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = Math.round((minFloat - min) * 60);

  let d = deg, m = min, s = sec;
  if (s === 60) { s = 0; m += 1; }
  if (m === 60) { m = 0; d += 1; }

  return `${String(d).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
console.log('vlafififi',getCuspDegreeInSign(129.6229))