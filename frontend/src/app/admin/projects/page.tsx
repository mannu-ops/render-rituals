"use client";

import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Layers,
  Sparkles,
  ExternalLink,
  Check,
  X,
  Image as ImageIcon,
  FolderKanban,
  Search,
  SunMedium,
  Compass,
  Maximize2,
  Upload,
  Loader2,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { Project, Render3DItem, Plan2DItem } from "@/types/project";
import { api } from "@/services/api";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  const src = target.src;
  if (src.includes(":5000/images/")) {
    target.src = src.replace(/^http:\/\/localhost:5000/, "");
  }
};

const defaultImages = [
  "/images/projects/residential-01.jpg",
  "/images/projects/residential-02.jpg",
  "/images/projects/commercial-01.jpg",
];

export default function AdminProjectsPage() {
  const { projects, addProject, updateProject, deleteProject, showToast } = useAdminData();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"general" | "3d" | "2d">("general");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "cover" | "3d" | "2d") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await api.uploadImage(file);
      if (res && res.url) {
        if (target === "cover") setFormCoverImage(res.url);
        if (target === "3d") setNew3DImage(res.url);
        if (target === "2d") setNew2DImage(res.url);

        showToast({
          type: "success",
          title: "Image Uploaded to Cloudinary!",
          message: `${file.name} uploaded and linked to Cloud CDN.`,
        });
      }
    } catch (err) {
      console.error("Upload error:", err);
      showToast({
        type: "error",
        title: "Upload Failed",
        message: "Could not upload image to Cloudinary.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Form State - General
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<string>("Residential");
  const [formScope, setFormScope] = useState("");
  const [formClient, setFormClient] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formYear, setFormYear] = useState("2026");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formSoftware, setFormSoftware] = useState("3ds Max, Corona Renderer, AutoCAD, Photoshop");
  const [formAtmosphere, setFormAtmosphere] = useState("2700K Warm Daylight");
  const [formTurnaround, setFormTurnaround] = useState("3 – 5 Days");
  const [formPublished, setFormPublished] = useState(true);
  const [formFeatured, setFormFeatured] = useState(true);

  // Form State - Multi 3D Views
  const [form3DRenders, setForm3DRenders] = useState<Render3DItem[]>([]);
  const [new3DTitle, setNew3DTitle] = useState("");
  const [new3DTag, setNew3DTag] = useState("4K Daylight View");
  const [new3DDesc, setNew3DDesc] = useState("");
  const [new3DImage, setNew3DImage] = useState("");

  // Form State - Multi 2D CAD Plans
  const [form2DPlans, setForm2DPlans] = useState<Plan2DItem[]>([]);
  const [new2DTitle, setNew2DTitle] = useState("");
  const [new2DSheetType, setNew2DSheetType] = useState("Master Space Planning & Furniture Layout");
  const [new2DScale, setNew2DScale] = useState("1:50");
  const [new2DDesc, setNew2DDesc] = useState("");
  const [new2DImage, setNew2DImage] = useState("");

  const openAddModal = () => {
    setEditingProject(null);
    setModalTab("general");
    setFormTitle("");
    setFormCategory("Residential");
    setFormScope("");
    setFormClient("");
    setFormLocation("");
    setFormYear("2026");
    setFormCoverImage("");
    setFormDescription("");
    setFormSoftware("3ds Max, Corona Renderer, AutoCAD, Photoshop");
    setFormAtmosphere("2700K Warm Daylight");
    setFormTurnaround("3 – 5 Days");
    setFormPublished(true);
    setFormFeatured(true);
    setForm3DRenders([]);
    setForm2DPlans([]);
    setNew3DImage("");
    setNew2DImage("");
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setModalTab("general");
    setFormTitle(proj.title);
    setFormCategory(proj.category || "Residential");
    setFormScope(typeof proj.scope === "string" ? proj.scope : (Array.isArray(proj.scope) ? proj.scope.join(", ") : ""));
    setFormClient(proj.client || "");
    setFormLocation(proj.location || "");
    setFormYear(proj.year || "2026");
    setFormCoverImage(proj.coverImage || proj.image || defaultImages[0]);
    setFormDescription(proj.description || "");
    setFormSoftware(Array.isArray(proj.software) ? proj.software.join(", ") : (proj.software || ""));
    setFormAtmosphere(proj.atmosphere || "2700K Warm Daylight");
    setFormTurnaround(proj.turnaround || "3 – 5 Days");
    setFormPublished(proj.published !== false);
    setFormFeatured(proj.featured !== false);
    setForm3DRenders(
      proj.renders3D && proj.renders3D.length > 0
        ? proj.renders3D
        : (proj.gallery || [defaultImages[0]]).map((img, i) => ({
            id: `r-${i}`,
            title: `Perspective 0${i + 1}`,
            image: img,
            tag: i === 0 ? "4K Master View" : "Atmospheric Pass",
            description: "Photorealistic render showcasing spatial depth and lighting.",
          }))
    );
    setForm2DPlans(
      proj.plans2D && proj.plans2D.length > 0
        ? proj.plans2D
        : [
            {
              id: "p-1",
              title: "Master Space Planning & Furniture Layout",
              image: "/images/cad/plan-01.jpg",
              sheetType: "Primary Architectural Layout",
              scale: "1:50",
              description: "Zoning and furniture orientation drafted in AutoCAD.",
            },
          ]
    );
    setIsModalOpen(true);
  };

  const handleAdd3D = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const title = new3DTitle.trim() || `Perspective 0${form3DRenders.length + 1}`;
    setForm3DRenders((prev) => [
      ...prev,
      {
        id: `r-${Date.now()}`,
        title,
        image: new3DImage || defaultImages[0],
        tag: new3DTag.trim() || "4K Render",
        description: new3DDesc.trim() || "Photorealistic 4K render perspective.",
      },
    ]);
    setNew3DTitle("");
    setNew3DDesc("");
  };

  const handleAdd2D = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const title = new2DTitle.trim() || `CAD Layout Sheet 0${form2DPlans.length + 1}`;
    setForm2DPlans((prev) => [
      ...prev,
      {
        id: `p-${Date.now()}`,
        title,
        image: new2DImage || "/images/cad/plan-01.jpg",
        sheetType: new2DSheetType || "Primary Architectural Layout",
        scale: new2DScale || "1:50",
        description: new2DDesc.trim() || "Architectural CAD drawing sheet.",
      },
    ]);
    setNew2DTitle("");
    setNew2DDesc("");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const projectData: Partial<Project> = {
      title: formTitle,
      category: formCategory,
      scope: formScope,
      client: formClient,
      location: formLocation,
      year: formYear,
      coverImage: formCoverImage,
      image: formCoverImage,
      atmosphere: formAtmosphere,
      turnaround: formTurnaround,
      description: formDescription,
      software: formSoftware.split(",").map((s) => s.trim()).filter(Boolean),
      renders3D: form3DRenders,
      plans2D: form2DPlans,
      gallery: form3DRenders.map((r) => r.image),
      published: formPublished,
      featured: formFeatured,
    };

    if (editingProject) {
      updateProject(editingProject.id || "", projectData);
    } else {
      addProject(projectData as any);
    }

    setIsModalOpen(false);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      selectedCategory === "All" ||
      p.category === selectedCategory ||
      (selectedCategory === "Residential" && p.category === "Residential") ||
      (selectedCategory === "Commercial" && p.category === "Commercial");

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof p.scope === "string" && p.scope.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D49A6A]">
            Project-Wise Spatial Suite
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#F3F4F6] mt-1">
            Projects Manager ({projects.length})
          </h1>
          <p className="text-xs text-[#8E98A5] mt-1">
            Every project bundles multiple 4K 3D Photorealistic Views and 2D CAD Space Planning Sheets.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D49A6A] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-lg shadow-[#D49A6A]/20 transition-all hover:bg-[#E5A97C] active:scale-[0.98] cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Project Suite</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["All", "Residential", "Commercial", "Visualization"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 font-mono-spec text-[10px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#D49A6A] text-[#14171A] font-bold"
                  : "border border-white/10 bg-[#1E2227] text-[#8E98A5] hover:text-[#F3F4F6]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E98A5]" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-[#1E2227] py-2 pl-9 pr-4 text-xs text-[#F3F4F6] placeholder-[#8E98A5] outline-none focus:border-[#D49A6A]"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((proj, index) => {
          const rendersCount = proj.renders3D?.length || (proj.gallery?.length || 3);
          const plansCount = proj.plans2D?.length || 2;

          return (
            <div
              key={proj.id || index}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-[#1E2227] shadow-xl transition-all hover:border-[#D49A6A]/50"
            >
              {/* Image Preview Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#14171A]">
                <img
                  src={proj.coverImage || proj.image}
                  alt={proj.title}
                  onError={handleImageError}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2227] via-transparent to-transparent opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-[10px] font-medium text-[#F3F4F6] backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
                  <span>{proj.category}</span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {proj.featured !== false && (
                    <span className="rounded-full border border-[#D49A6A]/40 bg-[#D49A6A]/20 px-2 py-0.5 font-mono-spec text-[9px] text-[#D49A6A] font-semibold backdrop-blur-md flex items-center gap-1">
                      <Sparkles size={10} />
                      Featured
                    </span>
                  )}
                  <span className="rounded-full border border-white/20 bg-black/70 px-2 py-0.5 font-mono-spec text-[9px] text-[#D1D5DB] backdrop-blur-md">
                    {proj.year || "2026"}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-[#F3F4F6] truncate">
                  {proj.title}
                </h3>
                <p className="text-xs text-[#8E98A5] truncate mt-1">
                  {typeof proj.scope === "string" ? proj.scope : (Array.isArray(proj.scope) ? proj.scope.join(", ") : "3D CGI + 2D Planning")}
                </p>

                {/* 3D & 2D Suite Counts */}
                <div className="mt-3.5 flex flex-wrap items-center gap-2 font-mono-spec text-[10px] uppercase tracking-wider">
                  <span className="flex items-center gap-1 text-[#D49A6A] bg-[#D49A6A]/10 border border-[#D49A6A]/20 px-2.5 py-1 rounded-lg">
                    <Eye size={11} />
                    <span>{rendersCount} 3D Perspectives</span>
                  </span>
                  <span className="flex items-center gap-1 text-[#F3F4F6] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                    <Layers size={11} className="text-[#D49A6A]" />
                    <span>{plansCount} 2D Plans</span>
                  </span>
                </div>

                {/* Bottom Card Actions */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    {proj.published !== false ? (
                      <span className="font-mono-spec text-[9px] uppercase tracking-wider text-[#25D366] flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] shadow-[0_0_6px_#25D366]" />
                        Live
                      </span>
                    ) : (
                      <span className="font-mono-spec text-[9px] uppercase tracking-wider text-[#8E98A5] flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8E98A5]" />
                        Draft
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        const newFeatured = !(proj.featured !== false);
                        updateProject(proj.id || "", { featured: newFeatured });
                        showToast({
                          type: "success",
                          title: newFeatured ? "Project Featured ⭐" : "Project Unfeatured",
                          message: `"${proj.title}" is ${newFeatured ? "now highlighted" : "unstarred"} on homepage.`,
                        });
                      }}
                      className={`font-mono-spec text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
                        proj.featured !== false
                          ? "bg-[#D49A6A]/15 border-[#D49A6A]/40 text-[#D49A6A]"
                          : "bg-white/5 border-white/10 text-[#8E98A5] hover:text-[#F3F4F6]"
                      }`}
                      title={proj.featured !== false ? "Remove from Featured" : "Mark as Featured"}
                    >
                      <Sparkles size={9} />
                      {proj.featured !== false ? "Featured" : "Standard"}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(proj)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#14171A] text-[#F3F4F6] hover:border-[#D49A6A] hover:text-[#D49A6A] transition-colors cursor-pointer"
                      title="Edit project"
                    >
                      <Edit2 size={13} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                          deleteProject(proj.id || "");
                        }
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#14171A] text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* ADD / EDIT PROJECT SUITE MODAL                            */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-[#1E2227] p-6 sm:p-8 shadow-2xl my-8 max-h-[92vh] overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#F3F4F6]">
                    {editingProject ? "Edit Project Suite (3D + 2D)" : "Add New Project Suite"}
                  </h2>
                  <p className="text-xs text-[#8E98A5] mt-0.5">
                    Configure project info, multiple 3D render viewpoints, and 2D CAD drawing sheets.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#8E98A5] hover:text-[#F3F4F6]"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Step Navigation Pills */}
              <div className="my-5 flex flex-wrap sm:flex-nowrap items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setModalTab("general")}
                  className={`rounded-xl px-4 py-2 font-mono-spec text-[10.5px] uppercase tracking-wider transition-all cursor-pointer ${
                    modalTab === "general"
                      ? "bg-[#D49A6A] text-[#14171A] font-bold"
                      : "bg-[#14171A] text-[#8E98A5] hover:text-[#F3F4F6]"
                  }`}
                >
                  1. Project Specs & Cover
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab("3d")}
                  className={`rounded-xl px-4 py-2 font-mono-spec text-[10.5px] uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    modalTab === "3d"
                      ? "bg-[#D49A6A] text-[#14171A] font-bold"
                      : "bg-[#14171A] text-[#8E98A5] hover:text-[#F3F4F6]"
                  }`}
                >
                  <Eye size={12} />
                  <span>2. 3D Renders ({form3DRenders.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab("2d")}
                  className={`rounded-xl px-4 py-2 font-mono-spec text-[10.5px] uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    modalTab === "2d"
                      ? "bg-[#D49A6A] text-[#14171A] font-bold"
                      : "bg-[#14171A] text-[#8E98A5] hover:text-[#F3F4F6]"
                  }`}
                >
                  <Layers size={12} />
                  <span>3. 2D CAD Plans ({form2DPlans.length})</span>
                </button>
              </div>

              {/* TAB 1: General Info */}
              {modalTab === "general" && (
                <div className="space-y-4">
                  {/* Status & Featured Controls */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {/* Publish / Draft Status Toggle */}
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#14171A] p-4 transition-all hover:border-[#D49A6A]/40">
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-3 w-3 rounded-full transition-all ${
                            formPublished ? "bg-[#25D366] shadow-[0_0_8px_#25D366]" : "bg-[#8E98A5]"
                          }`}
                        />
                        <div>
                          <p className="font-display text-xs font-semibold text-[#F3F4F6]">
                            {formPublished ? "Published (Live)" : "Draft Mode"}
                          </p>
                          <p className="font-mono-spec text-[10px] text-[#8E98A5]">
                            {formPublished ? "Visible to website visitors" : "Hidden from public"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormPublished(!formPublished)}
                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                          formPublished ? "bg-[#25D366]" : "bg-white/20"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-[#14171A] transition-transform ${
                            formPublished ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Featured / Starred Toggle */}
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#14171A] p-4 transition-all hover:border-[#D49A6A]/40">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                            formFeatured ? "bg-[#D49A6A]/20 text-[#D49A6A] border border-[#D49A6A]/40 shadow-[0_0_8px_#D49A6A]/30" : "bg-white/5 text-[#8E98A5]"
                          }`}
                        >
                          <Sparkles size={11} />
                        </span>
                        <div>
                          <p className="font-display text-xs font-semibold text-[#F3F4F6]">
                            {formFeatured ? "Featured Project ⭐" : "Standard Archive"}
                          </p>
                          <p className="font-mono-spec text-[10px] text-[#8E98A5]">
                            {formFeatured ? "Highlighted on Homepage" : "Regular project listing"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormFeatured(!formFeatured)}
                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                          formFeatured ? "bg-[#D49A6A]" : "bg-white/20"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-[#14171A] transition-transform ${
                            formFeatured ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. Warm Minimalist Residence"
                        className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                      />
                    </div>

                    <div>
                      <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                        Category *
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Visualization">Visualization</option>
                        <option value="Architecture">Architecture</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        placeholder="e.g. Noida Sector 128"
                        className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                      />
                    </div>

                    <div>
                      <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                        Client / Commission
                      </label>
                      <input
                        type="text"
                        value={formClient}
                        onChange={(e) => setFormClient(e.target.value)}
                        placeholder="e.g. Private Penthouse"
                        className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                      <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                        Scope of Work
                      </label>
                      <input
                        type="text"
                        value={formScope}
                        onChange={(e) => setFormScope(e.target.value)}
                        placeholder="e.g. Full 3D CGI Visualization + 2D Space Planning"
                        className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                      />
                    </div>

                    <div>
                      <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        value={formYear}
                        onChange={(e) => setFormYear(e.target.value)}
                        placeholder="2026"
                        className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                      Software & Tool Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formSoftware}
                      onChange={(e) => setFormSoftware(e.target.value)}
                      placeholder="3ds Max, Corona Renderer, AutoCAD, Photoshop"
                      className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                        Atmosphere Tone / Lighting
                      </label>
                      <input
                        type="text"
                        value={formAtmosphere}
                        onChange={(e) => setFormAtmosphere(e.target.value)}
                        placeholder="e.g. 2700K Warm Daylight"
                        className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                      />
                    </div>

                    <div>
                      <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                        Turnaround Delivery Time
                      </label>
                      <input
                        type="text"
                        value={formTurnaround}
                        onChange={(e) => setFormTurnaround(e.target.value)}
                        placeholder="e.g. 3 – 5 Days"
                        className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                      />
                    </div>
                  </div>

                  {/* Master Cover Image */}
                  <div>
                    <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-2">
                      Master Showcase Cover Image
                    </label>

                    {formCoverImage ? (
                      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D49A6A]/40 bg-[#14171A] mb-3 group">
                        <img src={formCoverImage} alt="Cover Preview" onError={handleImageError} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                          <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-[#D49A6A] px-4 py-2 text-xs font-bold text-[#14171A] hover:bg-[#E5A97C]">
                            {isUploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                            <span>Replace Cover Image</span>
                            <input type="file" accept="image/*" className="hidden" disabled={isUploading} onChange={(e) => handleFileUpload(e, "cover")} />
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormCoverImage("")}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/30"
                          >
                            <Trash2 size={13} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-white/20 hover:border-[#D49A6A] bg-[#14171A] hover:bg-[#14171A]/80 transition-all rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer mb-3 group">
                        <div className="h-12 w-12 rounded-2xl bg-[#D49A6A]/10 border border-[#D49A6A]/30 flex items-center justify-center text-[#D49A6A] mb-3 group-hover:scale-110 transition-transform">
                          {isUploading ? <Loader2 size={22} className="animate-spin" /> : <Upload size={22} />}
                        </div>
                        <p className="font-display text-xs font-semibold text-[#F3F4F6]">
                          {isUploading ? "Uploading 4K Render to Cloudinary..." : "Click to Upload Cover Image from Computer"}
                        </p>
                        <p className="font-mono-spec text-[9px] uppercase tracking-wider text-[#8E98A5] mt-1">
                          Supports PNG, JPG, WEBP (Direct Cloud Storage)
                        </p>
                        <input type="file" accept="image/*" className="hidden" disabled={isUploading} onChange={(e) => handleFileUpload(e, "cover")} />
                      </label>
                    )}

                    <input
                      type="text"
                      value={formCoverImage}
                      onChange={(e) => setFormCoverImage(e.target.value)}
                      placeholder="Or paste Direct Image URL here (https://res.cloudinary.com/...)"
                      className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                    />
                  </div>

                  <div>
                    <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                      Project Description & Design Approach
                    </label>
                    <textarea
                      rows={3}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Explain how the 2D layout and 3D renders work together..."
                      className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Multi-3D Views Manager */}
              {modalTab === "3d" && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-[#14171A] p-4">
                    <p className="font-display text-sm font-semibold text-[#D49A6A] mb-3">
                      Current 3D Render Perspectives ({form3DRenders.length})
                    </p>

                    {form3DRenders.length === 0 ? (
                      <p className="font-mono-spec text-[10px] text-[#8E98A5] py-4 text-center">
                        No 3D perspectives added yet. Use the form below to upload and add views.
                      </p>
                    ) : (
                      <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                        {form3DRenders.map((r, idx) => (
                          <div
                            key={r.id || idx}
                            className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1E2227] p-3"
                          >
                            <div className="flex items-center gap-3 truncate">
                              <img src={r.image} alt={r.title} onError={handleImageError} className="h-10 w-14 rounded-lg object-cover border border-white/10 shrink-0" />
                              <div className="truncate">
                                <p className="font-display text-xs font-semibold text-[#F3F4F6] truncate">{r.title}</p>
                                <p className="font-mono-spec text-[9px] text-[#D49A6A] mt-0.5">{r.tag || "4K Render"}</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setForm3DRenders(form3DRenders.filter((_, i) => i !== idx))}
                              className="text-[#8E98A5] hover:text-[#EF4444] p-1 shrink-0"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add New 3D Perspective Form */}
                  <div className="rounded-2xl border border-[#D49A6A]/30 bg-[#14171A] p-4 space-y-3">
                    <p className="font-mono-spec text-[10px] uppercase tracking-wider text-[#D49A6A]">
                      + Upload & Add 3D Perspective View
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        placeholder="View Title (e.g. Master Bedroom Twilight Pass)..."
                        value={new3DTitle}
                        onChange={(e) => setNew3DTitle(e.target.value)}
                        className="rounded-xl border border-white/10 bg-[#1E2227] p-2.5 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                      />
                      <input
                        type="text"
                        placeholder="Tag (e.g. 2700K Evening Mood / Material Closeup)..."
                        value={new3DTag}
                        onChange={(e) => setNew3DTag(e.target.value)}
                        className="rounded-xl border border-white/10 bg-[#1E2227] p-2.5 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                      />
                    </div>

                    {/* Upload Card for 3D View */}
                    <div className="flex flex-col sm:flex-row gap-3 items-center">
                      {new3DImage ? (
                        <div className="h-16 w-24 rounded-xl overflow-hidden border border-[#D49A6A]/40 shrink-0">
                          <img src={new3DImage} alt="Preview" onError={handleImageError} className="h-full w-full object-cover" />
                        </div>
                      ) : null}

                      <label className="flex-1 w-full border border-dashed border-[#D49A6A]/40 hover:bg-[#D49A6A]/10 transition-all rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer">
                        {isUploading ? <Loader2 size={14} className="animate-spin text-[#D49A6A]" /> : <Upload size={14} className="text-[#D49A6A]" />}
                        <span className="text-xs font-semibold text-[#F3F4F6]">
                          {isUploading ? "Uploading to Cloud..." : "Upload 3D Render Image File"}
                        </span>
                        <input type="file" accept="image/*" className="hidden" disabled={isUploading} onChange={(e) => handleFileUpload(e, "3d")} />
                      </label>
                    </div>

                    <input
                      type="text"
                      placeholder="Or paste Direct 3D Image URL (https://res.cloudinary.com/...)"
                      value={new3DImage}
                      onChange={(e) => setNew3DImage(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#1E2227] p-2 text-[11px] text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                    />

                    <button
                      type="button"
                      onClick={handleAdd3D}
                      className="w-full rounded-xl bg-[#D49A6A] py-2.5 text-xs font-bold text-[#14171A] hover:bg-[#E5A97C] cursor-pointer"
                    >
                      Add 3D View to Project
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: Multi-2D CAD Plans Manager */}
              {modalTab === "2d" && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-[#14171A] p-4">
                    <p className="font-display text-sm font-semibold text-[#F3F4F6] mb-3">
                      Current 2D Space & CAD Plans ({form2DPlans.length})
                    </p>

                    {form2DPlans.length === 0 ? (
                      <p className="font-mono-spec text-[10px] text-[#8E98A5] py-4 text-center">
                        No 2D plan sheets added yet. Use the form below to upload and add CAD drawings.
                      </p>
                    ) : (
                      <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                        {form2DPlans.map((p, idx) => (
                          <div
                            key={p.id || idx}
                            className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1E2227] p-3"
                          >
                            <div className="flex items-center gap-3 truncate">
                              <img src={p.image} alt={p.title} onError={handleImageError} className="h-10 w-14 rounded-lg object-contain bg-[#0F1113] border border-white/10 shrink-0" />
                              <div className="truncate">
                                <p className="font-display text-xs font-semibold text-[#F3F4F6] truncate">{p.title}</p>
                                <p className="font-mono-spec text-[9px] text-[#8E98A5] mt-0.5">{p.sheetType} · Scale {p.scale || "1:50"}</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setForm2DPlans(form2DPlans.filter((_, i) => i !== idx))}
                              className="text-[#8E98A5] hover:text-[#EF4444] p-1 shrink-0"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add New 2D CAD Sheet Form */}
                  <div className="rounded-2xl border border-white/20 bg-[#14171A] p-4 space-y-3">
                    <p className="font-mono-spec text-[10px] uppercase tracking-wider text-[#F3F4F6]">
                      + Upload & Add 2D Architectural Plan Sheet
                    </p>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <input
                        type="text"
                        placeholder="Sheet Title (e.g. Electrical & Lighting Grid)..."
                        value={new2DTitle}
                        onChange={(e) => setNew2DTitle(e.target.value)}
                        className="rounded-xl border border-white/10 bg-[#1E2227] p-2.5 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A] sm:col-span-2"
                      />
                      <input
                        type="text"
                        placeholder="Scale (e.g. 1:50 / 1:25)..."
                        value={new2DScale}
                        onChange={(e) => setNew2DScale(e.target.value)}
                        className="rounded-xl border border-white/10 bg-[#1E2227] p-2.5 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                      />
                    </div>

                    {/* Upload Card for 2D Plan */}
                    <div className="flex flex-col sm:flex-row gap-3 items-center">
                      {new2DImage ? (
                        <div className="h-16 w-24 rounded-xl overflow-hidden border border-white/20 bg-[#0F1113] p-1 shrink-0">
                          <img src={new2DImage} alt="Preview" onError={handleImageError} className="h-full w-full object-contain" />
                        </div>
                      ) : null}

                      <label className="flex-1 w-full border border-dashed border-white/30 hover:bg-white/5 transition-all rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer">
                        {isUploading ? <Loader2 size={14} className="animate-spin text-white" /> : <Upload size={14} className="text-white" />}
                        <span className="text-xs font-semibold text-[#F3F4F6]">
                          {isUploading ? "Uploading to Cloud..." : "Upload 2D CAD Plan Drawing File"}
                        </span>
                        <input type="file" accept="image/*" className="hidden" disabled={isUploading} onChange={(e) => handleFileUpload(e, "2d")} />
                      </label>
                    </div>

                    <input
                      type="text"
                      placeholder="Or paste Direct 2D Image URL (https://res.cloudinary.com/...)"
                      value={new2DImage}
                      onChange={(e) => setNew2DImage(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#1E2227] p-2 text-[11px] text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                    />

                    <button
                      type="button"
                      onClick={handleAdd2D}
                      className="w-full rounded-xl bg-[#D49A6A] py-2.5 text-xs font-bold text-[#14171A] hover:bg-[#E5A97C] cursor-pointer"
                    >
                      Add 2D Plan Sheet to Project
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
              <div className="font-mono-spec text-[10px] text-[#8E98A5]">
                {form3DRenders.length} 3D Renders · {form2DPlans.length} 2D Plans Configured
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-medium text-[#8E98A5] hover:text-[#F3F4F6]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D49A6A] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-md hover:bg-[#E5A97C]"
                >
                  <Check size={14} />
                  <span>{editingProject ? "Update Project Suite" : "Save & Publish"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
