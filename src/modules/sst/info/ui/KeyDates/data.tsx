export interface DataItem {
  label: string;
  data: string;
}

interface TableStyles {
  labelColumn: string;
  dataColumn: string;
  [key: string]: string;
}

export const tableColumns = (styles: TableStyles) => [
  {
    title: "",
    dataIndex: "label",
    key: "label",
    className: styles.labelColumn,
  },
  {
    title: "",
    dataIndex: "data",
    key: "data",
    className: styles.dataColumn,
  },
];

export const dateOfInterview = "Few days after NSET Result";
