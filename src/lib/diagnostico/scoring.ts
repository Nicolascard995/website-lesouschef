import { AREAS, QUESTIONS_BY_AREA, TOTAL_QUESTIONS } from './questions';
import type { AnswerValue, AreaId } from './questions';

export const ANSWER_WEIGHTS: Record<AnswerValue, number> = {
  yes: 1,
  partial: 0.5,
  no: 0,
  dk: 0,
};

export const WEAK_THRESHOLD = 0.5;

export type Answers = Partial<Record<string, AnswerValue>>;

export type AreaScore = {
  area: AreaId;
  raw: number;
  max: number;
  percent: number;
};

export type DiagnosticoScore = {
  total: number;
  totalMax: number;
  totalPercent: number;
  areas: AreaScore[];
  weakAreas: AreaId[];
};

export function weightOf(answer: AnswerValue | undefined): number {
  return answer ? ANSWER_WEIGHTS[answer] : 0;
}

export function scoreArea(area: AreaId, answers: Answers): AreaScore {
  const questions = QUESTIONS_BY_AREA[area];
  const max = questions.length;
  const raw = questions.reduce((acc, q) => acc + weightOf(answers[q.id]), 0);
  return {
    area,
    raw,
    max,
    percent: max === 0 ? 0 : raw / max,
  };
}

export function scoreDiagnostico(answers: Answers): DiagnosticoScore {
  const areas = AREAS.map((a) => scoreArea(a, answers));
  const total = areas.reduce((acc, a) => acc + a.raw, 0);
  const weakAreas = areas
    .filter((a) => a.percent < WEAK_THRESHOLD)
    .sort((a, b) => a.percent - b.percent)
    .map((a) => a.area);
  return {
    total,
    totalMax: TOTAL_QUESTIONS,
    totalPercent: TOTAL_QUESTIONS === 0 ? 0 : total / TOTAL_QUESTIONS,
    areas,
    weakAreas,
  };
}
