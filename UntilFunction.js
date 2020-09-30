// debounce
function debounce(fn, wait = 1000) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }
}

// usage
document.querySelector('input').addEventListener(debounce(fn(), 1000));

// throttle
function throttle(fn, interval = 1000) {
  let canRun = true;
  return function(...args) {
    if(!canRun) {
      return;
    } else {
      canRun = false;
      fn.apply(this, args);
      setTimeout(() => {
        canRun = true;
      }, wait);
    }
  }
}

// memorize
function memorize(fn) {
  const cache = {};
  return function(...args) {
    const _args = JSON.stringify(args);
    return cache[_args] || (cache[_args] = fn.apply(this, args));
  }
}

// usage
const add = function(a) {
  return a + 1
}
const adder = memorize(add);

// retry
function retry(tn, times, delay = 100) {
  let err = null;
  return new Promise(function(resolve, reject) {
    function atemp() {
      fn().then(resolve).catch(function(err) {
        if(times === 0) {
          reject(err);
        } else {
          times--;
          setTimeout(() => {
            attemp();
          }, delay);
        }
      });
    }
    attemp();
  });
}

// usage
function fetchData() {
  return new Promise(fucntion(resolve, reject) {
    setTimeout(() => {
      reject('server unavailable');
    }, 500);
  });
}

retry(fetchData, 3);
