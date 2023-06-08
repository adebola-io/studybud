// @ts-nocheck

import { CompositeImage } from "../lib";

const DOG = {
   src: "https://templates.seekviral.com/trimba3/forms/InterestingQuiz/assets/images/pet1.png",
   alt: "outline of dog",
};
const CAT = {
   src: "https://templates.seekviral.com/trimba3/forms/InterestingQuiz/assets/images/pet2.png",
   alt: "outline of cat",
};

export const Pet1 = new CompositeImage();
Pet1.addImage(DOG);

export const Pet2 = new CompositeImage();
Pet2.addImage(CAT);

export const Pet1and2 = new CompositeImage();
Pet1and2.addImage(DOG);
Pet1and2.addImage(CAT);
