import { BlockOptions } from "../../abstract_classes/Block.js";
import { StaticBlock } from "../../abstract_classes/StaticBlock.js";

export class WallBlock extends StaticBlock {
    constructor(options: BlockOptions) {
        super(options);
    }
}