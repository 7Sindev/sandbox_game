import { MessageActionRow, MessageSelectMenu, MessageSelectOptionData } from "discord.js";
import { BlockOptions } from "../../abstract_classes/Block.js";
import { ItemBlock } from "../../abstract_classes/ItemBlock.js";
import { PlayerBlock } from "./PlayerBlock.js";

export type Apple = {
    name: string;
    skin: string;
};

// Counter for the number of apples created, avoiding to have two or more apples with the same name.
let applesCount = 0;

export class TreeBlock extends ItemBlock {
    apples: Apple[] = [];
    
    constructor(options: BlockOptions & { appleGenerationLimit: number }) {
        super(options);
        const appleQuantity =
            Math.floor(Math.random() * options.appleGenerationLimit) + 1;

        for (let i = 0; i < appleQuantity; i++) {
            this.apples.push({
                name: `Apple ${++applesCount}`,
                skin: "🍎",
            });
        }
    }

    async onInteraction(player: PlayerBlock) {
        const applesOptions: MessageSelectOptionData[] = [];

        for (const apple of this.apples) {
            applesOptions.push({
                label: `${apple.name}`,
                value: apple.name,
                description: "A delicious apple",
                emoji: "🍎"
            });
        }

        this.game.displayer.components = [
            new MessageActionRow().addComponents(
                new MessageSelectMenu({ maxValues: applesOptions.length || undefined })
                    .setCustomId("apples")
                    .setPlaceholder("Get some apples")
                    .setOptions(...applesOptions, {
                        label: "Close",
                        description: "Close the menu",
                        value: "close",
                        emoji: "❌",
                    })
                    .setMinValues(1)
            ),
        ];

        this.game.displayScreen();

        const response = await this.readPlayerResponse();

        if (response.values[0] === "close") return;

        const collectedApples = response.values;

        this.apples.length = this.apples.length - collectedApples.length;
        player.inventory.push(...collectedApples);
    }

    private async readPlayerResponse() {
        const response = await this.game.interaction.channel.awaitMessageComponent({
            componentType: "SELECT_MENU",
            filter: int => int.user.id === this.game.interaction.user.id,
            time: 60000,
        });

        response.deferUpdate();
        return response;
    }
}
