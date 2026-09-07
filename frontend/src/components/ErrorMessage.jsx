function ErrorMessage({ error, onRetry }) {
  return (
    <section
      className="error-state"
      role="alert"
    >
      <h2>Products are temporarily unavailable</h2>

      <p>
        We could not load the catalogue. Please try again.
      </p>

      {error.requestId && (
        <p className="request-reference">
          Reference: {error.requestId}
        </p>
      )}

      <button type="button" onClick={onRetry}>
        Try again
      </button>
    </section>
  );
}

export default ErrorMessage;