# Datasource List - Tableau Dashboard Extension

A simple Tableau dashboard extension that lists all datasources used in the current dashboard.

## Files

- `datasource-list.trex` - Extension manifest file
- `index.html` - Main HTML page
- `app.js` - JavaScript logic
- `styles.css` - Styling

## Setup

### 1. Download the Tableau Extensions API

Download the Tableau Extensions API library from the official repository:
https://github.com/tableau/extensions-api

Copy `tableau.extensions.1.latest.min.js` into a `lib/` folder in this directory.

```
Tableau Extension/
├── lib/
│   └── tableau.extensions.1.latest.min.js
├── datasource-list.trex
├── index.html
├── app.js
└── styles.css
```

### 2. Host the Extension

The extension needs to be hosted on a web server. You can use Python's built-in server:

```bash
# Python 3
python -m http.server 8765

# Python 2
python -m SimpleHTTPServer 8765
```

Or use Node.js with http-server:

```bash
npx http-server -p 8765
```

### 3. Add to Tableau Dashboard

1. Open Tableau Desktop
2. Create or open a dashboard
3. Drag an "Extension" object onto the dashboard
4. Click "Access Local Extensions"
5. Navigate to and select `datasource-list.trex`
6. The extension will load and display all datasources

## Features

- Lists all unique datasources in the dashboard
- Shows whether each datasource is an Extract or Live connection
- Displays which worksheets use each datasource

## Requirements

- Tableau Desktop 2018.2 or later
- Web server to host the extension files
