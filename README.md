
# Indepth JavaScript - JavaScript Coding Notebook built with React, TypeScript, and Redux

This coding notebook is the JavaScript equivalent of the Jupyter Python Notebook. You can add multiple code cells, add code to the cells, and preview the output in the adjacent preview window. You can also add a markdown cells to take notes, with a preview window included for each cell.

## Cumlative Code Execution 

Just like a Jupyter Notebook, this coding notebook has cumlative code execution. Any variable or function defined in a previous code cell is avaliable in the current code cell.

## ESBuild and Unpkg for Transpiling and Bundling Code 

I use ESBuild to quickly transpile and bundle code inputted by user in code cells - it's actually much faster than webpack. 

*Also user can import almost any npm module by placing `import` statement in the code cell.  You can `import React from 'react'` or any other npm module you may need.*

The npm imports are handled with a custom ESBuild plugins that checks the input code for import statements, and uses Unpkg to obtain the npm package. The npm packages are cached to the browser (using localForage), to improve performance.

## Monaco Editor for inputting and editing code in Code Cells

Implimented Monaco Editor to provide best user experience. It's the same editor used in VS Code. 

I've configured this Editor to provide basic syntax error checking, syntax coloring, and IntelliSence.

*Plus, I added a `Format` button at the upper right of each code cell that when clicked uses Prettier to format the user inputed code.*

For the Markdown editor used react md editor. 

## Secure Code Sandbox using an iframe

Created a secure code sandbox by executing the transpiled and bundled code in an iframe, and submitting the code to that iframe using `postMessage`. There is an `EventListener` in the iframe that listens for the message, and once recieved, executes the code.

## `show()` function - display variables, objects, JSX, or even a React components to the preview screen

Created a custom `show()` function that allows the user to output any variable, object, JSX, or React component to the preview screen.

## Redux Store is used to handle all state management
