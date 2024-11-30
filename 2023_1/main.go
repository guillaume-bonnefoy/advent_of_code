package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
	"os"
)

var inputTest string = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
nada
treb7uchet
`

var total int = 0

func main() {
	input, err := os.ReadFile("input.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	lines := strings.Split(string(input), "\n")

	for index, line := range lines {
		if len(line) == 0 {
			continue
		}

		fmt.Printf("--------\nLine: %v\n", line)
		var frontString, backString rune

		for _, char := range line {
			if unicode.IsDigit(char) {
				frontString = char
				break
			}
		}

		if frontString == 0 {
			fmt.Printf("No int at line %v", index)
			continue
		}

		for i := len(line) - 1; i >= 0; i-- {
			var char = rune(line[i])
			if unicode.IsDigit(char) {
				backString = char
				break
			}
		}

		var concatString = string(frontString) + string(backString)
		fmt.Printf("This line string is %v", concatString)
		concatInt, err := strconv.Atoi(concatString)
		if err != nil {
			fmt.Println("Error converting string to int:", err)
			continue
		}
		total += concatInt

		fmt.Printf("New total at line %v : %v\n", index, total)
	}
}
