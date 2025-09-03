import fs from 'fs';
export const db = JSON.parse(fs.readFileSync('data/data.json', 'utf-8'));
