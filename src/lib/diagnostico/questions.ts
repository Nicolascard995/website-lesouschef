export type AnswerValue = 'yes' | 'partial' | 'no' | 'dk';

export type AreaId =
  | 'costos'
  | 'cocina'
  | 'sala'
  | 'equipo'
  | 'digital'
  | 'legal';

export type Question = {
  id: string;
  area: AreaId;
};

export const ANSWER_VALUES: readonly AnswerValue[] = [
  'yes',
  'partial',
  'no',
  'dk',
];

export const AREAS: readonly AreaId[] = [
  'costos',
  'cocina',
  'sala',
  'equipo',
  'digital',
  'legal',
];

export const QUESTIONS: readonly Question[] = [
  { id: 'costos-1', area: 'costos' },
  { id: 'costos-2', area: 'costos' },
  { id: 'costos-3', area: 'costos' },
  { id: 'costos-4', area: 'costos' },
  { id: 'cocina-1', area: 'cocina' },
  { id: 'cocina-2', area: 'cocina' },
  { id: 'cocina-3', area: 'cocina' },
  { id: 'sala-1', area: 'sala' },
  { id: 'sala-2', area: 'sala' },
  { id: 'sala-3', area: 'sala' },
  { id: 'equipo-1', area: 'equipo' },
  { id: 'equipo-2', area: 'equipo' },
  { id: 'equipo-3', area: 'equipo' },
  { id: 'equipo-4', area: 'equipo' },
  { id: 'digital-1', area: 'digital' },
  { id: 'digital-2', area: 'digital' },
  { id: 'digital-3', area: 'digital' },
  { id: 'legal-1', area: 'legal' },
  { id: 'legal-2', area: 'legal' },
  { id: 'legal-3', area: 'legal' },
];

export const QUESTIONS_BY_AREA = {
  costos: QUESTIONS.filter((q) => q.area === 'costos'),
  cocina: QUESTIONS.filter((q) => q.area === 'cocina'),
  sala: QUESTIONS.filter((q) => q.area === 'sala'),
  equipo: QUESTIONS.filter((q) => q.area === 'equipo'),
  digital: QUESTIONS.filter((q) => q.area === 'digital'),
  legal: QUESTIONS.filter((q) => q.area === 'legal'),
} as const satisfies Record<AreaId, readonly Question[]>;

export const TOTAL_QUESTIONS = QUESTIONS.length;
