export const phoneNumber = (text) => {
  var reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (reg.test(text.trim())) {
    return true;
  } else {
    return false;
  }
};

export const email = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text.trim()) === false) {
    return false;
  } else {
    return true;
  }
};
