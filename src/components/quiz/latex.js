import React from "react";
import MathJax from "react-mathjax-preview";
export function show_latex(text) {
  let str = " " + text;
  let subStrs = str.split("$$");

  for (let i = 0; i < subStrs.length; i++) {
    if (i % 2 === 1) {
      subStrs[i] = <MathJax math={`$\\ ${subStrs[i]}$`} />;
    }
  }

  return (
    <div className="parent">
      {subStrs.map((str, key) => (
        <div className="child" key={key}>
          {str}
        </div>
      ))}
    </div>
  );
}
