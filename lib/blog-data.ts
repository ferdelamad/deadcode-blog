export interface Post {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  readingTime: string
}

export const posts: Post[] = [
  {
    id: "1",
    title: "Unethical design of cookie windows",
    excerpt: "All of the sites we visit today use trackers called cookies. These cookies (trackers) always track our internet footprint and collect data about us...",
    date: "24 June, 2023",
    category: "ETHICS",
    readingTime: "6 min"
  },
  {
    id: "2",
    title: "10 keyboard types in iOS",
    excerpt: "iOS provides several types of onscreen keyboards, each designed to facilitate a different situation. — Apple has 10+2 keyboards for iOS...",
    date: "1 March, 2022",
    category: "DESIGN",
    readingTime: "4 min"
  },
  {
    id: "3",
    title: "Case study: Redesign of the Moment application",
    excerpt: "Companies steal our time and use us to earn money and data in the attention economy. But it's time to get our time back. — What is...",
    date: "21 March, 2023",
    category: "DESIGN",
    readingTime: "8 min"
  }
] 