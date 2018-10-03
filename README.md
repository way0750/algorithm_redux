![Better algorithm, better robot](./robot.gif)
# What is this?
Just Bunch of Algorithm and Data Structure Exercise

# Dependencies:
Node version:
If you run into errors while trying to run debugger, it might be that your node version is too old

# Install:
`npm install`

# Debug / Test
This project has been set up to use VS Code to debug each single js/ts file 

go to Debug -> Start Debugging in VS Code, 3 options are available
You should use Mocha, it is the most convenient of 3 options, it has been setup to directly test typescript with mocha and chai.
Example:
```
// make sure to open the console in vs code to see the test results
describe('sample mocha test with chai', () => {
  //'no need to import chai for the "expect" function, it is avaialbe globally
  it('test', () => {
    expect(true).to.be.true;
  });
})
```
In `testing/bootstrap.js` things related to testing are loaded there.
Including the `expect` function, which is assinged to the global scope

## naming convension:
No spaces in path name, else when you run mocha test in terminal, any spaces in path would not
be escaped!
the file with all the test should be named main.js, that's where mocha will look for the specs if you
are running mocha in the terminal

## if you have to run test in terminal
go to any directory with a `main.ts` and run `npm run mochaTest`
this will run ts-mocha's binary in node_module and find the `main.ts` in current working directory

# The Launch.json
this is where the debugging with vs code feature is setup 

it's at `root/.vscode/launch.json`

# typescript typing
the global type file is at `index.d.ts` at the root level
you might want to add all the globally available librarys' type there

# some interesting stuffs:
## execute TypeScipt file without having to compile to JS first

This repo has been setup with ts-node and ts-mocha to make testing typescript files easier without transpiling.

you can probably use ts-node which is a ts run time to execut ts files

then if you can't use it directly, ex, in case of mocha, you can still register ts-node

to make mocha/node to use ts-node to transpile first then feed the file to mocha/node

Specific details are avaialble below:
see: `https://www.npmjs.com/package/ts-node`

some ideas:
`mocha --require ts-node/register --watch-extensions ts,tsx "test/**/*.{ts,tsx}" [...args]`
you might need to look into node --require and the /register see how things work