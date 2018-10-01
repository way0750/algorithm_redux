# What is this?
Just Bunch of Algorithm and Data Structure Exercise

# Install:
`npm install`

# Debug
This project has been set up to use VS Code to debug each single js/ts file 
Just to Debug -> Start Debugging in VS Code to see it yourself

# some interesting stuffs:
## execute TypeScipt file without having to compile to JS first
hate having to compile ts files to js first then perform other tasks like testing?
you can probably use ts-node which is a ts run time to execut ts files
then if you can't use it directly, ex, in case of mocha, you can still register ts-node
to make mocha/node to use ts-node to transpile first then feed the file to mocha/node
see: `https://www.npmjs.com/package/ts-node`
`mocha --require ts-node/register --watch-extensions ts,tsx "test/**/*.{ts,tsx}" [...args]`
you might need to look into node --require and the /register see how things work