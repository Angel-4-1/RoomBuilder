export const isNullOrUndefined = (obj: any) => {
  return (obj === null || obj === undefined)
}

export function degToRad(angleInDeg: number) {
  return angleInDeg * ( Math.PI / 180.0 );
}

export function radToDeg(angleInRad: number) {
  return angleInRad * ( 180.0 / Math.PI );
}