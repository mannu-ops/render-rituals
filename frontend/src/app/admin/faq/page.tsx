"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { faqs as initialFaqs } from "@/data";
import {
  AdminHeader,
  AdminButton,
  DataTable,
  AdminModal,
} from "@/components/admin";

export default function AdminFAQPage() {
  const [list, setList] = useState(initialFaqs);
  const [modalOpen, setModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) return;
    setList((prev) => [
      { question: newQuestion, answer: newAnswer },
      ...prev,
    ]);
    setNewQuestion("");
    setNewAnswer("");
    setModalOpen(false);
  };

  const handleDelete = (question: string) => {
    setList((prev) => prev.filter((item) => item.question !== question));
  };

  const columns = [
    {
      header: "Question",
      cell: (item: { question: string; answer: string }) => (
        <p className="font-medium text-black">{item.question}</p>
      ),
    },
    {
      header: "Answer",
      cell: (item: { question: string; answer: string }) => (
        <p className="max-w-xl text-xs text-black/60">{item.answer}</p>
      ),
    },
    {
      header: "Actions",
      cell: (item: { question: string; answer: string }) => (
        <button
          type="button"
          onClick={() => handleDelete(item.question)}
          className="rounded p-1.5 text-red-500 hover:bg-red-50"
        >
          <Trash2 size={15} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminHeader
          title="FAQ Management"
          description="Manage frequently asked questions displayed on the website."
        />
        <AdminButton onClick={() => setModalOpen(true)} className="gap-2">
          <Plus size={15} />
          Add Question
        </AdminButton>
      </div>

      <div className="mt-8">
        <DataTable
          columns={columns}
          data={list}
          keyExtractor={(item) => item.question}
        />
      </div>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add FAQ Item"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <label className="block">
            <span className="label-rituals">Question</span>
            <input
              type="text"
              required
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none"
            />
          </label>
          <label className="block">
            <span className="label-rituals">Answer</span>
            <textarea
              rows={4}
              required
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none"
            />
          </label>
          <div className="flex justify-end gap-3 pt-4">
            <AdminButton type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </AdminButton>
            <AdminButton type="submit">Save FAQ</AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
