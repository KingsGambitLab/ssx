import VideoThumbnail from "@public/images/sst/webp/neosapien-yt-thumbnail.webp"

type Stats = {
  id: number;
  title: string;
  desc: string;
}

type VideoCard = {
  thumbnail: string;
  content: string;
  footer: string;
};

export const STATS : Stats[] = [
  {
    id: 0,
    title: "10+",
    desc: "Startups founded  by SST students so far",
  },
  {
    id: 1,
    title: "1 Cr",
    desc: "Dedicated Student Fund for startups founded by SST students",
  },
  {
    id: 2,
    title: "3",
    desc: "Industry-sponsored Projects from Innovation Lab",
  },
  {
    id: 3,
    title: "55+",
    desc: "Founders, CXOs, Startup Leaders, have visited our Innovation Lab",
  },
]

export const VIDEO_CARD : VideoCard = {
  thumbnail: VideoThumbnail.src,
  content: '“Joining Scaler Innovation Lab is a game-changer for us. The funding, mentorship, and access to top-tier talent will significantly boost our growth trajectory...”',
  footer: "NeoSapien Co-Founder Dhananjay Yadav",
}

export const HEADER = "Our Office of Entrepreneurship Helps You Build the Future"