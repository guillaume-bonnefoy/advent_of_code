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
const inputString = testInput.trim()

console.log(`
—————————————————————————————————————————————————————————————————————
‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿୨   PARSING   ୧‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿
—————————————————————————————————————————————————————————————————————`)
const rawLines = inputString.trim().split('\n')

type Line = {
  expectedResult: number
  numbers: number[]
  validCombinations: number
}

const formattedLines: Line[] = []

for (const rawLine of rawLines) {
  const expectedResult = parseInt(rawLine.split(': ')[0])
  const numbers = rawLine.split(': ')[1].split(' ').map(Number)
  formattedLines.push({ expectedResult, numbers, validCombinations: 0 })
}

console.log(formattedLines)

console.log(`
—————————————————————————————————————————————————————————————————————
‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿୨   COMPUTING   ୧‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵
—————————————————————————————————————————————————————————————————————`)

function computeValidCombinations(line: Line, operation: 'add' | 'multiply') {
  const lineNumbers = structuredClone(line.numbers)
  while (lineNumbers.length > 1) {
    const a = lineNumbers.shift() as number
    const b = lineNumbers.shift() as number
    let result = operation === 'add' ? a + b : a * b

    if (result === line.expectedResult && !lineNumbers.length) {
      line.validCombinations++
      return true
    }

    if (!lineNumbers.length) {
      return false
    }

    const validAdd = computeValidCombinations({
      numbers: [result, ...lineNumbers],
      expectedResult: line.expectedResult,
      validCombinations: line.validCombinations,
    }, 'add')

    const validMultiply = computeValidCombinations({
      numbers: [result, ...lineNumbers],
      expectedResult: line.expectedResult,
      validCombinations: line.validCombinations,
    }, 'multiply')

    if (validAdd || validMultiply) return true
  }

  return false
}

let sumOfValidCombinations = 0

formattedLines.forEach((line) => {
  // console.log(line.expectedResult, '----------------')
  const isValidAdd = computeValidCombinations(line, 'add')
  const isValidMultiply = computeValidCombinations(line, 'multiply')
  const isEitherValid = isValidAdd || isValidMultiply
  // console.log(isEitherValid ? '🎉' : '❌')
  // console.log('\n')
  isEitherValid && (sumOfValidCombinations += line.expectedResult)
})

console.log('🚨 Sum of valid combinations:', sumOfValidCombinations)
