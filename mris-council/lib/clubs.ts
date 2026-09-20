import { Club, Opportunity, LeaderboardEntry } from "./types";

export const clubs: Club[] = [
  { slug: "council", name: "Student Council" },
  { slug: "robotics", name: "Robotics Club" },
  { slug: "media", name: "Media Club" },
];

export const opportunities: Opportunity[] = [
  { id: "1", title: "Campus Cleanup Day", club: "Student Council", date: "Oct 4", location: "Main Quad", slots: 12 },
  { id: "2", title: "Library Book Sorting", club: "Media Club", date: "Oct 9", location: "Library", slots: 6 },
  { id: "3", title: "Open House Guides", club: "Student Council", date: "Oct 18", location: "Front Hall", slots: 20 },
];

export const leaderboard: LeaderboardEntry[] = [
  { name: "Amira K.", club: "Student Council", hours: 42 },
  { name: "Daniyar T.", club: "Robotics Club", hours: 37 },
  { name: "Sara N.", club: "Media Club", hours: 31 },
  { name: "Yusuf B.", club: "Student Council", hours: 28 },
];