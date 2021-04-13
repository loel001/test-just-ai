import React from "react";

const BacklightLetters = ({filter, str}) => {
  if (!filter) {
    return str;
  }
  const regexp = new RegExp(filter, `ig`);
  const matchValue = str.match(regexp);
  if (matchValue) {
    return str.split(regexp).map((s, index, array) => {
      if (index < array.length - 1) {
        const c = matchValue.shift();
        return <>{s}<span className="backlight">{c}</span></>;
      }
      return s;
    });
  }
  return str;
};

export default BacklightLetters;
