import { schemesData, type SeedScheme } from "./schemes-data";
import { Gender, Occupation } from "@/types";

export interface SchemeQuery {
  age?: number;
  gender?: Gender;
  occupation?: Occupation;
  monthlyIncome?: number;
}

export interface SchemeMatch {
  scheme: SeedScheme;
  /** True if the person clearly meets every stated criterion. */
  eligible: boolean;
  /** Friendly notes explaining why it fits (or what to check). */
  notes: string[];
}

/**
 * Match a person against the seed schemes using their eligibility rules.
 * Returns eligible schemes first, each with a plain-language explanation.
 */
export function matchSchemes(query: SchemeQuery): SchemeMatch[] {
  const matches: SchemeMatch[] = schemesData.map((scheme) => {
    const { eligibility } = scheme;
    const notes: string[] = [];
    let eligible = true;

    if (eligibility.minAge !== undefined && query.age !== undefined) {
      if (query.age < eligibility.minAge) {
        eligible = false;
        notes.push(`Usually for ages ${eligibility.minAge}+.`);
      }
    }
    if (eligibility.maxAge !== undefined && query.age !== undefined) {
      if (query.age > eligibility.maxAge) {
        eligible = false;
        notes.push(`Typically for ages up to ${eligibility.maxAge}.`);
      }
    }
    if (
      eligibility.maxMonthlyIncome !== undefined &&
      query.monthlyIncome !== undefined &&
      query.monthlyIncome > eligibility.maxMonthlyIncome
    ) {
      eligible = false;
      notes.push("Income appears above the usual limit for this scheme.");
    }
    if (
      eligibility.occupations &&
      eligibility.occupations.length > 0 &&
      query.occupation &&
      !eligibility.occupations.includes(query.occupation)
    ) {
      eligible = false;
      notes.push("Meant for specific occupations.");
    }
    if (
      eligibility.genders &&
      eligibility.genders.length > 0 &&
      query.gender &&
      !eligibility.genders.includes(query.gender)
    ) {
      eligible = false;
    }

    if (eligible && notes.length === 0) {
      notes.push("Based on what you shared, you look eligible for this. 🎉");
    }

    return { scheme, eligible, notes };
  });

  // Eligible first, then by category name for stable ordering.
  return matches.sort((a, b) => Number(b.eligible) - Number(a.eligible));
}
