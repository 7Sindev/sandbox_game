import { Block, BlockOptions } from "./Block.js";

/**
 * @abstract A block that represents a static block (not movable).
 */
export class StaticBlock extends Block {
    constructor(options: BlockOptions) {
        super(options);
    }
}