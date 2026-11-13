import { PageHeader } from "@/components/admin/page-header"
import { Save, X, ExternalLink } from "lucide-react"

export default function AnnouncementBarPage() {
  const currentAnnouncement = {
    text: "",
    link: "",
    linkText: "",
    bgColor: "var(--primary)",
    textColor: "#FAF0F2",
    isEnabled: false,
    showCloseButton: true,
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcement Bar"
        description="Configure the sitewide announcement strip at the top of every page"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Announcement Bar" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Save className="w-4 h-4" strokeWidth={1.5} />
            Save Changes
          </button>
        }
      />

      {/* Live Preview */}
      <div className="bg-white rounded-xl border border-border/50 p-5">
        <p className="font-medium text-foreground mb-3" style={{ fontSize: "14px" }}>Live Preview</p>
        <div
          className="rounded-lg px-4 py-2.5 flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: currentAnnouncement.bgColor }}
        >
          <p className="text-center" style={{ color: currentAnnouncement.textColor, fontSize: "13px" }}>
            {currentAnnouncement.text}
            {currentAnnouncement.link && (
              <a className="ml-2 underline font-semibold" style={{ color: currentAnnouncement.textColor }}>
                {currentAnnouncement.linkText} →
              </a>
            )}
          </p>
          {currentAnnouncement.showCloseButton && (
            <button className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100">
              <X className="w-4 h-4" style={{ color: currentAnnouncement.textColor }} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* Settings Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main settings */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "15px" }}>Bar Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-muted-foreground mb-1.5" style={{ fontSize: "12px" }}>Announcement Text</label>
              <textarea
                defaultValue={currentAnnouncement.text}
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-primary/40 resize-none"
                style={{ fontSize: "13px" }}
              />
              <p className="text-muted-foreground mt-1" style={{ fontSize: "11px" }}>Keep it concise — best at under 80 characters</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-muted-foreground mb-1.5" style={{ fontSize: "12px" }}>Link URL</label>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    defaultValue={currentAnnouncement.link}
                    className="flex-1 px-3 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-primary/40"
                    style={{ fontSize: "13px" }}
                  />
                  <button className="p-2 rounded-lg border border-border/60 hover:bg-[var(--muted)] transition-colors text-muted-foreground">
                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block font-medium text-muted-foreground mb-1.5" style={{ fontSize: "12px" }}>Link Text</label>
                <input
                  type="text"
                  defaultValue={currentAnnouncement.linkText}
                  className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-primary/40"
                  style={{ fontSize: "13px" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-muted-foreground mb-1.5" style={{ fontSize: "12px" }}>Background Color</label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border border-border/60 shrink-0" style={{ backgroundColor: currentAnnouncement.bgColor }} />
                  <input
                    type="text"
                    defaultValue={currentAnnouncement.bgColor}
                    className="flex-1 px-3 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-primary/40 font-mono"
                    style={{ fontSize: "13px" }}
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-muted-foreground mb-1.5" style={{ fontSize: "12px" }}>Text Color</label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border border-border/60 shrink-0" style={{ backgroundColor: currentAnnouncement.textColor }} />
                  <input
                    type="text"
                    defaultValue={currentAnnouncement.textColor}
                    className="flex-1 px-3 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-primary/40 font-mono"
                    style={{ fontSize: "13px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle controls */}
        <div className="bg-white rounded-xl border border-border/50 p-6 h-fit">
          <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "15px" }}>Display Options</h2>
          <div className="space-y-4">
            {[
              { label: "Bar Enabled", desc: "Show the announcement bar", value: currentAnnouncement.isEnabled },
              { label: "Show Close Button", desc: "Allow users to dismiss", value: currentAnnouncement.showCloseButton },
              { label: "Show on Mobile", desc: "Visible on small screens", value: true },
              { label: "Show on All Pages", desc: "Or homepage only", value: true },
            ].map((opt) => (
              <div key={opt.label} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-[var(--muted)] transition-colors">
                <div>
                  <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{opt.label}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{opt.desc}</p>
                </div>
                <button
                  className="relative inline-flex items-center rounded-full shrink-0 ml-3"
                  style={{ width: "40px", height: "22px", backgroundColor: opt.value ? "var(--primary)" : "#D1D5DB" }}
                >
                  <span
                    className="inline-block w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform"
                    style={{ transform: opt.value ? "translateX(20px)" : "translateX(2px)" }}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Preset themes */}
          <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--accent)" }}>
            <p className="font-medium text-foreground mb-3" style={{ fontSize: "12px" }}>Quick Themes</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { bg: "var(--primary)", text: "#FAF0F2", label: "Brand" },
                { bg: "#1F2937", text: "#F9FAFB", label: "Dark" },
                { bg: "#166534", text: "#F0FDF4", label: "Sale" },
                { bg: "#92400E", text: "#FFF7ED", label: "Warm" },
                { bg: "#1D4ED8", text: "#EFF6FF", label: "Info" },
                { bg: "#FBBF24", text: "#1F2937", label: "Alert" },
              ].map((theme) => (
                <button
                  key={theme.label}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg border border-border/60 hover:border-primary/40 transition-colors"
                >
                  <div className="w-full h-4 rounded" style={{ backgroundColor: theme.bg }} />
                  <span className="text-muted-foreground" style={{ fontSize: "10px" }}>{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
