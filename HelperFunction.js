/** recursion **/
// transform Array into object
function merge(res, arr, index = 0) {
    if (index === arr.length) {
        return res;
    }
    if (index === arr.length - 1) {
        res[arr[index]] = '';
    } else {
        if (!res[arr[index]]) {
            res[arr[index]] = {};
        }
        res[arr[index]] = merge(res[arr[index]], arr, index + 1);
    }
    return res;
}

function transform(arr) {
    return arr.reduce((res, item) => merge(res, item.split('.')), {});
}

// traver an object
let obj = { 1: 'a', 2: 'b', 3: { 4: 'd', 5: 'e' } };
let traverse = (obj, res) => {
  Object.keys(obj).forEach(prop => {
    if(obj[prop] instanceof Object) {
      traverse(obj[prop], res);
    } else {
      res.push(obj[prop]);
    }
  });
};

// flatten array method iteratively
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];

function flatten(arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

function flatten(arr) {
    const res = [];
    for(let i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            res = res.concat(flatten(arr[i]));
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}

// in ES6
function flatten(arr) {
    return arr.reduce((a, c) => a.concat(Array.isArray(c) ? flatten(c) : c), []);
}

// clean up html
// (with regex)
function stripScript() {
  return s && s.replace(/<script.*?>.*?<\/script>/ig, '');
}

var header = document.getElementById("header");
header.innerText = stripScript(header.innerText);

// with vanila js
var new_element = old_element.cloneNode();
old_element.parentNode.replaceChild(new_element, old_element);

// walk through the DOM tree
var walk_the_dom = function(node, func) {
  if(node && node.childNodes) {
    for(let i = 0; i < node.childNodes.length; i++) {
      walk_the_dom(node.childNodes[i], func);
    }
  }
  func(node);
}

var dom = document.querySelector('body');
walk_the_dom(dom, function(element) {
  if(element) {
    element.removeAttribute('onclick');
  }
});

// shuffle an array
function shuffle(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// js implement Promise
