const items = [
  {
    id: 1,
    title: "Idun ketchup",
    comment: "kjedelig",
    imageLink: "2.jpg",
    tags:null,
    diceValue:3
  },
  {
    id: 2,
    title: "TORO kakemix",
    comment: "grei",
    imageLink: "1.jpg",
    tags:null,
    diceValue:4
  },
  {
    id: 3,
    title: "TORO kakemix2",
    comment: "grei",
    imageLink: "1.jpg",
    tags:null,
    diceValue:4
  },
  {
    id: 4,
    title: "TORO kakemix3",
    comment: "grei",
    imageLink: "1.jpg",
    tags:null,
    diceValue:4
  },
  {
    id: 5,
    title: "TORO kakemix4",
    comment: "grei",
    imageLink: "1.jpg",
    tags:null,
    diceValue:4
  }
];

const newItem = {
  id: null,
  title: "",
  comment: "",
  imageLink: "",
  tags:null,
  diceValue:null
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newItem,
  items
};
