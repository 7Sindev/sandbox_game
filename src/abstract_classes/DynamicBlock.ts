import { Block } from "./Block.js";

/**
 * @abstract A block that can be moved by the client.
 */
export abstract class DynamicBlock extends Block {
    /**
     * Method to move this block to up.
     */
    moveUp() {
        if (!this.isMovableToUp()) return;
        const block_front = this.front();

        this.swap(block_front);
    }

    /**
     * Method to move this block to down.
     */
    moveDown() {
        if (!this.isMovableToDown()) return;
        const block_back = this.back();

        this.swap(block_back);
    }

    /**
     * Method to move this block to left.
     */
    moveLeft() {
        if (!this.isMovableToLeft()) return;
        const block_left = this.left();

        this.swap(block_left);
    }

    /**
     * Method to move this block to right.
     */
    moveRight() {
        if (!this.isMovableToRight()) return;
        const block_right = this.right();

        this.swap(block_right);
    }

    /**
     * Method to swap this block with the block passed as parameter.
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
