import React from "react";
import Typed from "typed.js";

export const TypedQuote = ({ text, isReset, isPaused }) => {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);
  // Create reference to store the Typed instance itself
  const typed = React.useRef(null);

  React.useEffect(() => {
    if (typed.current && isReset) typed.current.reset();
  }, [isReset]);

  React.useEffect(() => {
    const options = {
      // strings: [
      //   "תוכניות הן רק כוונות טובות אלא אם כן הם הופכות מיד לעבודה קשה",
      // ],
      strings: [text],
      showCursor: false,
      // strings: [
      //   "Some <i>strings</i> are slanted",
      //   "Some <strong>strings</strong> are bold",
      //   "HTML characters &times; &copy;",
      // ],
      typeSpeed: 80,
      backSpeed: 50,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    };
  }, [text]);

  return (
    <div className="type-wrap">
      <span ref={el} />
      {/* <span style={{ whiteSpace: "pre" }} ref={el} /> */}
    </div>
  );
};
