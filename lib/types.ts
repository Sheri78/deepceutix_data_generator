export type ChartData = {
  x: number[];
  y: number[];
  label?: string;
};

export type TableData = {
  headers: string[];
  rows: any[][];
};

export type ResponseData = {
  chart?: ChartData;
  tables?: TableData[];
  code?: string;
  explanation?: string;
};

export type PythonExecutionResult = {
  output?: string;
  error?: string;
  imagePath?: string;
  data?: { x: number[]; y: number[] };
};
