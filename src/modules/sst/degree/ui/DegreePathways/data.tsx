import { TabData } from "@components/common/TabLayout/TabLayout";
import { JSX } from "react";
import DegreeTab from "../../components/DegreeTab/DegreeTab";
import { FourYearsData, ThreeYearsData } from "../../components/DegreeTab/data";

type HeaderText = {
  title: string;
  subtitle: JSX.Element;
};

export const headerData: HeaderText = {
  title: "Degree Pathways for SST Students",
  subtitle: (
    <>
      Choose from a diverse range of degree options:{" "}
      <span>4-year programme or 3+1-year programme</span>
    </>
  ),
};

export const tabsData: TabData[] = [
  {
    key: "four_year_program",
    content: <DegreeTab data={FourYearsData} />,
    label: "4 Year Programme",
  },
  {
    key: "three_plus_1_year_program",
    content: <DegreeTab data={ThreeYearsData} />,
    label: "3+1 Year Programme",
  },
];
