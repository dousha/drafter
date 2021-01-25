import { readFileSync, readdirSync } from 'fs';
import { parseTextBlock } from './src/parser';

const path = process.argv.pop();

console.log('|> drafter, entry');

if (path == null) {
    console.error('Usage: drafter <file>');
    process.exit(-1);
} else {
    if (!path.endsWith('.draft')) {
        console.warn(`${path} doesn't have '.draft' as extension name`);
    }
    parseTextBlock(path);
}

console.log('|> drafter, exit');
