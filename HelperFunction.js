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


// js implement Promise
// trail 1
var promiseAsyncFunc = function() {
  let fullfillCallback;
  let rejectCallback;
  setTimeout(() => {
    const randomNumber = Math.random();
    if(randomNumber > 0.5) {
      fullfillCallback(randomNumber);
    } else {
      rejectCallback(randomNumber);
    }
  }, 1000);
  return {
    then: function(_fullfillCallback, _rejectCallback) {
      fullfillCallback = _fullfillCallback;
      rejectCallback = _rejectCallback;
    }
  }
}

promiseAsyncFunc().then(fulfillCallback, rejectCallback)

// trail 2
const PENDING = Symbol('pending');
const FULFILLED = Symbol('fulfilled');
const REJECTED = Symbol('rejected');
var promiseAsyncFunc = function() {
  let status = PENDING;
  let fullfillCallback;
  let rejectCallback;

  return {
    fulfill: function(value) {
      if(status !== PENDING) {
        return;
      }
      if(fullfillCallback && typeof fullfillCallback === 'function') {
        fullfillCallback(value);
        status = FULFILLED;
      }
    },
    reject: function(err) {
      if(status !== PENDING) {
        return;
      }
      if(rejectCallback && typeof rejectCallback === 'function') {
        rejectCallback(err);
        status = REJECTED;
      }
    },
    promise: {
      then: function(_fullfillCallback, _rejectCallback) {
        fullfillCallback = _fullfillCallback;
        rejectCallback = _rejectCallback;
      }
    }
  }
}




.
