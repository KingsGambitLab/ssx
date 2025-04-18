import LocationDarkIcon from '@public/images/sst/svg/location-icon.svg';
import BatchDarkIcon from '@public/images/sst/svg/users-three-icon.svg';
import SchoolDarkIcon from '@public/images/sst/svg/backpack-icon.svg';
import LocationLightIcon from '@public/images/sst/svg/location-white-icon.svg';
import BatchLightIcon from '@public/images/sst/svg/users-three-white-icon.svg';
import SchoolLightIcon from '@public/images/sst/svg/backpack-white-icon.svg';

const infoItemsIconImage = (variant: 'light' | 'dark') => {
  switch (variant) {
    case 'dark':
      return {
        batch: BatchLightIcon,
        location: LocationLightIcon,
        school: SchoolLightIcon,
      }
    case 'light':
      return {
        batch: BatchDarkIcon,
        location: LocationDarkIcon,
        school: SchoolDarkIcon,
      }
    default:
      return {
        batch: BatchLightIcon,
        location: LocationLightIcon,
        school: SchoolLightIcon,
      }
  }
}

export const infoItemsProps = (variant: 'light' | 'dark', batchYear: number, city: string, state: string, school: string) => {
  const items = [];
  
  if (batchYear) {
    items.push({ iconImage: infoItemsIconImage(variant)?.batch, text: `Batch ${batchYear}` });
  }
  
  if (city && state) {
    const locationText = city && state ? `${city}, ${state}` : (city || state);
    items.push({ iconImage: infoItemsIconImage(variant)?.location, text: locationText });
  }
  
  if (school) {
    items.push({ iconImage: infoItemsIconImage(variant)?.school, text: school });
  }
  
  return items;
}