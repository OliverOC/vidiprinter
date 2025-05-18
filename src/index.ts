import path from 'path';
import { EventParser } from './parser/EventParser';
import { Vidiprinter } from './vidiprinter/Vidiprinter';

async function main() {
  const filePath = path.join(__dirname, '..', 'data', 'events.jsonl');
  try {
    const events = await new EventParser().parseJsonl(filePath);
    const vidiprinter = new Vidiprinter(events);
    vidiprinter.start();
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error(`File not found: ${filePath}`);
    }
    process.exit(1);
  }
}

main();
