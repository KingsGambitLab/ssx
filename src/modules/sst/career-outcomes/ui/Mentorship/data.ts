import PeopleIcon from '@public/images/sst/svg/career_outcomes/mentorship/people.svg';
import HandshakeIcon from '@public/images/sst/svg/career_outcomes/mentorship/handshake.svg';

export interface MentorshipItem {
  title: string;
  description: string;
  icon: string;
}

export const mentorshipData: MentorshipItem[] = [
  {
    title: '1:1 Mentorship from Founders, CXOs',
    description: 'Guidance from Amod Malviya (Udaan), Sequoia mentors & Scaler leaders (ex-Facebook, Google, Amazon).',
    icon: PeopleIcon.src
  },
  {
    title: 'Tech x Business Collaboration',
    description: 'Partner with Scaler School of Business PG students to build market-ready products.',
    icon: HandshakeIcon.src
  }
]; 