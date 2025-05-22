"use client";

import React, { useEffect, useState } from "react";

import { UpcomingIntakeDetailsData } from "@modules/sst/info/types";
import { getUpcomingIntakeDetailsData } from "@modules/sst/info/api";
import { Table } from "antd";
import { DataItem, dateOfInterview, tableColumns } from "./data";
import Section from "@components/common/Section";

import styles from "./KeyDates.module.scss";

export default function KeyDates() {
  const [upcomingIntakeDetails, setUpcomingIntakeDetails] =
    useState<UpcomingIntakeDetailsData | null>(null);
  const [tableDataSource, setTableDataSource] = useState<DataItem[] | []>([]);

  const fetchUpcomingIntakeDetails = async () => {
    const response = await getUpcomingIntakeDetailsData();
    console.log("GG", response);
    setUpcomingIntakeDetails(response);
  };

  const columns = tableColumns({
    labelColumn: styles.labelColumn,
    dataColumn: styles.dataColumn,
    ...styles,
  });

  const createTabularData = (
    data: UpcomingIntakeDetailsData | null
  ): DataItem[] => {
    if (!data) return [];

    return [
      { label: "NSET Date", data: data.testDate },
      { label: "Last date to apply", data: data.deadline },
      { label: "Date of Interview", data: dateOfInterview },
      { label: "NSET Result", data: data.resultDate },
      { label: "Final Offer", data: data.offerReleaseDate },
    ];
  };

  useEffect(() => {
    fetchUpcomingIntakeDetails();
  }, []);

  useEffect(() => {
    const tabularData = createTabularData(upcomingIntakeDetails);
    setTableDataSource(tabularData);
  }, [upcomingIntakeDetails]);

  return (
    <Section>
      <div className={styles.container}>
        <div className={styles.title}>Key Dates</div>
        <div className={styles.tableContainer}>
          <Table
            dataSource={tableDataSource}
            columns={columns}
            pagination={false}
            rowKey="label"
            rowClassName={styles.tableRow}
            className={styles.comparisonTable}
            title={() => (
              <div className={styles.tableTitle}>
                {upcomingIntakeDetails?.header} Dates
              </div>
            )}
          />
        </div>
      </div>
    </Section>
  );
}
