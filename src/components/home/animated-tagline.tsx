const TAGLINES = [
  "Everything You Love.",
  "One Place. Endless Choices.",
  "Beyond Everyday.",
  "Style Meets Technology.",
]

// A trailing duplicate of the first line lets the keyframe loop land on
// a frame visually identical to 0%, so the infinite restart is invisible.
const ITEMS = [...TAGLINES, TAGLINES[0]]

export function AnimatedTagline() {
  return (
    <div className="tagline-viewport">
      <div className="tagline-track">
        {ITEMS.map((text, i) => (
          <span key={i} className="tagline-item">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
