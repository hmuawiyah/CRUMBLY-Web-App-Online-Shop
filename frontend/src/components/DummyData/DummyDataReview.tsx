export type Review = {
  name: string
  star: number
  date: string
  review: string
}


export const breadReviews: Review[] = [
  {
    name: "Alex Turner",
    star: 5,
    date: "12 January 2025",
    review: "Super fresh bread, soft texture and great taste. Will buy again!"
  },
  {
    name: "Maria Lopez",
    star: 4,
    date: "02 March 2025",
    review: "Tasty bread and fast delivery, but packaging could be better."
  },
  {
    name: "John Miller",
    star: 5,
    date: "07 August 2025",
    review: "Amazing flavor and very soft. My family loved it so much."
  },
  // {
  //   name: "Sophie Nguyen",
  //   star: 3,
  //   date: "20 September 2025",
  //   review: "Bread was okay, slightly dry but still acceptable."
  // },
  // {
  //   name: "Daniel Smith",
  //   star: 4,
  //   date: "10 October 2025",
  //   review: "Good quality bread, arrived fresh and on time."
  // }
];
