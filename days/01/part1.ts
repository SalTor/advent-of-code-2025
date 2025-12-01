console.log("Input   | Output");
console.log("----------------");

const exampleInput = Bun.file("inputs/day01.example.txt");
const exampleAnswer = run(await exampleInput.text());
console.log("Example |", exampleAnswer);

const puzzleInput = Bun.file("inputs/day01.puzzle.txt");
const puzzleAnswer = run(await puzzleInput.text());
console.log("Puzzle  |", puzzleAnswer);

// Secret Entrance
export class Safe {
  position: number;

  constructor() {
    this.position = 50;
  }

  rotateRight(clicks: number) {
    const next = this.position + clicks;

    if (next > 99) {
      this.position = next - 99 - 1;
    } else {
      this.position = next;
    }
  }

  rotateLeft(clicks: number) {
    const next = this.position - clicks;

    if (next < 0) {
      this.position = 99 + next + 1;
    } else {
      this.position = next;
    }
  }
}

export function run(input: string) {
  const moves = input.split("\n").filter(Boolean);

  const safe = new Safe();

  let count = 0;

  for (const move of moves) {
    const [, direction, _clicks] = move.match(/([R|L])(\d+)/) || [];
    if (!direction || !_clicks) {
      continue;
    }
    const clicks = parseInt(_clicks);

    switch (direction) {
      case "L":
        safe.rotateLeft(clicks);
        break;
      case "R":
        safe.rotateRight(clicks);
        break;
      default:
        continue;
    }

    if (safe.position === 0) {
      count++;
    }
  }

  return count;
}
