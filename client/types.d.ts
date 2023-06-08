import { CompositeImage } from "./lib";

type OptionLetter = "A" | "B" | "C" | "D";
interface QuestionPrompt {
  prompt: string;
}

interface OptionalQuestion {
  type: "optional";
  options:
    | {
      [key in OptionLetter]: string;
    }
    | Array<{ compositeImage: CompositeImage; description: string }>;
  correctAnswer: string;
}

interface TextQuestion {
  type: "textbox";
}

interface RatingQuestion {
  type: "rating";
}

interface SelectQuestion {
  type: "select";
  options: Array<string>;
}

type Question =
  & {
    id: number;
    subtext?: string;
  }
  & QuestionPrompt
  & (OptionalQuestion | TextQuestion | RatingQuestion | SelectQuestion);
type OptionColors = {
  [key in OptionLetter]: {
    color: string;
    background: string;
  };
};
