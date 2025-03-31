import LeoHouseLogo from '@/public/images/sst/svg/leo.svg';
import TuskerHouseLogo from '@/public/images/sst/svg/tusker.svg';
import PhoenixHouseLogo from '@/public/images/sst/svg/phoenix.svg';
import KongHouseLogo from '@/public/images/sst/svg/kong.svg';
import LeoHouseLogoMobile from '@/public/images/sst/svg/leo-mobile.svg';
import TuskerHouseLogoMobile from '@/public/images/sst/svg/tusker-mobile.svg';
import PhoenixHouseLogoMobile from '@/public/images/sst/svg/phoenix-mobile.svg';
import KongHouseLogoMobile from '@/public/images/sst/svg/kong-mobile.svg';


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
