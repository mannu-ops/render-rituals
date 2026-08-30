"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { pricingPackages as initialPackages } from "@/data";
import { PricingPackage } from "@/types";
import {
  AdminHeader,
  AdminButton,
  DataTable,
  StatusBadge,
  AdminModal,
  PricingEditor,
} from "@/components/admin";

export default function AdminPricingPage() {
  const [packageList, setPackageList] = useState<PricingPackage[]>(initialPackages);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PricingPackage | null>(null);

  const handleCreate = () => {
    setEditingPackage(null);
    setModalOpen(true);
  };

  const handleEdit = (pkg: PricingPackage) => {
    setEditingPackage(pkg);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      setPackageList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = (data: Partial<PricingPackage>) => {
    if (editingPackage) {
      setPackageList((prev) =>
        prev.map((p) => (p.id === editingPackage.id ? ({ ...p, ...data } as PricingPackage) : p))
      );
    } else {
      const newPkg: PricingPackage = {
        id: `package-${Date.now()}`,
        name: data.name || "New Package",
        title: data.name || "New Package",
        subtitle: data.subtitle || "",
        description: data.description || "",
        price: data.price || 5000,
        priceLabel: data.priceLabel || `From ₹${data.price || 5000}`,
        features: data.features || ["Digital Deliverables"],
        popular: data.popular || false,
      };
      setPackageList((prev) => [...prev, newPkg]);
    }
    setModalOpen(false);
  };

  const columns = [
    {
      header: "Package Name",
      cell: (item: PricingPackage) => (
        <div>
          <p className="font-medium text-black">{item.name}</p>
          <p className="text-[10px] text-black/40">{item.subtitle}</p>
        </div>
      ),
    },
    {
      header: "Price Label",
      accessorKey: "priceLabel" as keyof PricingPackage,
    },
    {
      header: "Popular",
      cell: (item: PricingPackage) => (
        item.popular ? <StatusBadge status="published" /> : <span className="text-xs text-black/30">Standard</span>
      ),
    },
    {
      header: "Actions",
      cell: (item: PricingPackage) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleEdit(item)}
            className="rounded p-1.5 text-black/60 hover:bg-black/5 hover:text-black"
          >
            <Edit size={15} />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(item.id)}
            className="rounded p-1.5 text-red-500 hover:bg-red-50"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminHeader
          title="Pricing Management"
          description="Manage package tiers, pricing estimates, and features."
        />
        <AdminButton onClick={handleCreate} className="gap-2">
          <Plus size={15} />
          Add Package
        </AdminButton>
      </div>

      <div className="mt-8">
        <DataTable
          columns={columns}
          data={packageList}
          keyExtractor={(item) => item.id}
        />
      </div>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPackage ? "Edit Package" : "Add New Package"}
      >
        <PricingEditor
          initialData={editingPackage || undefined}
          onSave={handleSave}
          onCancel={() => setModalOpen(false)}
        />
      </AdminModal>
    </div>
  );
}
