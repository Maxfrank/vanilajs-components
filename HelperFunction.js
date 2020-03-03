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

// deep copy
function extend(target, source, deep) {
    for(let key in source) {
        if(deep && source[key] instanceof Object) {
            if(source[key] instanceof Array && !(target[key] instanceof Array)) {
                target[key] = [];
            }
            if(source[key] instanceof Object && !(target[key] instanceof Object)) {
                target[key] = {};
            }
            extend(target[key], source[key], deep);
        } else if(source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

// compute diff
function computeDif(obj1, obj2, difObj = {}) {
    Object.keys(obj1).forEach(prop => {
        if (obj2[prop] === undefined || obj2[prop] === null) {
            difObj[prop] = obj1[prop];
        } else if (typeof obj1[prop] === 'string') {
            if (obj1[prop].length === 1) {
                difObj[prop] = obj1[prop].charCodeAt(0) - obj2[prop].charCodeAt(0);
            } else if (obj1[prop].length > 1) {
                if(difObj[prop] === undefined) {
                    difObj[prop] = [];
                }
                computeDif(obj1[prop].split(''), obj2[prop].split(''), difObj[prop]);
            }
        } else if (typeof obj1[prop] === 'number') {
            difObj[prop] = obj1[prop] - obj2[prop];
        } else if (obj1[prop] instanceof Array) {
            if(difObj[prop] === undefined) {
                difObj[prop] = [];
            }
            computeDif(obj1[prop], obj2[prop], difObj[prop]);
        } else if(typeof obj1[prop] === 'function') {
            if(difObj[prop] === undefined) {
                difObj[prop] = [];
            }
            computeDif(obj1[prop].toString(), obj2[prop].toString(), difObj[prop]);
        } else if (obj1[prop] instanceof Object) {
            if(difObj[prop] === undefined) {
                difObj[prop] = {};
            }
            computeDif(obj1[prop], obj2[prop], difObj[prop]);
        }
    });
    return difObj;
}

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
// Stack shuffle (one line)
function stackShuffle(deck) {
    let count = deck.length;
    while(count) {
        deck.push(deck.splice(Math.floor(Math.random() * count, 1))[0]);
        count -= 1;
    }
}

// Riffle Shuffle
function riffleShuffle(deck) {
  const cutDeckVariant = deck.length / 2 + Math.floor(Math.random() * 9) - 4;
  const leftHalf = deck.splice(0, cutDeckVariant);
  let leeftCount = leftHalf.length;
  let rightCount = deck.length - Math.floor(Math.random() * 4);
  while(leftCount > 0) {
    const takeAmount = Math.floor(Math.random() * 4);
    deck.splice(rightCount, 0, ...leftHalf.splice(leeftCount, takeAmount));
    leftCount -= takeAmount;
    rightCount = rightCount - Math.floor(Math.random() * 4) + takeAmount;
  }
  deck.splice(rightCount, 0, ...leftHalf);
}


// js implement Promise

// recursion for fetch()
function async getAllResources(url) {
    const arr = [];
    fetch(url).then(res => {
        const data = res.json();
        arr.push(data.resource);
        if(data.next) {
            return await getNextResource(url, data.next, arr);
        }
    }).catch(err => console.errorr(err));
}

function getNextResource(baseUrl, next, arr) {
    return fetch(baseUrl + next).then(res => {
        const data = res.json();
        arr.push(data.resource);
        if(data.next) {
            getNextResource(baseUrl, data.next, arr);
        } else {
            return arr;
        }
    });
}

// Promise version
function getAllResources(progress, url, planets = []) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if(response.status !== 200) {
                    throw `${response.status}: ${response.statusText}`;
                }
                response.json()
                    .then(data => {
                        planets = planets.concat(data.results);
                        if(data.next) {
                            progress(planets);
                            getAllResources(progress, data.next, planets).then(resolve).catch(reject);
                        } else {
                            resolve(planets);
                        }
                    })
                    .catch(reject)
            }).catch(reject)
            .catch(reject)
    });
}

function progressCallback(planets) {
    console.log(planets.length);
}

getAllResources(progressCallback, 'https://swapi.co/api/planets/')
    .then(planets => console.log(planets.map(planet => planet.url)))
    .catch(console.error);
