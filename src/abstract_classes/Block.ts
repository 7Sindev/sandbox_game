import { MovableBlock } from "./MovableBlock.js";
import { Game } from "../classes/Game";

export type BlockOptions = {
    name: string;
    skin: string;
    game: Game;
    l: number;
    c: number;
};
/**
 * @abstract Class that represents a block in the game.
 */
export abstract class Block {
    protected readonly game: Game;
    private _l: number;
    private _c: number;
    readonly name: string;
    readonly skin: string;

    get l() {
        return this._l;
    }

    set l(l: number) {
        this._l = l;
    }

    get c() {
        return this._c;
    }

    set c(c: number) {
        this._c = c;
    }

    constructor(options: BlockOptions) {
        this.name = options.name;
        this.skin = options.skin;
        this.game = options.game;
        this.l = options.l;
        this.c = options.c;
    }

    /**
     * Method that get the block in the front of this block.
     * @returns the block in front of this block.
     */
    front<R extends Block = Block>() {
        const block_front = this.game.map.blocks.get(this._l - 1, this._c);

        return block_front as R;
    }

    /**
     * Method that get the block in the back of this block.
     * @returns the block in back of this block.
     */
    back<R extends Block = Block>() {
        const block_back = this.game.map.blocks.get(this._l + 1, this._c);

        return block_back as R;
    }

    /**
     * Method that get the block in the left of this block.
     * @returns the block in left of this block.
     */
    left<R extends Block = Block>() {
        const block_left = this.game.map.blocks.get(this._l, this._c - 1);

        return block_left as R;
    }

    /**
     * Method that get the block in the right of this block.
     * @returns the block in right of this block.
     */
    right<R extends Block = Block>() {
        const block_right = this.game.map.blocks.get(this._l, this._c + 1);

        return block_right as R;
    }

    /**
     * Method that replace this block for another block as parameter.
     * @param block the block that will replace this block.
     * @returns the block in front of this block.
     */
    replace(block: Block) {
        this.game.map.blocks.set(this.l, this.c, block);
    }

    /**
     * Method that get the blocks around of this block.
     * @returns all the blocks around this block.
     */
    around<R extends Block = Block>() {
        return {
            front: this.front() as R,
            back: this.back() as R,
            left: this.left() as R,
            right: this.right() as R,
        };
    }

    /**
     * Method to check if this block is movable to up.
     * @returns the block is movable to up
     */
    isMovableToUp() {
        const block_front = this.front();
        if (!block_front) return false;

        return this.isMovable(block_front);
    }

    /**
     * Method to check if this block is movable to down.
     * @returns the block is movable to down
     */
    isMovableToDown() {
        const block_back = this.back();
        if (!block_back) return false;

        return this.isMovable(block_back);
    }

    /**
     * Method to check if this block is movable to left.
     * @returns the block is movable to left
     */
    isMovableToLeft() {
        const block_left = this.left();
        if (!block_left) return false;

        return this.isMovable(block_left);
    }

    /**
     * Method to check if this block is movable to the right.
     * @returns the block is movable to right
     */
    isMovableToRight() {
        const block_right = this.right();
        if (!block_right) return false;

        return this.isMovable(block_right);
    }

    /**
     * Method to check if this block is movable
     * @returns the block is movable to up
     */
    private isMovable(block: Block) {
        return block instanceof MovableBlock;
    }

    toString() {
        return this.skin;
    }
}
