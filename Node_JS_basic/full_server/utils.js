import fs from 'fs/promises'; 

export async function readDatabase(path) {
  try {
    const data = await fs.readFile(path, 'utf8');

    const lines = data
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) return {};

    lines.shift();

    const result = {};

    for (const line of lines) {
      const parts = line.split(',');
      const firstname = parts[0];
      const field = parts[3];

      if (!field || firstname === undefined) {
        continue;
      }

      if (!result[field]) result[field] = [];
      result[field].push(firstname);
    }

    return result;
  } catch (err) {
    throw err;
  }
}
