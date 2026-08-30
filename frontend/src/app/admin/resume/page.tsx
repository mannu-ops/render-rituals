"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { experience, education, skillsList } from "@/data";
import { AdminHeader, AdminButton, DataTable } from "@/components/admin";
import { ExperienceItem } from "@/types";

export default function AdminResumePage() {
  const [expList, setExpList] = useState<ExperienceItem[]>(experience);
  const [skills, setSkills] = useState<string[]>(skillsList);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    setSkills((prev) => [...prev, newSkill.trim()]);
    setNewSkill("");
  };

  const handleDeleteSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const columns = [
    {
      header: "Period",
      accessorKey: "period" as keyof ExperienceItem,
    },
    {
      header: "Role",
      cell: (item: ExperienceItem) => (
        <div>
          <p className="font-medium text-black">{item.role}</p>
          <p className="text-xs text-black/45">{item.company} · {item.location}</p>
        </div>
      ),
    },
    {
      header: "Description",
      cell: (item: ExperienceItem) => (
        <p className="max-w-md text-xs text-black/60">{item.description}</p>
      ),
    },
  ];

  return (
    <div className="space-y-12">
      <AdminHeader
        title="Resume & Qualifications"
        description="Manage work history, education history, and technical competencies."
      />

      <section>
        <h2 className="font-display text-2xl mb-4">Work Experience Timeline</h2>
        <DataTable
          columns={columns}
          data={expList}
          keyExtractor={(item) => item.id}
        />
      </section>

      <section className="border-t border-black/10 pt-8">
        <h2 className="font-display text-2xl mb-4">Software & Professional Skills</h2>
        <form onSubmit={handleAddSkill} className="flex gap-3 max-w-md mb-6">
          <input
            type="text"
            placeholder="Add new skill e.g. Corona Renderer"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 border-b border-black/15 bg-transparent py-2 text-sm outline-none"
          />
          <AdminButton type="submit" size="sm">
            <Plus size={14} className="mr-1" /> Add
          </AdminButton>
        </form>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-xs"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleDeleteSkill(skill)}
                className="text-black/40 hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
