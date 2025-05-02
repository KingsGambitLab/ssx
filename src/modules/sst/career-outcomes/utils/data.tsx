import BurstBgImage from '@public/images/common/webp/burst-bg.webp';
import NeoSapianThumbnail from '@public/images/sst/webp/neosapian-thumbnail.webp';
import MartinReindl from '@public/images/sst/webp/people/martin-reindl.webp';
import AdhirajArora from '@public/images/sst/webp/people/adhiraj-arora.webp';
import KshitijMishra from '@public/images/sst/webp/people/kshitij-mishra.webp';
import ManmeetSinghAkali from '@public/images/sst/webp/people/manmeet.webp';
import SunilSeetharaman from '@public/images/sst/webp/people/sunil-seetharaman.webp';
import AkhandPratapSingh from '@public/images/sst/webp/people/akhand-pratap.webp';
import AmardeepSaxena from '@public/images/sst/webp/people/amardeep-saxena.webp';
import ShrutiSagar from '@public/images/sst/webp/people/shruti-sagar.webp';

export const CareerStatsData = {
  stats: [
    {
      title: "1.13 Lakh / Month",
      desc: "Final-year level offers in 2nd year",
      image: BurstBgImage.src,
      variant: "primary",
      fullWidth: true
    },
    {
      title: "93%",
      desc: "of eligible students have got more than one internship offered – in just their 2nd year",
      variant: "tertiary"
    },
    {
      title: "10+",
      desc: "Startups incubated at Innovation Lab, one featured on Shark Tank",
      variant: "tertiary",
      mobileOnly: true
    },
    {
      title: "100+",
      desc: "Companies registered for Campus Internships",
      variant: "primary"
    }
  ],
  video: {
    thumbnail: NeoSapianThumbnail.src
  }
}

export const EntrepreneurshipTeamData = {
  title: "THE TEAM",
  subTitle: "Office of Entrepreneurship",
  people: [
    {
      image: MartinReindl,
      name: "Martin Reindl",
      prevOrganisation: "Ex Harvard, MIT Solan,",
      currOrganisation: "Oliver Wyman",
    },
    {
      image: AdhirajArora,
      name: "Adhiraj Arora",
      prevOrganisation: "Ex IIT Kanpur, ISB,",
      currOrganisation: "BCG",
    },
    {
      image: KshitijMishra,
      name: "Kshitij Mishra",
      prevOrganisation: "Ex IIIT Hyd,",
      currOrganisation: "Snapdeal",
    },
    {
      image: ManmeetSinghAkali,
      name: "Manmeet Singh Akali",
      prevOrganisation: "Ex-Founder Klarity,",
      currOrganisation: "(Acquired)",
    }
  ]
}


export const CareerOfficersTeamData = {
  title: "THE TEAM",
  subTitle: "Office of Career Services",
  team: [
    {
      image: SunilSeetharaman,
      name: "Sunil Seetharaman",
      prevOrganisation: "Ex ISB, Zomato"
    },
    {
      image: AkhandPratapSingh,
      name: "Akhand Pratap Singh",
      prevOrganisation: "Ex Zomato, Ola"
    },
    {
      image: AmardeepSaxena,
      name: "Amardeep Saxena",
      prevOrganisation: "Ex ISB, Zomato",
      currOrganisation: "HackerRank"
    }
  ]
}

export const EducationTeamData = {
  title: "THE TEAM",
  subTitle: "Office of Further Education",
  team: [
    {
      image: MartinReindl,
      name: "Martin Reindl",
      currOrganisation: "Ex Harvard, MIT Solan,",
      prevOrganisation: "Oliver Wyman",
    },
    {
      image: AdhirajArora,
      name: "Adhiraj Arora",
      currOrganisation: "Ex IIT Kanpur, ISB,",
      prevOrganisation: "BCG",
    },
    {
      image: KshitijMishra,
      name: "Kshitij Mishra",
      currOrganisation: "Ex IIIT Hyd,",
      prevOrganisation: "Snapdeal",
    },
    {
      image: ShrutiSagar,
      name: "Shruti Sagar",
      currOrganisation: "Ex-IIT Kharagpur",
      prevOrganisation: "LEK Consulting",
    }
  ]
}