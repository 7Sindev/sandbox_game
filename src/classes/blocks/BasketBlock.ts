import { MessageActionRow, MessageSelectMenu, MessageSelectOptionData } from "discord.js";
import { BlockOptions } from "../../abstract_classes/Block.js";
import { ItemBlock } from "../../abstract_classes/ItemBlock.js";
import { PlayerBlock } from "./PlayerBlock.js";

export class BasketBlock extends ItemBlock {
    constructor(options: BlockOptions) {
        super(options);
    }

    apples: string[] = [];

    async onInteraction(player: PlayerBlock) {
        const playerItems: MessageSelectOptionData[] = [];

        this.game.displayer.components = [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("add_or_get")
                    .setPlaceholder("Select an option")
                    .setOptions(
                        {
                            label: "Insert apples",
                            description: "Insert apples into the basket",
                            value: "insert",
                        },
                        {
                            label: "Get apples",
                            description: "Get apples from the basket",
                            value: "get",
                        }
                    )
            ),
        ];

        this.game.displayScreen();
        const response = await this.awaitPlayerResponse();

        if (response.values[0] === "insert") {
            const apples = player.inventory;

            for (const apple of apples) {
                playerItems.push({
                    label: apple,
                    value: apple,
                    description: "A delicious apple",
                    emoji: "🍎", 
                });
            }

            this.game.displayer.components = [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu({ maxValues: playerItems.length || undefined })
                        .setCustomId("insert_apples")
                        .setPlaceholder("Select apples to insert")
                        .setOptions(...playerItems, {
                            label: "Close",
                            description: "Close the menu",
                            value: "close",
                            emoji: "❌",
                        })
                        .setMinValues(1)
                ),
            ];

            this.game.displayScreen();
            const response = await this.awaitPlayerResponse();

            if (response.values[0] === "close") return;

            this.apples.push(...response.values);
            player.inventory.length = player.inventory.length - response.values.length;
        } else {
            for (const apple of this.apples) {
                playerItems.push({
                    label: apple,
                    value: apple,
                    description: "A delicious apple",
                    emoji: "🍎"
                });
            }

            this.game.displayer.components = [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu({ maxValues: this.apples.length || undefined })
                        .setCustomId("get_apples")
                        .setPlaceholder("Select apples to get")
                        .setOptions(...playerItems, {
                            label: "Close",
                            description: "Close the menu",
                            value: "close",
                            emoji: "❌",
                        })
                        .setMinValues(1)
                ),
            ];

            this.game.displayScreen();
            const response = await this.awaitPlayerResponse();

            if (response.values[0] === "close") return;

            player.inventory.push(...response.values);
            this.apples.length = this.apples.length - response.values.length;
        }
    }

    private async awaitPlayerResponse() {
        const response = await this.game.interaction.channel.awaitMessageComponent({
            componentType: "SELECT_MENU",
            filter: int => int.user.id === this.game.interaction.user.id,
            time: 60_000,
        });

        response.deferUpdate();

        return response;
    }
}
