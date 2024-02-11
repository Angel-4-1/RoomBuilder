export const isNullOrUndefined = (obj: any) => {
  return (obj === null || obj === undefined)
}

export function degToRad(angleInDeg) {
  return angleInDeg * ( Math.PI / 180.0 );
}

export function radToDeg(angleInRad) {
  return angleInRad * ( 180.0 / Math.PI );
}