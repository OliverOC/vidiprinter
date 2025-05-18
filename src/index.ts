import path from 'path';
import { EventParser } from './parser/EventParser';

async function main() {
  const filePath = path.join(__dirname, '..', 'data', 'events.jsonl');
  try {
    const events = await new EventParser().parseJsonl(filePath);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error(`File not found: ${filePath}`);
    }
    process.exit(1);
  }
}

main();
