import { AlumniFilters } from "../types";

export const formatGetAllAlumniParams = (pageNumber: number, filters: AlumniFilters): Record<string, unknown> => {
  const params: Record<string, unknown> = {
    program_slug: 'school_of_tech',
    page_number: pageNumber || 1,
  };

  if (filters?.quick?.length) params.quick_filters = filters.quick;
  if (filters?.search) params.search = filters.search;

  const advancedFilterMap = {
    city: 'city',
    state: 'state',
    batchYear: 'batch_year',
    clubs: 'clubs'
  } as const;

  const advancedFilters = Object.entries(advancedFilterMap).reduce((acc, [frontendKey, apiKey]) => {
    const values = filters?.advanced?.[frontendKey as keyof typeof filters.advanced];
    if (values?.length) {
      acc[apiKey] = values;
    }
    return acc;
  }, {} as Record<string, string[]>);

  if (Object.keys(advancedFilters).length) {
    params.advanced_filters = advancedFilters;
  }

  return params;
};

