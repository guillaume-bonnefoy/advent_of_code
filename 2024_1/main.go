package main

import (
	"log"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
)

// var input string = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3
// `

var total int = 0

func main() {
	input, err := os.ReadFile("input.txt")
	if err != nil {
		return
	}

	lines := strings.Split(strings.TrimSpace(string(input)), "\n")

	sliceLeft := []int{}
	sliceRight := []int{}
	numberCountRight := make(map[int]int)

	// Split the input strings into left and right array
	// and count occurrence of each number in the right array 
	for _, line := range lines {
		subStrings := strings.Split(string(line), "   ")

		for i, str := range subStrings {
			value, err := strconv.Atoi(str)
			if err != nil {
				continue
			}
			if i == 0 {
				sliceLeft = append(sliceLeft, value)
			} else {
				sliceRight = append(sliceRight, value)
				numberCountRight[value]++
			}
		}
	}

	sort.Ints(sliceLeft)
	sort.Ints(sliceRight)

	totalDifference := 0
	totalSimilarity := 0

	for i, coordLeft := range sliceLeft {
		// Calculate difference
		coordinateRight := sliceRight[i]
		difference := int(math.Abs(float64(coordLeft - coordinateRight)))
		totalDifference += difference

		// Calculate similarity
		similarity := numberCountRight[coordLeft] * coordLeft
		totalSimilarity += similarity
	}

	log.Printf("totalDifference: %v\n", totalDifference)
	log.Printf("totalSimilarity: %v\n", totalSimilarity)
}
