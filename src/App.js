// React component to render a Marathi family tree using structured JSON data
// Data source: treeData.json (exported from Notion relational database)

import React, { useEffect, useState } from "react";

// Recursive component to render each node
const PersonCard = ({ node }) => {
  return (
    <div className="flex flex-col items-center my-4">
      <div className="px-4 py-2 bg-white shadow-md text-center w-48 rounded-lg">
        <div className="p-2">
          <div className="font-bold text-base">{node.name}</div>
          {node.birthYear && (
            <div className="text-xs text-gray-500">b. {node.birthYear}</div>
          )}
          {node.deathYear && (
            <div className="text-xs text-gray-500">d. {node.deathYear}</div>
          )}
          {node.notes && (
            <div className="text-xs text-gray-700 mt-1">{node.notes}</div>
          )}
        </div>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="flex flex-row flex-wrap justify-center mt-4 gap-4">
          {node.children.map((child, index) => (
            <PersonCard key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function FamilyTreeFromJSON() {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    // fetch("/treeData.json")
    fetch(process.env.PUBLIC_URL + "/treeData.json")
      .then((res) => res.json())
      .then((data) => setTreeData(data));
  }, []);

  if (!treeData) return <div className="text-center mt-10">Loading tree...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Chandkhed Gaikwad Family Tree
      </h1>
      <div className="flex justify-center overflow-x-auto">
        <PersonCard node={treeData} />
      </div>
    </div>
  );
}
