import { Block, BlockOptions } from "../abstract_classes/Block.js";
import { DesignManager } from "./DesignManager.js";
import { FloorBlock } from "./blocks/FloorBlock.js";
import { PlayerBlock } from "./blocks/PlayerBlock.js";
import { WallBlock } from "./blocks/WallBlock.js";
import { Game } from "./Game.js";
import { BasketBlock } from "./blocks/BasketBlock.js";
import { TreeBlock } from "./blocks/TreeBlock.js";

// This constant is used to determine emojis referring to blocks to
// construct the map.
const blockInstantiationsScheme = {
    "🟫": (options: Omit<BlockOptions, "name">) =>
        new WallBlock({ name: "wall", ...options }),
    "🟩": (options: Omit<BlockOptions, "name">) =>
        new FloorBlock({ name: "floor", ...options }),
    "🟨": (options: Omit<BlockOptions, "name">) =>
        new PlayerBlock({ name: "player", ...options }),
    "🌳": (options: Omit<BlockOptions, "name">) =>
        new TreeBlock({ name: "tree", appleGenerationLimit: 5, ...options }),
    "🧺": (options: Omit<BlockOptions, "name">) =>
        new BasketBlock({ name: "basket", ...options }),
};

type MapSchemeBlocksType = keyof typeof blockInstantiationsScheme;
type MapSchemeColumnBlocksType = MapSchemeBlocksType[];
export type MapScheme = MapSchemeColumnBlocksType[];

/**
 * Class that represents a map in the game.
 */
export class Map {
    readonly name: string;
    readonly game: Game;
    readonly blocks: DesignManager<Block>;

    constructor(name: string, scheme: MapScheme, game: Game) {
        const MAP_AREA_LENGTH_LIMIT = 195; // 13x15;

        const l = scheme.length;
        const c = scheme[0].length;
        const SCHEME_AREA = l * c;

        this.game = game;

        if (SCHEME_AREA > MAP_AREA_LENGTH_LIMIT)
            throw new Error("The map area length limit is exceeded.");

        this.name = name;
        this.blocks = new DesignManager(l, c);
        this.buildScheme(scheme);
    }

    /**
     * Method to build a map from a scheme (a string of emojis to blocks instantianion).
     * @param scheme The scheme to be used to generate the map.
     */

    private buildScheme(scheme: MapScheme) {
        for (let l = 0; l < scheme.length; l++) {
            for (let c = 0; c < scheme[l].length; c++) {
                const blockType = scheme[l][c];
                const block = blockInstantiationsScheme[blockType]({
                    skin: blockType,
                    l: l,
                    c: c,
                    game: this.game,
                });

                this.blocks.set(l, c, block);
            }
        }
    }

    toString() {
        let str = "";

        for (let l = 0; l < this.blocks.l; l++) {
            for (let c = 0; c < this.blocks.c; c++) {
                str += this.blocks.get(l, c);
            }
            str += "\n";
        }

        return str;
    }
}
