export class CompositeImage {
    /**@type {Array<{src: string, alt: string}>} */
    images = [];
    /**
     * Add an image to the composite image.
     * @param {{src: string, alt: string}} image
     */
    addImage(image) {
        this.images.push(image);
    }
}

/**
 * @function
 * @param {Parameters<Document['createElement']>[0]} selector
 */
export const createElement = (selector) => document.createElement(selector);

// /**
//  * Lightens a color by a value.
//  * @param {string} hexColor
//  * @param {number} strength
//  */
// function lightenColor(hexColor, strength = 10) {
//    return "#" + (parseInt(hexColor.slice(1), 16) - strength).toString(16);
// }
