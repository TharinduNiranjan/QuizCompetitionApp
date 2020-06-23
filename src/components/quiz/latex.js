import React, { Fragment } from "react";
import MathJax from "react-mathjax-preview";
export function show_latex(text) {
  let str = " " + text;
  let subStrs = str.split("$$");

  for (let i = 0; i < subStrs.length; i++) {
    if (i % 2 === 1) {
      subStrs[i] = <MathJax math={`$\\ ${subStrs[i]}$`} />;
    } else {
      subStrs[i] = <span key={i}>{subStrs[i]}</span>;
    }
  }

  return (
    <div className="parent">
      {subStrs.map((str, key) => (
        <Fragment key={key}>{str}</Fragment>
      ))}
    </div>
  );
}
