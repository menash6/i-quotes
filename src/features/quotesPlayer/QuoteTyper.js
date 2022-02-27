import React from "react";
import Typed from "typed.js";

export const QuoteTyper = React.forwardRef((props, ref) => {
  const { durationLetter } = props;

  const typed = React.useRef(null);

  React.useEffect(() => {
    const options = {
      // strings: [text],
      stringsElement: "#typed-strings",
      showCursor: false,
      // typeSpeed: 200,
      typeSpeed: durationLetter / 2,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed("#typed", options);

    typed.current.stop();
    ref.current = typed.current;

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    };
  }, [ref, durationLetter]);
  // }, [text, duration, onComplete, ref]);

  return (
    <>
      {/* <div className="type-wrap">
        <span ref={el} />
      </div> */}
      {/* 
      <div id="typed-strings">
        <p>{text} </p>
      </div>
      <span id="typed"></span> */}
    </>
  );
});
