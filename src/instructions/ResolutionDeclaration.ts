import { Instruction } from "../types/Instruction";

interface Resolution {
    width: number;
    height: number;
    aspect: 'wide' | 'standard' | 'vertical' | 'custom';
}

const WidthLut: Record<string, (h: number) => number> = {
    'wide': function (h: number) { return Math.floor(h * 16 / 9); },
    'standard': function (h: number) { return Math.floor(h * 4 / 3 ); },
    'vertical': function (h: number) { return Math.floor(h * 9 / 16); },
}

export class ResolutionDeclaration implements Instruction {
    constructor(private arg1: number | string, private arg2?: number) { }

    execute(ctx: Record<'resolution', Resolution>) {
        const res: Resolution = ctx['resolution'] || {
            width: 0,
            height: 0,
            aspect: 'standard'
        };

        if (typeof this.arg1 === 'number') {
            // width or height
            if (this.arg2) {
                // w x h
                res.width = this.arg1;
                res.height = this.arg2;
                res.aspect = 'custom';
            } else {
                // h
                res.height = this.arg1;
                res.width = WidthLut[res.aspect](res.height);
            }
        } else {
            // aspect settings
            // XXX
            if (this.arg1 === 'standard' 
            || this.arg1 === 'wide' 
            || this.arg1 === 'vertical' 
            || this.arg1 === 'custom') {
                res.aspect = this.arg1;
            } else {
                res.aspect = 'custom';
            }
            if (res.aspect !== 'custom') {
                res.width = WidthLut[res.aspect](res.height);
            }
        }

        ctx['resolution'] = res;
    }
}
