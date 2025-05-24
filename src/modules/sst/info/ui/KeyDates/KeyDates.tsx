"use client";

import React from "react";
import { Table } from "antd";
import { DataItem, dateOfInterview, tableColumns } from "./data";
import Section from "@components/common/Section";
import { useKeyDates } from "@context/sst/KeyDatesContext";
import styles from "./KeyDates.module.scss";

export default function KeyDates() {
  const { upcomingIntakeDetails, isLoading } = useKeyDates();

  const columns = tableColumns({
    labelColumn: styles.labelColumn,
    dataColumn: styles.dataColumn,
    ...styles,
  });

  const createTabularData = (data: typeof upcomingIntakeDetails): DataItem[] => {
    if (!data) return [];

    return [
      { label: "NSET Date", data: data.testDate || 'Next Intake' },
      { label: "Last date to apply", data: data.deadline || 'Coming soon!' },
      { label: "Date of Interview", data: dateOfInterview || 'Few days after NSET Result' },
      { label: "NSET Result", data: data.resultDate || 'Coming soon!' },
      { label: "Final Offer", data: data.offerReleaseDate || 'Coming soon!' },
    ];
  };

  const tableDataSource = createTabularData(upcomingIntakeDetails);

  return (
    <Section id="key-dates">
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
            loading={isLoading}
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
