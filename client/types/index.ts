import { CompositeImage } from "@/lib";

export type OptionLetter = "A" | "B" | "C" | "D";
export interface QuestionPrompt {
  prompt: string;
}

export interface OptionalQuestion {
  type: "optional";
  options:
    | {
      [key in OptionLetter]: string;
    }
    | Array<{ compositeImage: CompositeImage; description: string }>;
  correctAnswer: string;
}

export interface TextQuestion {
  type: "textbox";
}

export interface RatingQuestion {
  type: "rating";
}

export interface SelectQuestion {
  type: "select";
  options: Array<string>;
}

export type Question =
  & {
    id: number;
    subtext?: string;
  }
  & QuestionPrompt
  & (OptionalQuestion | TextQuestion | RatingQuestion | SelectQuestion);

export type OptionColors = {
  [key in OptionLetter]: {
    color: string;
    background: string;
  };
};
