export interface ComparisonItem {
  parameter: string;
  sstAdvantage: string;
  traditionalEducation: string;
}

export const comparisonData: ComparisonItem[] = [
  {
    parameter: 'Curriculum Relevance',
    traditionalEducation: 'Syllabus rarely updated — e.g., still learning C or Pascal in many colleges',
    sstAdvantage: 'Curriculum updated every 6 months — includes GenAI, GitHub Copilot, etc.',
  },
  {
    parameter: 'Depth in Core CS Skills',
    traditionalEducation: '1 semester of DSA, taught like Math; little focus on interview prep',
    sstAdvantage: 'DSA + System Design taught like a sport — 12 months of contests, mock drills',
  },
  {
    parameter: 'Industry Exposure & Projects',
    traditionalEducation: 'Mini-projects in labs; internships often 2 months and unpaid',
    sstAdvantage: 'Students build real apps — e.g., IPL Prediction App, UrbanCo AI tool, etc.',
  },
  {
    parameter: 'Career & Placement Signals',
    traditionalEducation: 'Students build resumes on their own; placements depend on luck or outside prep',
    sstAdvantage: 'AI mock interviews + resume reviews built-in — hiring signals engineered in',
  },
];

// Define a proper type for the styles parameter
interface TableStyles {
  parameterColumn: string;
  sstColumn: string;
  traditionalColumn: string;
  [key: string]: string; // For any other style properties that might be used
}

export const tableColumns = (styles: TableStyles) => [
  {
    title: 'Future Ready Parameter',
    dataIndex: 'parameter',
    key: 'parameter',
    className: styles.parameterColumn,
  },
  {
    title: 'SST Advantage',
    dataIndex: 'sstAdvantage',
    key: 'sstAdvantage',
    className: styles.sstColumn,
  },
  {
    title: 'Traditional Education',
    dataIndex: 'traditionalEducation',
    key: 'traditionalEducation',
    className: styles.traditionalColumn,
  },
]; 