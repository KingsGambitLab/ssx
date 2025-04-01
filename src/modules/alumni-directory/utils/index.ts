// import CaseUtil from "@/libs/caseUtil";
// import { AlumniFilters } from "../types";

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

export const formatGetAllAlumniParams = (pageNumber: number, filters: AlumniFilters) => {
  const params: Record<string, unknown> = {
    program_slug: 'school_of_tech',
    page_number: pageNumber || 1,
  };

  if (filters?.quick?.length > 0) {
    params.quick_filters = filters.quick;
  }

  if (filters?.search) {
    params.search = filters.search;
  }

  const advancedFilters: Record<string, string[]> = {};

  if (filters?.advanced?.city?.length > 0) {
    advancedFilters.city = filters.advanced.city;
  }

  if (filters?.advanced?.state?.length > 0) {
    advancedFilters.state = filters.advanced.state;
  }

  if (filters?.advanced?.batchYear?.length > 0) {
    advancedFilters.batch_year = filters.advanced.batchYear;
  }

  if (filters?.advanced?.clubs?.length > 0) {
    advancedFilters.clubs = filters.advanced.clubs;
  }

  if (Object.keys(advancedFilters).length > 0) {
    params.advanced_filters = advancedFilters;
  }
  return params;
}

