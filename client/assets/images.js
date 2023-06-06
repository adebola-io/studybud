// @ts-nocheck

import P1 from "./pet1.png";
import P2 from "./pet2.png";
import { CompositeImage } from "../lib";

export const Pet1 = new CompositeImage();
Pet1.addImage(P1);

export const Pet2 = new CompositeImage();
Pet2.addImage(P2);

export const Pet1and2 = new CompositeImage();
Pet1and2.addImage(P1);
Pet1and2.addImage(P2);
