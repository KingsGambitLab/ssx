// import CaseUtil from "@libs/caseUtil";
import { AlumniFilters } from "../types";

// import { AdvancedFiltersType } from "../types";

// import { AlumniFilters, AdvancedFiltersType } from "../types";

// export const getPreSelectedAdvancedFilters = (
//   advancedFilters: AdvancedFiltersType,
//   appliedFilters: AlumniFilters
// ): AdvancedFiltersType => {
//   const upatedFilters = ObadvancedFilters.map((filter) => {

//   })
// };


// export const getPreSelectedAdvancedFilters = (selectedAdvancedFilters: AdvancedFiltersType, advancedFilters: AdvancedFiltersType, appliedFilters: AlumniFilters) => {
//   const updatedFilters = Object.entries(advancedFilters).reduce((acc, [filterKey, values]) => {
//     const preSelectedValues = values.filter(value =>
//       appliedFilters?.quick?.some(quickValue => {
//         if (quickValue.startsWith('batch_')) {
//           const year = quickValue.split('_')[1];
//           return Number(value) === Number(year);
//         }
//         return String(quickValue).toLowerCase() === String(value).toLowerCase();
//       })
//     );

//     const currentValues = selectedAdvancedFilters[filterKey as keyof AdvancedFiltersType] || [];
//     const newValues = [...new Set([...currentValues, ...preSelectedValues])];

//     // Only update if values have changed
//     if (JSON.stringify(currentValues) !== JSON.stringify(newValues)) {
//       return {
//         ...acc,
//         [filterKey]: newValues
//       };
//     }
//     return acc;
//   }, {});

//   return updatedFilters;
// };

// export const getPreSelectedQuickFilters = (quickFilters: string[], appliedFilters: AlumniFilters) => {
//   return quickFilters.filter(filter =>
//     Object.values(appliedFilters?.advanced || {}).some(advancedValues =>
//       advancedValues.some(value => String(value).toLowerCase() === String(filter).toLowerCase())
//     )
//   );
// };

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

