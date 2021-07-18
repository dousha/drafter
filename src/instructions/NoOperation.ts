import { Instruction } from "../types/Instruction";

export class NoOperation implements Instruction {
    execute() {
        // do absolutely nothing
    }
}
