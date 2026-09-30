import classesData from '@/content/classes.json';
import raidsData from '@/content/raids.json';
import rulesData from '@/content/rules.json';

export type ContentStatus = 'confirmed' | 'beta' | 'community' | 'validating';

export type SourceLink = {
  title: string;
  url: string;
  origin: string;
};

export type ClassGuide = {
  slug: string;
  name: string;
  accent: string;
  status: ContentStatus;
  updatedAt: string;
  roles: string[];
  combat: string;
  resource: string;
  pace: string;
  management: string;
  solo: string;
  difficulty: string;
  fantasy: string;
  summary: string;
  likes: string[];
  avoid: string[];
  communityNote: string;
  communitySources: string[];
  rotation: {
    status: ContentStatus;
    title: string;
    steps: string[];
  };
  macros: Array<{ name: string; code: string; note: string }>;
  consumables: { status: ContentStatus; items: string[] };
};

export type RaidGuide = {
  slug: string;
  name: string;
  originalName: string;
  status: ContentStatus;
  updatedAt: string;
  size: string;
  releaseDate: string;
  summary: string;
  composition: string[];
  preparation: string[];
  strategy: string[];
  videos: Array<{ title: string; url: string; source: string }>;
  sources: SourceLink[];
};

export type GuildRules = {
  version: string;
  updatedAt: string;
  status: ContentStatus;
  conduct: string[];
  raidParticipation: string[];
  dkp: {
    startingBalance: number;
    minimumBid: number;
    earnings: Array<{ label: string; points: number }>;
    lootRules: string[];
    penalties: string;
    example: Array<{ event: string; change: string; balance: string }>;
  };
};

export const classes = classesData as ClassGuide[];
export const raids = raidsData as RaidGuide[];
export const guildRules = rulesData as GuildRules;

function validateContent() {
  const classSlugs = new Set(classes.map((item) => item.slug));
  const raidSlugs = new Set(raids.map((item) => item.slug));

  if (classes.length !== 9 || classSlugs.size !== classes.length) {
    throw new Error('O catálogo precisa conter nove classes com slugs únicos.');
  }

  if (raidSlugs.size !== raids.length) {
    throw new Error('As raids precisam ter slugs únicos.');
  }

  for (const item of [...classes, ...raids]) {
    if (!item.updatedAt || !item.status) {
      throw new Error(`Conteúdo incompleto: ${item.slug}`);
    }
  }

  if (guildRules.dkp.minimumBid <= 0 || guildRules.dkp.earnings.length < 4) {
    throw new Error('A política DKP está incompleta.');
  }
}

validateContent();

export function getClassGuide(slug: string) {
  return classes.find((item) => item.slug === slug);
}

export function getRaidGuide(slug: string) {
  return raids.find((item) => item.slug === slug);
}
