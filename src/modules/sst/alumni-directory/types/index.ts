interface AllAlumniAttributes {
  school: string;
  city: string;
  state: string;
  batchYear: number;
  name: string;
  linkedin: string;
  image: string;
}

export interface AllAlumniData {
  id: string;
  type: string;
  attributes: AllAlumniAttributes;
}

export interface AllAlumniResponse {
  data: AllAlumniData[];
  totalEntries: number;
}

interface AlumniProject {
  id: number;
  title: string;
  description: string;
  projectLink: string;
}

interface AlumniAttributes {
  school: string;
  city: string;
  state: string;
  house: string;
  clubs: string[] | null;
  batchYear: number;
  name: string;
  image: string;
  linkedinProfile: string;
  projects: AlumniProject[] | null;
}

interface AlumniData {
  id: string | null;
  type: string;
  attributes: AlumniAttributes;
}

export interface AlumniDataResponse {
  data: AlumniData[];
}

export interface FilterOptionsResponse {
  advancedFilters: Record<string, string[]>;
  quickFilters: string[];
}

export type AdvancedFilters = {
  state: string[];
  city: string[];
  batchYear: string[];
  clubs: string[];
}

export type AlumniFilters = {
  quick: string[];
  advanced: AdvancedFilters;
  search: string;
}

export type FiltersTabProps = {
  state: string[];
  city: string[];
  batchYear: string[];
  clubs: string[];
};

export type AdvancedFiltersProps = {
  filters: FiltersTabProps;
  appliedFilters: AlumniFilters;
  onFilterChange: (filters: AlumniFilters) => void;
};

export type FilterOption = {
  label: string;
  value: string;
  count?: number;
};

export type AdvancedFiltersType = {
  state: string[];
  city: string[];
  batchYear: string[];
  clubs: string[];
};

export type TrackingProps = {
  clickType: string;
  clickText?: string;
  clickSource?: string;
  custom?: object;
};

