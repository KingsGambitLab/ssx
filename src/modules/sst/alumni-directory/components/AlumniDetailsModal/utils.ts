import LeoHouseLogo from '@public/images/sst/webp/leo.webp';
import TuskerHouseLogo from '@public/images/sst/webp/tusker.webp';
import PhoenixHouseLogo from '@public/images/sst/webp/phoenix.webp';
import KongHouseLogo from '@public/images/sst/webp/kong.webp';
import LeoHouseLogoMobile from '@public/images/sst/webp/leo-mobile.webp';
import TuskerHouseLogoMobile from '@public/images/sst/webp/tusker-mobile.webp';
import PhoenixHouseLogoMobile from '@public/images/sst/webp/phoenix-mobile.webp';
import KongHouseLogoMobile from '@public/images/sst/webp/kong-mobile.webp';


type HouseName = 'leo' | 'tusker' | 'phoenix' | 'kong';
type DeviceType = 'mobile' | 'desktop';

export const houseImageMapping = {
  'leo': LeoHouseLogo,
  'tusker': TuskerHouseLogo,
  'phoenix': PhoenixHouseLogo,
  'kong': KongHouseLogo,
} as const;

const houseImageMobileMapping = {
  'leo': LeoHouseLogoMobile,
  'tusker': TuskerHouseLogoMobile,
  'phoenix': PhoenixHouseLogoMobile,
  'kong': KongHouseLogoMobile,
} as const;

export const clubIconMapping = {

}

export const getHouseImage = (houseName: string, deviceType: DeviceType) => {
  if (deviceType === 'mobile') {
    return houseImageMobileMapping[houseName.toLowerCase() as HouseName]
      || houseImageMobileMapping.leo;
  }
  return houseImageMapping[houseName.toLowerCase() as HouseName] || houseImageMapping.leo;
}
