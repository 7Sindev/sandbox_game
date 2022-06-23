import { BlockOptions } from "../../abstract_classes/Block.js";
import { MovableBlock } from "../../abstract_classes/MovableBlock.js";

export class FloorBlock extends MovableBlock {
    constructor(options: BlockOptions) {
        super(options);
    }
}