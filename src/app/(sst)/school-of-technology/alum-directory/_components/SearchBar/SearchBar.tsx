import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import AdvancedFilters from '../AdvancedFilters/AdvancedFilters';

import styles from './SearchBar.module.scss';

export default function SearchBar() {
  const advancedFilters = {
    state: [
      "Alabama",
      "Arizona",
      "Colorado",
      "Michigan",
      "New Hampshire",
      "Oklahoma",
      "South Carolina",
      "Vermont",
      "Virginia",
      "West Virginia"
    ],
    city: [
      "Bartellland",
      "Dietrichshire",
      "East Charity",
      "Jerechester",
      "Lake Carliechester",
      "North Andree",
      "Parkermouth",
      "Russelfurt",
      "South Boydview",
      "West Stefany"
    ],
    batchYear: [2023, 2024],
    clubs: [
      "Debate Club",
      "Art Club",
      "Dance Club",
      "Music Club",
      "Sports Club",
      "Photography Club",
      "Coding Club"
    ]
  };

  return (
    <div className={styles.mainContainer}>
      <AdvancedFilters filters={advancedFilters} />
      <Input
        size="large"
        placeholder="Search by name, city, state or school"
        variant="filled"
        className={styles.searchBarInput}
        suffix={<SearchOutlined />}
      />
    </div>
  );

}