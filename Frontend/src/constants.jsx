const PRICES = [
  { name: "$1-$50", min: 1, max: 50 },
  { name: "$51-$100", min: 51, max: 100 },
  { name: "$101-$200", min: 101, max: 200 },
  { name: "$201-$500", min: 201, max: 500 },
  { name: "$501-$1000", min: 501, max: 1000 }, //add 1000+
];
const RATINGS = [
  { name: "4 stars & up", rating: 4 },
  { name: "3 stars & up", rating: 3 },
  { name: "2 stars & up", rating: 2 },
  { name: "1 star & up", rating: 1 },
];
const ORDER = [
  { name: "Newest", order: "newest" },
  { name: "Oldest", order: "oldest" },
];
export { PRICES, RATINGS, ORDER };
