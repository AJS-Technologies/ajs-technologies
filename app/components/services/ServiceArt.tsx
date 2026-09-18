export default function ServiceArt({ kind }: { kind: string }) {
  return (
    <div className={`service-art art-${kind}`} aria-hidden="true">
      {kind === "web" ? (
        <div className="mini-browser">
          <div className="browser-dots">
            <i />
            <i />
            <i />
          </div>
          <div className="browser-content">
            <div>
              <i />
              <i />
              <b />
            </div>
            <span />
          </div>
        </div>
      ) : kind === "systems" ? (
        <div className="data-bars">
          {[42, 68, 50, 84, 65, 100, 77, 114].map((height, index) => (
            <i
              key={index}
              style={{ height, animationDelay: `${index * -0.4}s` }}
            />
          ))}
        </div>
      ) : kind === "ai" ? (
        <div className="ai-orb">
          <span>✳</span>
          <i />
          <b />
        </div>
      ) : kind === "mobile" ? (
        <div className="phone">
          <i />
          <div />
          <span />
          <span />
          <b />
        </div>
      ) : kind === "cloud" ? (
        <div className="server-stack">
          <i />
          <i />
          <i />
        </div>
      ) : (
        <div className="network-nodes">
          <i />
          <i />
          <i />
          <i />
          <span>⌘</span>
        </div>
      )}
    </div>
  );
}
