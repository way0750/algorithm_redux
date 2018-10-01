// this adds type for expect to the global scope.
// this is available in the global scope because this index.d.ts is at root level
// TODO: should extend any globally available librarys' types to global
declare const expect: Chai.ExpectStatic;