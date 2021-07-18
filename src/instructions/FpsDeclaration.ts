import { Instruction } from '../types/Instruction';

export class FpsDeclaration implements Instruction {
    constructor(private fps: number) { }

    execute(ctx: Record<'fps', number>) {
        ctx['fps'] = this.fps;
    }
}
