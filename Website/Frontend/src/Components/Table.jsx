import React from "react";

function Table({ children }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  );
}

function TableHead({ children }) {
  return <thead className="bg-gray-50">{children}</thead>;
}

function TableBody({ children }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  );
}

function TableRow({ children }) {
  return <tr>{children}</tr>;
}

function TableHeader({ content }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {content}
    </th>
  );
}

function TableCell({ content }) {
  return <td className="px-6 py-4 whitespace-nowrap">{content}</td>;
}

export { Table, TableHead, TableBody, TableRow, TableHeader, TableCell };
