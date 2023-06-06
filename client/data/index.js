import { Pet1, Pet1and2, Pet2 } from "../assets/images";

/**
 * @type {Array<import("../types").Question>}
 */
export const questions = [
   {
      id: 0,
      prompt:
         "Over the Past Two (2) Weeks, how Often have You had little interest or Pleasure in Doing things?",
      type: "optional",
      options: {
         A: "Access Therapists who Have Insurance",
         B: "Choose Your Therapist",
         C: "Easier Therapy Access",
         D: "Therapy Meets",
      },
      correctAnswer: "A",
   },
   {
      id: 1,
      prompt:
         "Over the Past Two (2) Weeks, how Often have You had little interest or Pleasure in Doing things?",
      type: "optional",
      options: [
         {
            compositeImage: Pet1,
            description: "1",
         },
         {
            compositeImage: Pet2,
            description: "2",
         },
         {
            compositeImage: Pet1and2,
            description: "BOTH",
         },
      ],
      correctAnswer: "A",
   },
   {
      id: 2,
      prompt: "What is your First reaction to the product?",
      type: "textbox",
   },
   {
      id: 3,
      prompt: "How to be Conversational?",
      subtext: "What you think Your Company Rating Deserve?",
      type: "rating",
   },
   {
      id: 4,
      prompt: "How you Contact to our Company?",
      type: "select",
      options: ["Facebook", "Instagram", "Twitter"],
   },
];

/**
 * Object of colors.
 * @type {import("../types").OptionColors}
 */
export const optColors = {
   A: {
      color: "#f9b71b",
      background: "#fff4da",
   },
   B: {
      color: "#48d380",
      background: "#e4feef",
   },
   C: {
      color: "#887fb4",
      background: "#eeecfc",
   },
   D: {
      color: "#10ddf9",
      background: "#e5fbfe",
   },
};
