import { PlayerBlock } from "../classes/blocks/PlayerBlock.js";
import { Block, BlockOptions } from "./Block.js";

/**
 * @abstract A block that represents a item in the game.
 */
export abstract class ItemBlock extends Block {
    constructor(options: BlockOptions) {
        super(options);
    }

    /**
     * @abstract Called when the player interacts with this block.
     * @param player The player that interacts with the item.
     */
    abstract onInteraction(player: PlayerBlock) : Promise<void>;
}