console.log("Input   | Output");
console.log("----------------");

const test1Input = "446443-446449";
const test1Answer = run(test1Input);
console.info("Test1   |", test1Answer);

const exampleInput = Bun.file("inputs/day02.example.txt");
const exampleAnswer = run(await exampleInput.text());
console.log("Example |", exampleAnswer);

const puzzleInput = Bun.file("inputs/day02.puzzle.txt");
const puzzleAnswer = run(await puzzleInput.text());
console.log("Puzzle  |", puzzleAnswer);

export function run(input: string) {
  const ranges = input.split(",");

  const invalidIDs: number[] = [];

  function isInvalid(num: number) {
    const asStr = num.toString();
    if (asStr.length % 2 === 1) {
      return false;
    }
    const index = asStr.length / 2;
    const left = asStr.slice(0, index);
    const right = asStr.slice(index);
    return left === right;
  }

  for (const range of ranges) {
    const [rangeStart, rangeEnd] = range.split("-").map(Number);

    if (!rangeStart || !rangeEnd) {
      continue;
    }

    for (let productId = rangeStart; productId <= rangeEnd; productId++) {
      if (isInvalid(productId)) {
        invalidIDs.push(productId);
      }
    }
  }

  return invalidIDs.reduce((sum, id) => sum + id, 0);
}
