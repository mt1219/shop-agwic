import { terms } from "./terms";
import { privacy } from "./privacy";
import { cookies } from "./cookies";
import { accessibility } from "./accessibility";

export type LegalPage = {
  slug: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: { id: string; heading: string; body: string }[];
};

export const legalPages: Record<string, LegalPage> = {
  terms,
  privacy,
  cookies,
  accessibility,
};

export function getLegalPage(slug: string): LegalPage | undefined {
  return legalPages[slug];
}
