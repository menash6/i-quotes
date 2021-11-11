import React, { useState, useEffect, useRef } from "react";
import { useWorkerTimeout } from "web-worker-hooks";

function useTimeout(callback, delay) {
  const savedCallback = useRef();
  const clearTimeout = useRef(() => {}); //added

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      // clearTimeout.current = useWorkerTimeout(tick, delay);
      // return () => clearTimeout.current();
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}

export default useTimeout;
