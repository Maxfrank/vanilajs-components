function set(key, value, expired = 0) {
  const currentTime = Date.now();
  if(expired > 0) {
    localStorage.setItem(key, JSON.stringify({value: value, __expired__: currentTime + expired}));
  } else {
    localStorage.setItem(key, value);
  }
}

function get(key) {
  const value = localStorage.getItem(key);
  let dataObj;
  try {
    dataObj = JSON.parse(value);
  } catch(e) {
    if(e instanceof SyntaxError) {
      console.error(e.name);
    } else {
      console.error(e.message);
    }
    return value;
  }
  if(dataObj.__expired__ && Date.now() > dataObj.__expired__) {
    localStorage.removeItem(key);
  } else {
    return value;
  }
}
