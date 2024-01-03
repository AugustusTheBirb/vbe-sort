import { Accordion } from "react-bootstrap";
import nrTopicLut from "./data/nr-topic-lut.json";
import { MathProblemIdType, parseProblemFilename, shuffle } from "../../misc";
import ProblemRoot from "./ProblemRoot";
import SingleProblem from "./SingleProblem";
import TopicItemHeader from "./TopicItemHeader";

interface TopicItemProps {
  topic: { topic: string; name: string };
  yearList: string[];
  isShuffleOn: boolean;
}

export default function TopicItem({
  topic,
  yearList,
  isShuffleOn,
}: TopicItemProps) {
  return (
    <Accordion.Item eventKey={topic.topic}>
      <TopicItemHeader
        topic={topic}
        problemCount={
          nrTopicLut.filter(
            (problem) =>
              problem.topic === topic.topic &&
              yearList.includes(
                `${parseProblemFilename("math", problem.filename).year}${
                  parseProblemFilename("math", problem.filename).isSecondary
                    ? "k"
                    : "g"
                }`
              )
          ).length
        }
      />
      <Accordion.Body>
        {shuffle(
          nrTopicLut.filter((problem) => {
            const currProblemInfo: any = parseProblemFilename(
              "math",
              problem.filename
            );
            return (
              yearList.includes(
                `${currProblemInfo.year}${
                  currProblemInfo.isSecondary ? "k" : "g"
                }`
              ) && problem.topic === topic.topic
            );
          }),
          isShuffleOn
        ).map((problem) => {
          const currProblemInfo: any = parseProblemFilename(
            "math",
            problem.filename
          );
          return (
            <div key={problem.filename} style={{}}>
              <hr style={{ border: "3px solid black" }} />
              <em>
                {currProblemInfo.year} m.{" "}
                {currProblemInfo.isSecondary ? "pakartotinė" : "pagrindinė"}{" "}
                sesija {currProblemInfo.section} dalis
              </em>
              {currProblemInfo.problemType === "sub" && (
                <ProblemRoot currProblemInfo={currProblemInfo} />
              )}
              <SingleProblem filename={problem.filename} />
            </div>
          );
        })}
      </Accordion.Body>
    </Accordion.Item>
  );
}
