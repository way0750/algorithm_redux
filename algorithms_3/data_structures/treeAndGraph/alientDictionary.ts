export function getDict(words) {
    const graph = {
        // w: { visited, sortedChars: null/[] edges: [] }
        // if visited but sortedChars is null then that's a infinite loop
        //  if there are chars in it, take them
    };
    words.forEach((word) => {
        for (let i = 0; i < word.length-1; i++) {
            const char = word[i];
            const nextChar = word[i+1];
            if (char !== nextChar) {
                graph[char] = graph[char] || { visited: false, chars: null, edges: [] };
                const uniqTo = graph[char].edges.every((edge) => edge !== nextChar);
                if (uniqTo) {
                    graph[char].edges.push(nextChar);
                }
                graph[nextChar] = graph[nextChar] || { visited: false, chars: null, edges: [] };
            }
        }
    });

    for (let i = 0; i < words.length-1; i++) {
        const word = words[i];
        const nextWord = words[i+1];
        // find the first char that's different between them
        const minLength = Math.min(word.length, nextWord.length);
        let from;
        let to;
        for (let j = 0; j < minLength; j++) {
            if (!from && word[j] !== nextWord[j]) {
                from = word[j];
                to = nextWord[j];
            }
        }

        const uniqTo = graph[from].edges.every((edge) => edge !== to);
        if (from && uniqTo) {
            graph[from].edges.push(to);
        }
    }

    function search (char) {
        graph[char].visited = true;
        if (graph[char].edges.length === 0) {
            graph[char].chars = '';
            return char;
        } else if (graph[char].chars === '') {
            return graph[char].chars;
        } else if (graph[char].visited && graph[char].chars === null ) {
            return null;
        }

        let orderedChars = [];
        for (let i = 0; i < graph[char].edges.lenght; i++) {
            const edge = graph[char].edges[i];
            const returnVal = search(edge);
            if (returnVal === null) {
                return null;
            }
            orderedChars.unshift(search(edge));
        }
        graph[char].chars = '';
        return [char, ...orderedChars].join('');
    }

    const sortedChars = [];
    const allChars = Object.keys(graph);
    for (let i = 0; i < allChars.length; i++) {
        const char = allChars[i];
        const returnVal = search(char);
        if (returnVal === null) {
            return null;
        }
        sortedChars.unshift(returnVal);
    }
    return sortedChars;
}

describe('should work', () => {
    it('should work', () => {
        const words = ["wrt","wrf","er","ett","rftt"];
        expect(getDict(words)).to.equal([]);
    });
});

