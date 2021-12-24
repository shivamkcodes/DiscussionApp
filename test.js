// var a='';
// var b=null;

// if (a) {
//     console.log('false');

// }
// else{

// }

var obj = [
  {
    name: "shivam",
    age: 19,
  },
  {
    name: "bhoomi",
    age: 19,
  },
  {
    name: "guglani",
    age: 19,
  },
  {
    name: "rohit",
    age: 19,
  },
];

var val = {
  name: "shivam",
  age: 19,
};

var arr = [1, 2, 3, 4, 11, 14, 43];
var id = arr.indexOf(11);

obj.forEach((e) => {
  console.log(e, val);
  if (e == val) {
    console.log("dew");
  }
});
// console.log(idx);
