export class FrameData {
    /**
     * @type {import('./frame.js').Frame[]}
     */
    _frames: import("./frame.js").Frame[];
    /**
     * @type {string[]}
     */
    _frameNames: string[];
    /**
     * Add a frame to the frame data collection.
     * @param {import('./frame.js').Frame} frame - The frame to add.
     * @returns {import('./frame.js').Frame} The added frame.
     */
    addFrame(frame: import("./frame.js").Frame): import("./frame.js").Frame;
    /**
     * Get a frame by its index.
     * @param {number} index - The index of the frame to get.
     * @returns {import('./frame.js').Frame} The frame at the specified index, or the first frame if index is out of bounds.
     */
    getFrame(index?: number): import("./frame.js").Frame;
    /**
     * Get a frame by its name.
     * @param {string} name - The name of the frame to get.
     * @returns {import('./frame.js').Frame} The frame with the specified name, or null if not found.
     */
    getFrameByName(name: string): import("./frame.js").Frame;
    /**
     * Check if a frame with the given name exists.
     * @param {string} name - The name of the frame to check.
     * @returns {boolean} True if a frame with this name exists, false otherwise.
     */
    checkFrameName(name: string): boolean;
    /**
     * Create a clone of this FrameData instance.
     * @returns {FrameData} A new FrameData instance with cloned frames.
     */
    clone(): FrameData;
    /**
     * Get a range of frames by index.
     * @param {number} start - The starting index of the frame range.
     * @param {number} end - The ending index of the frame range.
     * @param {import('./frame.js').Frame[]} output - Optional array to populate with frames.
     * @returns {import('./frame.js').Frame[]} An array of frames in the specified range.
     */
    getFrameRange(start: number, end: number, output?: import("./frame.js").Frame[]): import("./frame.js").Frame[];
    /**
     * Get frame indexes from an array of frame names or indices.
     * @param {number[]|string[]} frames - An array of frame names or indices.
     * @param {boolean} useNumericIndex - Whether to treat numeric values as frame indices.
     * @param {number[]} output - Optional array to populate with frame indexes.
     * @returns {number[]} An array of frame indexes.
     */
    getFrameIndexes(frames: number[] | string[], useNumericIndex?: boolean, output?: number[]): number[];
    /**
     * Destroy this FrameData instance and clean up resources.
     * This method clears internal arrays and releases references to frames.
     */
    destroy(): void;
    /**
     * Get the total number of frames in this FrameData instance.
     * @returns {number} The total number of frames.
     */
    get total(): number;
}
//# sourceMappingURL=frame_data.d.ts.map