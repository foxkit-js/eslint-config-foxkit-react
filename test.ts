// this file exists just so that typescript linting is actually ran

const nums = Array<number>(25)
  .fill(0)
  .map((_, i) => i);
const map = new Map<"even" | "uneven", number[]>();

for (const num of nums) {
  const key = num % 2 == 1 ? "uneven" : "even";
  let arr = map.get(key);
  if (!arr) {
    arr = [];
    map.set(key, arr);
  }
  arr.push(num);
}

// funfact for those actually looking at this file: Map.groupBy is supported now, use that instead of doing a loop like above
