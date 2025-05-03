import Ayaan from '@public/images/sst/webp/innovation-lab-projects/ayaan.webp';
import AiGlasses from '@public/images/sst/webp/innovation-lab-projects/ai-glasses.webp';
import Bhashini from '@public/images/sst/webp/innovation-lab-projects/bhashini.webp';
import Drone from '@public/images/sst/webp/innovation-lab-projects/drone.webp';
import Robodog from '@public/images/sst/webp/innovation-lab-projects/robodog.webp';
import VisionPro from '@public/images/sst/webp/innovation-lab-projects/vision-pro.webp';

type VideoCard = {
  id: number;
  thumbnail: string;
  title: string;
  desc: string;
}

export const HEADER = {
  title: "Innovation Lab Projects by SST students",
}

export const VIDEO_CARDS: VideoCard[] = [
  {
    id: 0,
    thumbnail: Bhashini.src,
    title: "INDIA's BHASHINI PROJECT",
    desc: "Hear our first-year students discuss developing an app for India's Bhashini Project.",
  },
  {
    id: 1,
    thumbnail: Robodog.src,
    title: "Meet RoboDog from SST Innovation Lab",
    desc: "Where our students training it for actions like dancing, playing football, and opening doors.",
  },
  {
    id: 2,
    thumbnail: Drone.src,
    title: "AUTONOMOUS DRONE TO DETECT FIRE",
    desc: "Watch our students build an 'Autonomous Drone' to detect and fight fires on the go!",
  },
  {
    id: 3,
    thumbnail: VisionPro.src,
    title: "APP BUILT FOR VISION PRO",
    desc: "An app that helps you realistically envision your home decor and make the perfect design choices",
  },
  {
    id: 4,
    thumbnail: AiGlasses.src,
    title: "AI Glasses for the Blind!",
    desc: "A device that can recognise the object in front of you, tells distance, its texture and much more.",
  },
  {
    id: 5,
    thumbnail: Ayaan.src,
    title: "HAND GESTURE CONTROLLER",
    desc: "SST student developed a PC racing game controlled by hand gestures, Featured on India Today.",
  },
]