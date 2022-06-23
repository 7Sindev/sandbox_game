import { Block, BlockOptions } from "./Block.js";

/**
 * @abstract A block that represents a movable block.
 */
export class MovableBlock extends Block {
    constructor(options: BlockOptions) {
        super(options);
    }

    /**
     * Method to swap the block with this block.
     * @param block the block to swap with this block.
     */
    protected swap(block: Block) {
        const l_aux = this.l;
        const c_aux = this.c;

        this.l = block.l;
        this.c = block.c;
        block.l = l_aux;
        block.c = c_aux;

        this.game.map.blocks.set(this.l, this.c, this);
        this.game.map.blocks.set(block.l, block.c, block);
    }
}