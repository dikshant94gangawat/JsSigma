var x = 10;
var b = 10;
function clicknow(){
    
document.getElementsByClassName("first")[0].innerHTML = Date();


console.log(x,b);
}


//arrow function and self invoking function

// let hello;
// (hello = (x,b)=>{var x = 10;
//     var b = 10;  c=x+b; console.log(c);})();

// (function myname(x,b) {
//     return c=x+b;
// })(x,b);
// console.log(c);

//normal function vs constructor function see below explanation 

//https://stackoverflow.com/questions/22401553/what-are-all-the-differences-between-function-and-constructor-function-in-javasc

// concept of this keyword
//https://www.programiz.com/javascript/this


//array
//unshift - to add at start of array(first element)
//push, splice method - 
// let a = [1, 2, 3, 4];
// a.splice(1, 1, "12"); // index, deletecount, no to add
// console.log(a);


//foreach loop
// let number1 = [2,4,5,6,9];
// number1.forEach((val,index,array)=>{
// console.log(val,index,array);
// })



//for in and for of loop
// let ab = [15,24,3,4,5];
// for(let index in ab)
// {
//     console.log(ab[index]);
// }

// let a = [10,20,3,4,5];
// for(let index of a)
// {
//     console.log(index);
// }


//array destructuring
// let number1 = [2,4,5,6,9];
// let [b1,b2,...b3] = number1;
// b3.forEach((val)=>{
// console.log(val);
// })


//objects in javascript

// let user = {
//     "name" : "dikshant",//value if string should be in quotes, key can be in quotes or without quotes it works fine
//     "age" : 29,
//     "last name" : "gangawat",
//     arr:[1,2,3],
//     fun:function(){
//         console.log("ram");
//     }
// }
// console.log(user.name);
// console.log(user["age"]);
// console.log(user["last name"]); // accesing when there is space in key name
// console.log(user.arr);
// user.fun();
// user.key = "item";
// let a = "destiny";
// user[a] = "zero";
//user for in loop for objects iteration and for of loop for

//objects inside an array
//for in returns index and for of returns value on that index

let arr = [
    {name : "dikshant",age : 20},
    {name : "dikshant1",age : 21},
    {name : "dikshant2",age : 22},
    {name : "dikshant3",age : 23},
]
console.log(arr);
let [{name}, b2, {age}] = arr;
console.log(name);