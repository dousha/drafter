import { Instruction } from "../types/Instruction";

type ColorTable = Record<string, string>;

export class ColorDefinition implements Instruction {
    constructor(private name: string, private color: string) { }

    execute(ctx: Record<'colorTable', ColorTable>) {
        const tbl = ctx['colorTable'] || {};
        tbl[this.name] = this.color;
    }
}
