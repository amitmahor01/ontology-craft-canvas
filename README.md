# Ontology Craft Canvas

A modern, interactive ontology editor built with React and React Flow.  
Create, edit, and manage ontologies with an intuitive drag-and-drop interface.

---

## Features

- 🎯 **Drag & Drop Interface** – Easily create ontology elements
- 🔗 **Smart Connections** – Connect classes, instances, and properties
- 📝 **Real-time Editing** – Edit labels and relationships on the fly
- 💾 **Multiple Export Formats** – Export to Turtle, OWL/XML, RDF/XML, and JSON-LD
- 📥 **Import Support** – Import existing ontologies (JSON, JSON-LD)
- 🎨 **Modern UI** – Clean, responsive design with Tailwind CSS
- 🔄 **Undo/Redo** – Full history management
- 📊 **Validation** – Real-time ontology validation

---

## Installation

```bash
npm install ontology-craft-canvas
# or
yarn add ontology-craft-canvas
```

---

## Usage

### Basic Example

```jsx
import { OntologyEditor } from 'ontology-craft-canvas';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <OntologyEditor />
    </div>
  );
}
```

### With Initial Data and Event Handlers

```jsx
import { OntologyEditor, exportToTurtle } from 'ontology-craft-canvas';

const initialNodes = [
  { id: '1', type: 'class', position: { x: 100, y: 100 }, data: { label: 'Person' } }
];
const initialEdges = [];

function handleSave(nodes, edges) {
  // Save to backend or local storage
  console.log('Saved:', nodes, edges);
}

function handleExport(format, nodes, edges) {
  // Custom export logic
  if (format === 'turtle') {
    const turtle = exportToTurtle(nodes, edges);
    console.log(turtle);
  }
}

function App() {
  return (
    <OntologyEditor
      initialNodes={initialNodes}
      initialEdges={initialEdges}
      onSave={handleSave}
      onExport={handleExport}
    />
  );
}
```

---

## API

### `<OntologyEditor />` Props

| Prop                | Type       | Default   | Description                                 |
|---------------------|------------|-----------|---------------------------------------------|
| `initialNodes`      | Array      | `[]`      | Initial nodes for the editor                |
| `initialEdges`      | Array      | `[]`      | Initial edges for the editor                |
| `onNodesChange`     | Function   |           | Callback when nodes change                  |
| `onEdgesChange`     | Function   |           | Callback when edges change                  |
| `onSave`            | Function   |           | Callback when user clicks Save              |
| `onExport`          | Function   |           | Callback when user exports ontology         |
| `validationEnabled` | Boolean    | `true`    | Enable/disable validation                   |
| `gridEnabled`       | Boolean    | `true`    | Show grid background                        |
| `theme`             | String     | `'light'` | Theme for the editor                        |
| ...props            |            |           | All other props passed to React Flow        |

---

## Utility Exports

You can also use the following utility functions:

```js
import {
  exportToTurtle,
  exportToOWL,
  exportToRDF,
  exportToJSONLD,
  importFromJSONLD,
} from 'ontology-craft-canvas';
```

- `exportToTurtle(nodes, edges)` – Export ontology to Turtle format
- `exportToOWL(nodes, edges)` – Export ontology to OWL/XML format
- `exportToRDF(nodes, edges)` – Export ontology to RDF/XML format
- `exportToJSONLD(nodes, edges)` – Export ontology to JSON-LD format
- `importFromJSONLD(jsonldContent)` – Import ontology from JSON-LD

---

## Styles

- This component uses [Tailwind CSS](https://tailwindcss.com/).  
  **You must have Tailwind set up in your project** for full styling.
- React Flow styles are included automatically.

---

## Development

### Prerequisites

- Node.js 18+
- npm 8+

### Local Development

```bash
# Install dependencies
npm install

# Start development server (if using Next.js)
npm run dev
```

---

## Project Structure

```
ontology-craft-canvas/
├── app/
│   ├── components/
│   │   ├── OntologyEditor.js
│   │   ├── Toolbar.js
│   │   ├── Sidebar.js
│   │   ├── ClassNode.js
│   │   ├── InstanceNode.js
│   │   └── PropertyNode.js
│   ├── utils/
│   │   ├── exportUtils.js
│   │   └── idGenerator.js
│   └── page.js
├── index.js
├── package.json
└── README.md
```

---

## License

MIT

---

## Acknowledgments

- [React Flow](https://reactflow.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
