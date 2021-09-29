export function centerWordHorizontal(width: number, word: string): number {
  const characters: string[] = word.split('');
  const middle: number = width / 2;
  const centeredWordPosition: number = middle - (characters.length / 2 + 8);
  return centeredWordPosition;
}

export function centeredWordVertical(heigth: number, word: string): number {
  const middle: number = heigth / 2;
  const centeredWordPosition: number = middle - 8 / 2;
  return centeredWordPosition;
}

export function calculateHalfOfHalf(input: number): number {
  const half: number = input / 2;
  return half / 2;
}
