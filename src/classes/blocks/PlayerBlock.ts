import { BlockOptions } from "../../abstract_classes/Block.js";
import { DynamicBlock } from "../../abstract_classes/DynamicBlock.js";
import { ItemBlock } from "../../abstract_classes/ItemBlock.js";

export class PlayerBlock extends DynamicBlock {
    constructor(options: BlockOptions) {
        super(options);
    }

    inventory: string[] = [];

    async interact() {
        const itemBlock = Object.values(this.around()).find(
            block => block instanceof ItemBlock
        ) as ItemBlock;
        if (!itemBlock) return;

        await itemBlock.onInteraction(this);
        this.game.setPlayerControls();
    }
}
