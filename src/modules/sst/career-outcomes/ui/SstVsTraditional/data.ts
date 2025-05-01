export interface ComparisonItem {
  parameter: string;
  sstAdvantage: string;
  traditionalEducation: string;
}

export const comparisonData: ComparisonItem[] = [
  {
    parameter: 'Curriculum Relevance',
    sstAdvantage: 'Syllabus rarely updated — e.g., still learning C or Pascal in many colleges',
    traditionalEducation: 'Curriculum updated every 6 months — includes GenAI, GitHub Copilot, etc.',
  },
  {
    parameter: 'Depth in Core CS Skills',
    sstAdvantage: '1 semester of DSA, taught like Math; little focus on interview prep',
    traditionalEducation: 'DSA + System Design taught like a sport — 12 months of contests, mock drills',
  },
  {
    parameter: 'Industry Exposure & Projects',
    sstAdvantage: 'Mini-projects in labs; internships often 2 months and unpaid',
    traditionalEducation: 'Students build real apps — e.g., IPL Prediction App, UrbanCo AI tool, etc.',
  },
  {
    parameter: 'Career & Placement Signals',
    sstAdvantage: 'Students build resumes on their own; placements depend on luck or outside prep',
    traditionalEducation: 'AI mock interviews + resume reviews built-in — hiring signals engineered in',
  },
];

export const tableColumns = (styles: any) => [
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