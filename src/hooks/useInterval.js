import React, { useState, useEffect, useRef } from "react";
import * as workerTimers from "worker-timers";

export function useInterval(callback, delay) {
  const savedCallback = useRef();

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
      let id = workerTimers.setInterval(tick, delay);
      // let id = setInterval(tick, delay);
      return () => workerTimers.clearInterval(id);
      // return () => clearInterval(id);
    }
  }, [delay]);
}
