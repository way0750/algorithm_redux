export function ladderLength(beginWord, endWord, wordList) {
    const graph = {
        // word: { edges: [word1, word2], visited: false };
    };
    const allWords = [beginWord, ...wordList, endWord];
    allWords.forEach((word, index) => {
        for (let i = index + 1; i < allWords.length; i++) {
            // comapre letter by letter here:
            let diffCount = 0;
            const nextWord = allWords[i];
            for (let j = 0; j < word.length; j++) {
                if (word[j] !== nextWord[j]) {
                    diffCount++;
                }
            }
            if (diffCount < 2) {
                graph[word] = graph[word] || { edges: [], visited: false };
                graph[word].edges.push(nextWord);
                graph[nextWord] = graph[nextWord] || { edges: [], visited: false };
                graph[nextWord].edges.push(word);
            }
        }
    });

    function search(curWord, stepCount) {
        stepCount++;
        if (curWord === endWord) {
            return stepCount;
        } else if (graph[curWord].edges.length === 0) {
            return null;
        }
        const subSteps = [];
        graph[curWord].visited = true;
        graph[curWord].edges.forEach((word) => {
            if (!graph[word].visited) {
                const step = search(word, stepCount);
                if (step !== null) {
                    subSteps.push(step);
                }
            }
        });

        graph[curWord].visited = false;
        return subSteps.length ? Math.min(...subSteps) : null;
    }

    const stepCount = search(beginWord, 0);
    return stepCount === null ? 0 : stepCount;
}

describe('should return the step count', () => {
    it('should return 5', () => {
        let beginWord = "hit";
        let endWord = "cog";
        let wordList = ["hot","dot","dog","lot","log","cog"];
        expect(ladderLength(beginWord, endWord, wordList)).to.equal(5);
    });
});