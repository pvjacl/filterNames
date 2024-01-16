# Sort and Filter Names

This program sorts and filters names from the Google Spreadsheet holding names from the Remembrance Gallery Project. 

1. It removes "perfect" duplicates where **first name, last name and family # are identical to each other**.
2. It sorts the list by last names and groups famillies together.
3. It gives mixed case names as best it can, using basic rules of capitalizing the first letters of names and lower casing all other letters. 

## Tools Required to run this

The easiest way to run this program is:

1. Download and install [Visual Studio Code](https://code.visualstudio.com/download) to your computer. 
2. Install Deno by checking the instructions at [Visual Studio Code's marketplace pages for Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno). Deno can be installed by following instructions [here](https://deno.com/#installation).
3. Follow instructions above to add the Deno extension to your Visual Studio Code.
4. Open the file ```main.ts``` in the editor. Make sure it is the visible as if to edit the file. 
5. In the ```Run``` menu, select ```Start Debugging``` or ```Run without Debugging``` and the program should run and end within seconds.

## Inputs required
You must download the latest CSV (comma separated variables) file from the Google Spreadsheet that holds the names for the Remembrance Gallery project and replace the file named Names.csv.

## Outputs 

Output files will be put into the ```output``` directory as ```filteredNames.csv``` and ```names.json```.