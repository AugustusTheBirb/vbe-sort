export type MathProblemIdType = {
  year: string; //"2023g" | "2023k" | "2010v" | "2010b" | "2002p" ...
  section: "I" | "II" | "III";
  number: number;
  isBlevel: boolean | undefined;
  problemType: "whole" | "root" | "sub";
};

export type BioProblemIdType = {
  year: string;
  section: "I" | "II" | "III" | "IV";
  number: number;
};

export type HistProblemIdType = {
  year: string;
  section: "I" | "II";
  number: number;
  problemType: "sources" | "questions" | "abcd";
};

export type PuppProblemIdType = {
  year: string;
  number: number;
  problemType: "whole" | "root" | "sub";
};

export type SubjectType = "math" | "bio" | "hist" | "pupp";

export function parseProblemFilename(
  subject: SubjectType,
  filename: string
):
  | MathProblemIdType
  | BioProblemIdType
  | HistProblemIdType
  | PuppProblemIdType {
  if (subject === "math") {
    const year = filename.substring(0, 5);
    const section: MathProblemIdType["section"] =
      filename.charAt(5) === "1"
        ? "I"
        : filename.charAt(5) === "2"
        ? "II"
        : "III";
    const problemType: MathProblemIdType["problemType"] =
      filename.charAt(6) === "w"
        ? "whole"
        : filename.charAt(6) === "r"
        ? "root"
        : "sub";
    let number;
    let isBLevel;

    if (problemType === "sub") {
      number = parseFloat(filename.substring(7, 11));
      isBLevel =
        filename.charAt(11) === "A"
          ? false
          : filename.charAt(11) === "B"
          ? true
          : undefined;
    } else {
      number = parseInt(filename.substring(7, 9));
      isBLevel =
        filename.charAt(9) === "A"
          ? false
          : filename.charAt(9) === "B"
          ? true
          : undefined;
    }

    return {
      year,
      section,
      problemType,
      number,
      isBlevel: isBLevel,
    };
  } else if (subject === "bio") {
    const year = filename.substring(0, 5);
    const section: BioProblemIdType["section"] =
      filename.charAt(5) === "1"
        ? "I"
        : filename.charAt(5) === "2"
        ? "II"
        : filename.charAt(5) === "3"
        ? "III"
        : "IV";
    const number = parseInt(filename.substring(7, 9));

    return {
      year,
      section,
      number,
    };
  } else if (subject === "hist") {
    const year = filename.substring(0, 5);
    const section: HistProblemIdType["section"] =
      filename.charAt(5) === "1" ? "I" : "II";
    let number: HistProblemIdType["number"];
    let problemType: HistProblemIdType["problemType"];
    if (section === "I") {
      number = parseInt(filename.substring(7, 9));
      problemType = "abcd";
    } else if (section === "II") {
      number = parseInt(filename.substring(7, 8));
      problemType =
        filename.charAt(8) === "s"
          ? "sources"
          : filename.charAt(8) === "u"
          ? "questions"
          : "abcd";
    } else {
      throw Error("Filename parse error, section '" + section + "'");
    }
    return {
      year,
      section,
      number,
      problemType,
    };
  } else if (subject === "pupp") {
    const year = filename.substring(0, 5);
    const problemType: PuppProblemIdType["problemType"] =
      filename.charAt(6) === "w"
        ? "whole"
        : filename.charAt(6) === "r"
        ? "root"
        : "sub";
    let number;

    if (problemType === "sub") {
      number = parseFloat(filename.substring(5, 9));
    } else {
      number = parseInt(filename.substring(5, 7));
    }

    return {
      year,
      problemType,
      number,
    };
  } else {
    throw Error("No parser for problem subject '" + subject + "'");
  }
}

export function shuffle(array: any[], isShuffleOn: boolean) {
  if (isShuffleOn) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  } else {
    return array;
  }
}
export function getLongYearName(year: string) {
  const yearNumber = parseInt(year.substring(0, 4));
  const yearLetter = year.charAt(4);
  let yearName = "";
  if (yearLetter === "g") {
    yearName = yearNumber + " m. pagrindinė sesija";
  } else if (yearLetter === "k") {
    yearName = yearNumber + " m. pakartotinė sesija";
  } else if (yearLetter === "v") {
    yearName = yearNumber + " m. pavyzdinės užduotys";
  } else if (yearLetter === "b") {
    yearName = yearNumber + " m. bandomasis egzaminas";
  } else if (yearLetter === "p") {
    yearName = yearNumber + " m. užduotys";
  } else if (yearLetter === "1") {
    yearName = yearNumber + " m. I srautas";
  } else if (yearLetter === "2") {
    yearName = yearNumber + " m. II srautas";
  } else if (yearLetter === "3") {
    yearName = yearNumber + " m. III srautas";
  } else {
    throw Error("Invalid year letter '" + yearLetter + "'");
  }
  return yearName;
}
