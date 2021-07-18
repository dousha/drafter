export interface Instruction {
    execute(context: Record<string, unknown>): void;
}
