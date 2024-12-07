console.time('Execution time')

const testInput = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`

const fullInput = await Deno.readTextFile('input.txt')
const inputString = fullInput.trim()

console.log(`
—————————————————————————————————————————————————————————————————————
‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿୨   PARSING   ୧‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿
—————————————————————————————————————————————————————————————————————`)
const rawLines = inputString.trim().split('\n')

type Line = {
  expectedResult: number
  numbers: number[]
}

const formattedLines: Line[] = []

for (const rawLine of rawLines) {
  const expectedResult = parseInt(rawLine.split(': ')[0])
  const numbers = rawLine.split(': ')[1].split(' ').map(Number)
  formattedLines.push({ expectedResult, numbers })
}

console.log(formattedLines)

console.log(`
—————————————————————————————————————————————————————————————————————
‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿୨   COMPUTING   ୧‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵
—————————————————————————————————————————————————————————————————————`)

function computeValidCombinations(line: Line, operation: 'add' | 'multiply' | 'concat') {
  const lineNumbers = structuredClone(line.numbers)
  while (lineNumbers.length > 1) {
    const a = lineNumbers.shift() as number
    const b = lineNumbers.shift() as number

    let result = 0
    if (operation === 'add') result = a + b
    if (operation === 'multiply') result = a * b
    if (operation === 'concat') result = Number(`${a}${b}`)

    if (result === line.expectedResult && !lineNumbers.length) {
      return true
    }

    if (!lineNumbers.length) {
      return false
    }

    const validAdd = computeValidCombinations({
      numbers: [result, ...lineNumbers],
      expectedResult: line.expectedResult,
    }, 'add')

    const validMultiply = computeValidCombinations({
      numbers: [result, ...lineNumbers],
      expectedResult: line.expectedResult,
    }, 'multiply')

    const validConcat = computeValidCombinations({
      numbers: [result, ...lineNumbers],
      expectedResult: line.expectedResult,
    }, 'concat')

    if (validAdd || validMultiply || validConcat) return true
  }

  return false
}

let sumOfValidCombinations = 0
let numberOfValidCombinations = 0

formattedLines.forEach((line) => {
  const isValidAdd = computeValidCombinations(line, 'add')
  const isValidMultiply = computeValidCombinations(line, 'multiply')
  const isValidConcat = computeValidCombinations(line, 'concat')
  const isEitherValid = isValidAdd || isValidMultiply || isValidConcat
  isEitherValid && (sumOfValidCombinations += line.expectedResult)
  isEitherValid && numberOfValidCombinations++
  // console.log(isEitherValid ? '✅' : '❌', line.expectedResult)

  process.stdout.write(`\rProcessing line ${formattedLines.indexOf(line) + 1}/${formattedLines.length} | ${numberOfValidCombinations} valid combinations`)
})

console.log('🚨 Sum of valid combinations:', sumOfValidCombinations)
console.timeEnd('Execution time')