export type Club = {
  slug: string;
  name: string;
};

export type Opportunity = {
  id: string;
  title: string;
  club: string;
  date: string;
  location: string;
  slots: number;
};

export type LeaderboardEntry = {
  name: string;
  club: string;
  hours: number;
};