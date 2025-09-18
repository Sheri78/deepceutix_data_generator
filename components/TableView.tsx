"use client";
import { Card } from "@/components/ui/card";

interface TableViewProps {
  headers: string[];
  rows: string[][];
}

export default function TableView({ headers, rows }: TableViewProps) {
  return (
    <Card className="overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl my-6">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-white/10">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-sm font-semibold text-white border-b border-white/10"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-white/5 transition-colors duration-200"
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="px-4 py-3 text-sm text-gray-200 border-b border-white/5"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
