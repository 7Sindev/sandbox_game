/**
 * A class for manager the design of the game.
 * The design is basically a matrix of T (in this project, the T is Block).
 */
export class DesignManager<T> {
    private _design: T[][] = [];

    get l() {
        return this._design.length;
    }

    get c() {
        return this._design[0].length;
    }

    constructor(l: number, c: number) {
        this._design = new Array(l);

        for (let i = 0; i < l; i++) {
            this._design[i] = new Array(c);
        }
    }

    /**
     * Method to the block in a l and c position.
     * @param l the line of the block to get.
     * @param c the column of the block to get.
     * @returns the block in the position (l, c).
     */
    get<R extends T>(l: number, c: number) {
        return this._design[l][c] as R;
    }

    /**
     * Method to set a block in a l and c position.
     * @param l the line of the block to set.
     * @param c the column of the block to set.
     * @param value the block to set in the position (l, c).
     */
    set(l: number, c: number, value: T) {
        this._design[l][c] = value;
    }

    /**
     * Method to get a block by filter
     * @param filter the filter to apply to the design.
     * @returns the block that match the filter.
     */
    find<R extends T>(filter: CallbackFnFilter<T>) {
        for (let l = 0; l < this._design.length; l++) {
            for (let c = 0; c < this._design[l].length; c++) {
                if (filter(this._design[l][c], l, this._design)) {
                    return this._design[l][c] as R;
                }
            }
        }

        return null;
    }
}
