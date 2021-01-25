import { createReadStream } from 'fs';
import { AST, Statement } from './ast';

const BLOCK_KEYWORDS = [
    'animation',
    'transition',
    'scene',
    'sequence',
];

enum ParserState {
    CLEAN,
    BLOCK,
}

class Parser {
    public parseLine(line: string): Statement | undefined {
        // read 1 word
        const command = line.split(' ').shift();
        const tail = line.replace(command, '').trim();
        if (this.state === ParserState.CLEAN) {
            if (command.startsWith('//')) {
                // line comment
            } else {
                if (command in BLOCK_KEYWORDS) {
                    // the next item shall be a name to this block
                    // and the rest shall be in blocks
                    this.state = ParserState.BLOCK;
                }
                const args = this.parseArguments(tail);
                // TODO: emit statement
            }
        } else {
            if (command === 'end') {
                // any other things are ignored
                this.state = ParserState.CLEAN;
                // TODO: emit statement
            } else {
                // TODO: append statement to block buffer
            }
        }
        return undefined;
    }

    private parseArguments(tail: string): string[] {
        // TODO
        return [];
    }

    private state: ParserState = ParserState.CLEAN;
}

export function parseTextBlock(path: string): Promise<AST> {
    const parser = new Parser();
    const stream = createReadStream(path);

    stream.setEncoding('utf-8');

    return new Promise((resolve, reject) => {
        stream.on('data', (data: string) => {
            data.split('\n').map(it => it.trim()).forEach((line, i) => {
                try {
                    parser.parseLine(line);
                    // TODO
                } catch (e) {
                    console.error(`Syntax error in ${path}:${i}: ${e}`);
                    reject(e);
                }
            });
        });
    });
}
