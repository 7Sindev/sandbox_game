import {
    CommandInteraction,
    InteractionReplyOptions,
    MessageActionRow,
    MessageButton,
} from "discord.js";
import { Map, MapScheme } from "./Map.js";
import { PlayerBlock } from "./blocks/PlayerBlock.js";

/**
 * Class that represents a game, where all the game logic is implemented.
 */
export class Game {
    readonly interaction: CommandInteraction;
    displayer: InteractionReplyOptions = {};
    readonly player: PlayerBlock;
    readonly map: Map;

    constructor(name: string, scheme: MapScheme, interaction: CommandInteraction) {
        this.interaction = interaction;
        this.map = new Map(name, scheme, this);
        this.player = this.map.blocks.find(block => block instanceof PlayerBlock);
        this.setPlayerControls();
    }

    /**
     * Method that starrs the game.
     */
    public async start() {
        mainLoop: while (true) {
            this.updateMap();
            this.displayScreen();

            const action = await this.readActionInput();

            switch (action.customId) {
                case "left":
                    this.player.moveLeft();
                    break;
                case "up":
                    this.player.moveUp();
                    break;
                case "down":
                    this.player.moveDown();
                    break;
                case "right":
                    this.player.moveRight();
                    break;
                case "interact":
                    await this.player.interact();
                    break;
                case "close":
                    break mainLoop;
            }
        }
    }

    /**
     * Method that displays the screen (map and player).
     */
    displayScreen() {
        this.interaction.reply(this.displayer).catch(() => {
            this.interaction.editReply(this.displayer);
        });
    }

    /**
     * Method that updates the map (set the map as string to displayer.content).
     * The map is updated internally, so the displayer.content receives the updated map.
     */
    updateMap() {
        this.displayer.content = `${this.map}`;
    }

    /**
     * Method to set the player controls.
     */
    setPlayerControls() {
        const [left, up, down, right, interact] = [
            new MessageButton({
                type: "BUTTON",
                customId: "left",
                style: "PRIMARY",
                emoji: "⬅️",
                label: "Left",
            }),
            new MessageButton({
                type: "BUTTON",
                customId: "up",
                style: "PRIMARY",
                emoji: "⬆️",
                label: "Up",
            }),
            new MessageButton({
                type: "BUTTON",
                customId: "down",
                style: "PRIMARY",
                emoji: "⬇️",
                label: "Down",
            }),
            new MessageButton({
                type: "BUTTON",
                customId: "right",
                style: "PRIMARY",
                emoji: "➡️",
                label: "Right",
            }),
            new MessageButton({
                type: "BUTTON",
                customId: "interact",
                style: "SUCCESS",
                emoji: "❗",
                label: "Interact",
            })
        ];

        this.displayer.components = [
            new MessageActionRow().addComponents(left, up, down, right, interact),
        ];
    }

    /**
     * Method that reads the action input.
     */
    private async readActionInput() {
        const action = await this.interaction.channel.awaitMessageComponent({
            componentType: "BUTTON",
            filter: int => int.user.id === this.interaction.user.id,
            time: 60_000,
        });

        await action.deferUpdate();

        return action;
    }
}
