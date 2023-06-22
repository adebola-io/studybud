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
