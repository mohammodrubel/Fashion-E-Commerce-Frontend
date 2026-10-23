export function BrandPanel() {
  return (
    <div
      className="hidden lg:flex w-[480px] xl:w-[540px] shrink-0 flex-col justify-between py-14 px-16 overflow-hidden"
      style={{
        backgroundColor: "#0D0B0C",
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.032) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Top — wordmark + season tag */}
      <div className="flex items-center justify-between">
        <span
          className="text-white/80 uppercase font-light"
          style={{ fontSize: "11px", letterSpacing: "0.55em" }}
        >
          PARALLEL
        </span>
        <span
          className="text-white/25 uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.2em" }}
        >
          FW 25
        </span>
      </div>

      {/* Center — editorial headline */}
      <div className="space-y-8">
        <div>
          <p
            className="text-white font-extralight leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(42px, 4.5vw, 58px)" }}
          >
            IN PRECISION
            <br />
            THERE IS
            <br />
            <span className="italic">ELEGANCE.</span>
          </p>
        </div>

        <div className="space-y-4">
          <div className="w-10 h-px bg-white/25" />
          <p
            className="text-white/35 uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.25em" }}
          >
            Autumn / Winter Collection&nbsp;&nbsp;2025
          </p>
        </div>
      </div>

      {/* Bottom — copyright */}
      <div className="flex items-center justify-between">
        <span
          className="text-white/18"
          style={{ fontSize: "10px", letterSpacing: "0.2em" }}
        >
          © 2025 Parallel
        </span>
        <span
          className="text-white/18"
          style={{ fontSize: "10px", letterSpacing: "0.2em" }}
        >
          Est. MMXXV
        </span>
      </div>
    </div>
  )
}
