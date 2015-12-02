# List Files
## This is the README for your extension "listFiles" 
Provides a list of files in your workspace that can be filtered and selected.

## How to install
* Install [Visual Studio Code](https://code.visualstudio.com/)
* Open `View -> Command Palette... and type ext install listFiles`
* Restart Visual Studio Code and select the command "`Files: List Files to Open`"
  From the list of files displayed, select a file to open.

## Hotkeys
```
"keybindings":[
  {
    "command": "extension.listFilesToOpen",
    "key": "ctrl+alt+l",
    "mac": "ctrl+alt+l"
  }	
]
```

## Settings
You can configure the settings, to display a specific types of files and folders, or exclude specific files and folders.
Similarly you could configure the number of files displayed.

```
"properties": {
  "findFiles.fileIncludeGlob": {
    "type": "string",
    "default": "**",
    "description": "A glob pattern that defines the files to search for."
  },
  "findFiles.fileExcludeGlob": {
    "type": "string",
    "default": "**\\node_modules\\**",
    "description": "A glob pattern that defines files and folders to exclude."
  },
  "findFiles.maxResults": {
    "type": "number",
    "default": 1000,
    "description": "An upper-bound for the result."
  }
}
```
        
** Enjoy!**
