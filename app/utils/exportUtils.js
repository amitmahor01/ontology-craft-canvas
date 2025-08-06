// Export utilities for ontology data in multiple formats

// Helper function to generate IRI
const generateIRI = (node) => {
  return node.data.iri || `#${node.data.label}`;
};

// Helper function to escape XML content
const escapeXML = (text) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// Export to Turtle format
export const exportToTurtle = (nodes, edges) => {
  const triples = [];
  
  nodes.forEach(node => {
    if (node.type === 'class') {
      triples.push(`<${generateIRI(node)}> a owl:Class .`);
    } else if (node.type === 'instance') {
      triples.push(`<${generateIRI(node)}> a <${node.data.classType || 'owl:Thing'}> .`);
    } else if (node.type === 'property') {
      triples.push(`<${generateIRI(node)}> a owl:ObjectProperty .`);
    }
  });

  edges.forEach(edge => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (sourceNode && targetNode) {
      triples.push(`<${generateIRI(sourceNode)}> <${edge.data?.iri || '#' + edge.data?.label || 'rdf:type'}> <${generateIRI(targetNode)}> .`);
    }
  });

  return `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

${triples.join('\n')}`;
};

// Export to OWL/XML format
export const exportToOWL = (nodes, edges) => {
  const classes = nodes.filter(n => n.type === 'class');
  const instances = nodes.filter(n => n.type === 'instance');
  const properties = nodes.filter(n => n.type === 'property');

  const classElements = classes.map(cls => 
    `    <owl:Class rdf:about="${generateIRI(cls)}">
      <rdfs:label>${escapeXML(cls.data.label)}</rdfs:label>
    </owl:Class>`
  ).join('\n');

  const instanceElements = instances.map(inst => 
    `    <owl:NamedIndividual rdf:about="${generateIRI(inst)}">
      <rdf:type rdf:resource="${inst.data.classType || 'owl:Thing'}"/>
      <rdfs:label>${escapeXML(inst.data.label)}</rdfs:label>
    </owl:NamedIndividual>`
  ).join('\n');

  const propertyElements = properties.map(prop => 
    `    <owl:ObjectProperty rdf:about="${generateIRI(prop)}">
      <rdfs:label>${escapeXML(prop.data.label)}</rdfs:label>
    </owl:ObjectProperty>`
  ).join('\n');

  const relationshipElements = edges.map(edge => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (sourceNode && targetNode) {
      return `    <owl:NamedIndividual rdf:about="${generateIRI(sourceNode)}">
      <${edge.data?.iri || '#' + edge.data?.label || 'rdf:type'} rdf:resource="${generateIRI(targetNode)}"/>
    </owl:NamedIndividual>`;
    }
    return '';
  }).filter(el => el).join('\n');

  return `<?xml version="1.0"?>
<rdf:RDF xmlns="http://example.org/ontology#"
     xml:base="http://example.org/ontology#"
     xmlns:owl="http://www.w3.org/2002/07/owl#"
     xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
     xmlns:xml="http://www.w3.org/XML/1998/namespace"
     xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
     xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#">
  <owl:Ontology rdf:about="http://example.org/ontology#"/>
  
${classElements}
${instanceElements}
${propertyElements}
${relationshipElements}
</rdf:RDF>`;
};

// Export to RDF/XML format
export const exportToRDF = (nodes, edges) => {
  const triples = [];
  
  nodes.forEach(node => {
    if (node.type === 'class') {
      triples.push(`  <owl:Class rdf:about="${generateIRI(node)}">
    <rdfs:label>${escapeXML(node.data.label)}</rdfs:label>
  </owl:Class>`);
    } else if (node.type === 'instance') {
      triples.push(`  <owl:NamedIndividual rdf:about="${generateIRI(node)}">
    <rdf:type rdf:resource="${node.data.classType || 'owl:Thing'}"/>
    <rdfs:label>${escapeXML(node.data.label)}</rdfs:label>
  </owl:NamedIndividual>`);
    } else if (node.type === 'property') {
      triples.push(`  <owl:ObjectProperty rdf:about="${generateIRI(node)}">
    <rdfs:label>${escapeXML(node.data.label)}</rdfs:label>
  </owl:ObjectProperty>`);
    }
  });

  edges.forEach(edge => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (sourceNode && targetNode) {
      triples.push(`  <owl:NamedIndividual rdf:about="${generateIRI(sourceNode)}">
    <${edge.data?.iri || '#' + edge.data?.label || 'rdf:type'} rdf:resource="${generateIRI(targetNode)}"/>
  </owl:NamedIndividual>`);
    }
  });

  return `<?xml version="1.0"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
         xmlns:owl="http://www.w3.org/2002/07/owl#"
         xmlns:xsd="http://www.w3.org/2001/XMLSchema#">

${triples.join('\n\n')}

</rdf:RDF>`;
};

// Export to JSON-LD format
export const exportToJSONLD = (nodes, edges) => {
  const context = {
    "@context": {
      "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
      "owl": "http://www.w3.org/2002/07/owl#",
      "xsd": "http://www.w3.org/2001/XMLSchema#"
    }
  };

  const graph = [];

  nodes.forEach(node => {
    const entity = {
      "@id": generateIRI(node),
      "rdfs:label": node.data.label
    };

    if (node.type === 'class') {
      entity["@type"] = "owl:Class";
    } else if (node.type === 'instance') {
      entity["@type"] = "owl:NamedIndividual";
      entity["rdf:type"] = {
        "@id": node.data.classType || "owl:Thing"
      };
    } else if (node.type === 'property') {
      entity["@type"] = "owl:ObjectProperty";
    }

    graph.push(entity);
  });

  edges.forEach(edge => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (sourceNode && targetNode) {
      const relationship = {
        "@id": generateIRI(sourceNode),
        [edge.data?.iri || '#' + edge.data?.label || 'rdf:type']: {
          "@id": generateIRI(targetNode)
        }
      };
      graph.push(relationship);
    }
  });

  return {
    ...context,
    "@graph": graph
  };
};

// Generic export function that handles file download
export const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Export functions with automatic file download
export const exportToTurtleFile = (nodes, edges) => {
  const content = exportToTurtle(nodes, edges);
  downloadFile(content, 'ontology.ttl', 'text/turtle');
};

export const exportToOWLFile = (nodes, edges) => {
  const content = exportToOWL(nodes, edges);
  downloadFile(content, 'ontology.owl', 'application/rdf+xml');
};

export const exportToRDFFile = (nodes, edges) => {
  const content = exportToRDF(nodes, edges);
  downloadFile(content, 'ontology.rdf', 'application/rdf+xml');
};

export const exportToJSONLDFile = (nodes, edges) => {
  const content = JSON.stringify(exportToJSONLD(nodes, edges), null, 2);
  downloadFile(content, 'ontology.jsonld', 'application/ld+json');
};

// Import functions for different formats
export const importFromJSONLD = (jsonldContent) => {
  try {
    const data = typeof jsonldContent === 'string' ? JSON.parse(jsonldContent) : jsonldContent;
    const nodes = [];
    const edges = [];
    
    if (data['@graph']) {
      data['@graph'].forEach(entity => {
        if (entity['@id'] && entity['rdfs:label']) {
          const nodeId = generateId();
          
          if (entity['@type'] === 'owl:Class') {
            nodes.push({
              id: nodeId,
              type: 'class',
              position: { x: Math.random() * 500, y: Math.random() * 500 },
              data: { 
                label: entity['rdfs:label'],
                iri: entity['@id']
              }
            });
          } else if (entity['@type'] === 'owl:NamedIndividual') {
            nodes.push({
              id: nodeId,
              type: 'instance',
              position: { x: Math.random() * 500, y: Math.random() * 500 },
              data: { 
                label: entity['rdfs:label'],
                iri: entity['@id'],
                classType: entity['rdf:type']?.['@id'] || 'owl:Thing'
              }
            });
          } else if (entity['@type'] === 'owl:ObjectProperty') {
            nodes.push({
              id: nodeId,
              type: 'property',
              position: { x: Math.random() * 500, y: Math.random() * 500 },
              data: { 
                label: entity['rdfs:label'],
                iri: entity['@id']
              }
            });
          }
        }
      });
    }
    
    return { nodes, edges };
  } catch (error) {
    console.error('Error importing JSON-LD:', error);
    return { nodes: [], edges: [] };
  }
};

// Helper function to generate unique IDs for import
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
}; 