// var x,y,z;
// function clicknow(x,y,...z){
//    console.log(x,y,z)

// }
// console.log(clicknow(2,3,4,4,3,5,6,5));


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
//for in loop on array always gives index
// let ab = [15,24,3,4,5];


// for(let index in ab)
// {
//     console.log(ab[index]);
// }


//for of loop gives value on array
// let a = [10,20,3,4,5];
// for(let i of a)
// {
//     console.log(i);
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

// let arr = [
//     {name : "dikshant",age : 20},
//     {name : "dikshant1",age : 21},
//     {name : "dikshant2",age : 22},
//     {name : "dikshant3",age : 23},
// ]
// console.log(arr);
// let [{name}, b2, {age}] = arr;
// console.log(name);



//object destructuring

// let arr = 
//     {name : "dikshant",age : 20}
 


// let {name:d1,age:d2} = arr;
// console.log(d1);

//foreach loop on objects
// const obj = {
//     name: 'Jean-Luc Picard',
//     rank: 'Captain'
//   };
  
//   // Prints "name Jean-Luc Picard" followed by "rank Captain"
//   Object.values(obj).forEach((val,index) => {
//     console.log(val);
//   });
  

//map array function

// let ab = [1,2,3,4,5];
// let b = ab.map(test);

// console.log(b);

// function test(z){
// return z*10;
// }

//map as set

// let ab = new Map([['fname', 'dikshant'],['lname', "gangawat"],[29,'age']]);
// console.log(ab.has('fname'));
// console.log(ab.get('fname'));
// console.log(Array.isArray(ab));
// console.log(typeof ab);
// console.log(ab.get(29));
// ab.set('fname', 'raja');
// console.log(ab);

//new keyword

// function fun(){
//     
//     let fname = "dikshant";
//     this.fname = fname;
 

// }
//  let d1 = new fun();
//  console.log(d1.fname);


//recursion function -  example factorial of a number

// let z;

// function calculate(n){
//     if(n==0){
//         return 1;
//     }
//     else {
//      z =  n*calculate(n-1);
//     return z;
    
//     }
// }

// calculate(2);

// console.log(z);


//callback function


// function show(result){
//     console.log(result);
// }

// function calculate(x,y,callback){
//     let z =  x+y;
//     callback(z);
//      z = z+2;
    
// }

// calculate(2,3,show);

//callback hell - 3 functions,,,,,,, Callbacks, Promises, and Async/Await provides us different approaches towards handling asynchronous operations in JavaScript. While callbacks are simple but prone to callback hell, Promises and Async/Await provide cleaner and more readable code structures.

// function a(){
//    return new Promise((resolve,reject)=>
//        setTimeout(() => {
//         console.log("hello one");
//         resolve();

//     }, 4000));
// }

// function b(){
//     return new Promise((resolve,reject)=>
//     setTimeout(() => {
//      console.log("hello two");
//     //  reject("error: not fulfilled");
// resolve();
//  }, 2000));
   
// }

// function c(){

//     return new Promise((resolve,reject)=>
//     setTimeout(() => {
//      console.log("hello three");
//      resolve();

//  }, 3000));
// }
// function d(){

//     return new Promise((resolve,reject)=>
//     setTimeout(() => {
//      console.log("hello four");
//      reject("Error : stopped in d");

//  }, 2000));
// }
// c().then(b).then(a).catch((err)=>{
//     console.log(err);
// })

//async await ex

// function ex(){ //2-3-1
//     c();
//     b();
   
//     a();
// }

// ex();

// async function ex(){  //3-1-2
//     await  c();
//     await a();
//    await d();
  
// }

// ex().then(b).catch((err)=>{
//     console.log(err);
// });


//promises in javascript basic code

// function fun(task){

//     return new Promise((resolve,reject)=>{

//         if(task){
//             resolve("complete");

//         }
//         else{
//             reject("pending or not completed");
//         }

//     })
// }

// let onResolve = (res)=>{
//     console.log(res);
// }
// let onReject = (err)=>{
//     console.log(err);
// }

// fun(true).then(onResolve).catch(onReject);

//async await
// function ex(){
//     a();
//     b();
//     c();
// }

// ex();
// function a(callback){
  
//          console.log("hello one");
//        callback();
//  }
 
//  function b(){
  
//       console.log("hello two");

    
//  }
 
//  function c(){
 
     
//       console.log("hello three");
  
//  }
// a(function(){
//  c();
//  b();
// });



//call, apply, bind examples

// function sum(...args){

//     console.log(args);
//     for(let index of args){
//         let x = index ;
//         let y = x+1;
//         var z = y+x;
//     }
 
//  console.log(z + "" + this.fname);
 
// }

// let obj1 = {
//     fname: "dikshant"
// }

// let obj2 = {
//     fname: "Mr Bond"
// }

// // sum.call(obj1,2,3,4);

// // sum.apply(obj1,[2,3,4]);

// var f = sum.bind(obj1,2,3,4);
// console.log(typeof f);
// f();



//new topic - property flags and descriptors

// let emp = {};
// emp.name = "dikshant";
// console.log(Object.getOwnPropertyDescriptor(emp,"name"));

// Object.defineProperty(emp,"age",{
//     value : 21,
//     writable: true, enumerable: true, configurable: true
// })

// console.log(emp);



//new topic - proto and prototype

//proto
//ex - 1
// var obj1 = {
//     fname: "dikshant"
// }
// var obj2 = {
//     lname: "sharma",
// }
// obj2.__proto__ = obj1;
// console.log(obj2);

//ex-2

// var obj1 = {
//     fname: "dikshant"
// }

// var obj2 = Object.create(obj1);
// console.log(obj2.fname);


// function Person(name,age){
//    let person1 = Object.create(obj);
//    person1.name = name;
//    person1.age = age;
   
//    return person1;
// }
// var obj  = {
//     greet(){
//         console.log(`Hello  ${this.name}`)
//     }
// }
// let user =  Person("dg", 29);
// console.log(typeof user);
// console.log(user);
// console.log(user.greet());


//protoype

// function Person(name,age){
//    this.name = name;
//    this.age = age;  
// }
// Person.prototype.greet = function(){
//     console.log(`Hello ${this.name}`);
// }

// let user = new Person("dikshant", 29);
// console.log(user.greet());


//classes in javascript

// class User{
//     constructor(name,age){
//        this.name = name;
//        this.age = age
//     }
//     desc(){
//         console.log("hello" + this.name);
//     }
// }

// let user = new User("dikshant",29);
// console.log(user.desc());


//fetch api 


//  fetch('https://jsonplaceholder.typicode.com/posts').then((response)=>{
//     if(!response.ok)
//     {
//         throw new Error("error network issue");
//     }
//     return response.json();

//  }).then((data)=>Object.values(data).forEach(val=>
// {
//     console.log(val.title);
//  })).catch(err=>console.log(err));
 
// fetch('https://jsonplaceholder.typicode.com/posts').then((response)=>{
//     if(!response.ok)
//     {
//         throw new Error("error network issue");
//     }
//     return response.json();

//  }).then(data=>
//     console.log(data)).catch(err=>console.log(err));
 