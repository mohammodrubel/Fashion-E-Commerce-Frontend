import { PageHeader } from "@/components/admin/page-header"
import { Upload, Image, Film, FileText, Trash2, Search, Grid3X3, List } from "lucide-react"

type MediaType = "image" | "video" | "document"

interface MediaItem {
  id: number
  filename: string
  type: MediaType
  size: string
  dimensions?: string
  uploadedAt: string
  colorBg: string
}

const mediaItems: MediaItem[] = []

const typeIcon = {
  image: Image,
  video: Film,
  document: FileText,
}

const filterTabs = ["All", "Images", "Videos", "Documents"]

export default function MediaLibraryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Library"
        description="Manage images, videos, and documents"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Media" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Upload className="w-4 h-4" strokeWidth={1.5} />
            Upload Files
          </button>
        }
      />

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-border/50 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search media..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[var(--muted)] placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          <div className="flex items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                className="px-3 py-1.5 rounded-full border transition-colors"
                style={{
                  fontSize: "12px",
                  backgroundColor: tab === "All" ? "var(--primary)" : "white",
                  color: tab === "All" ? "white" : "#6B7280",
                  borderColor: tab === "All" ? "var(--primary)" : "#E5E7EB"
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <button className="p-2 rounded-lg border border-border/60 hover:bg-[var(--muted)] transition-colors text-foreground">
              <Grid3X3 className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button className="p-2 rounded-lg border border-border/60 hover:bg-[var(--muted)] transition-colors text-muted-foreground">
              <List className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Upload drop zone */}
      <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-3 bg-white hover:border-primary/40 hover:bg-[#FAF0F2] transition-colors cursor-pointer">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#FAF0F2" }}>
          <Upload className="w-5 h-5" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Drop files here or click to upload</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>PNG, JPG, GIF, MP4, PDF up to 50MB</p>
        </div>
      </div>

      {/* Media grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {mediaItems.map((item) => {
          const Icon = typeIcon[item.type]
          return (
            <div key={item.id} className="group bg-white rounded-xl border border-border/50 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              {/* Thumbnail */}
              <div
                className="h-24 flex flex-col items-center justify-center relative"
                style={{ backgroundColor: item.colorBg + "20" }}
              >
                <Icon className="w-8 h-8" style={{ color: item.colorBg }} strokeWidth={1.2} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="p-1.5 rounded-lg bg-white/90 text-red-600 hover:bg-white transition-colors">
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              {/* Filename */}
              <div className="p-2">
                <p className="text-foreground font-medium truncate" style={{ fontSize: "10px" }}>{item.filename}</p>
                <p className="text-muted-foreground" style={{ fontSize: "9px" }}>{item.size} · {item.uploadedAt}</p>
                {item.dimensions && (
                  <p className="text-muted-foreground" style={{ fontSize: "9px" }}>{item.dimensions}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing 12 of 348 files</p>
        <button className="px-4 py-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-white transition-colors" style={{ fontSize: "12px" }}>
          Load More
        </button>
      </div>
    </div>
  )
}
