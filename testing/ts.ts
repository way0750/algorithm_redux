function randonConsoleLog(thing: string) {
  console.log(Math.random());
  const what = 999;
  console.log(what);
}
for (let index = 1; index <= 100; index++) {
  setTimeout(() => {
    randonConsoleLog('' + 99);
  }, 1000);
}