export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="ambient-background pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="ambient-blob ambient-blob-blue" />
      <div className="ambient-blob ambient-blob-purple" />
      <div className="ambient-blob ambient-blob-teal" />
      <div className="ambient-grid absolute inset-0" />
      <div className="ambient-grain absolute inset-0" />
      <div className="ambient-vignette absolute inset-0" />
    </div>
  );
}
