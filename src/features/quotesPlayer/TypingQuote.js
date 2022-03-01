const TypingQuote = ({ uniqueId, quoteText }) => {
  return (
    <div>
      <div id={"typed-strings" + uniqueId}>
        <p>{quoteText}</p>
      </div>
      <span
        id={"typed" + uniqueId}
        // style={{ display: quotesControls.isPaused || quotesControls.isPlaying ? null : "none" }}
      ></span>
    </div>
  );
};

export default TypingQuote;
