export async function generateDataApi(prompt: string, model: string) {
  const res = await fetch("http://localhost:3001/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch data");
  }
  return res.json();
}

export async function executePythonApi(code: string) {
  const res = await fetch("http://localhost:3001/generate/execute-python", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to execute Python code");
  }
  return res.json();
}
