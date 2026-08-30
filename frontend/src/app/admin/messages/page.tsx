"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { AdminHeader, DataTable, StatusBadge } from "@/components/admin";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const mockMessages: MessageItem[] = [
  {
    id: "msg-01",
    name: "Vikram R.",
    email: "vikram@example.com",
    subject: "Studio Collaboration Inquiry",
    message: "Hi Nikita, we loved your warm minimal residence portfolio and would like to discuss a visualization contract.",
    date: "2026-08-27",
    read: false,
  },
];

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>(mockMessages);

  const handleDelete = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const columns = [
    {
      header: "Sender",
      cell: (item: MessageItem) => (
        <div>
          <p className="font-medium text-black">{item.name}</p>
          <p className="text-xs text-black/45">{item.email}</p>
        </div>
      ),
    },
    {
      header: "Subject & Message",
      cell: (item: MessageItem) => (
        <div>
          <p className="text-xs font-semibold text-black">{item.subject}</p>
          <p className="max-w-md text-xs text-black/60">{item.message}</p>
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "date" as keyof MessageItem,
    },
    {
      header: "Status",
      cell: (item: MessageItem) => <StatusBadge status={item.read ? "reviewed" : "new"} />,
    },
    {
      header: "Actions",
      cell: (item: MessageItem) => (
        <button
          type="button"
          onClick={() => handleDelete(item.id)}
          className="rounded p-1.5 text-red-500 hover:bg-red-50"
        >
          <Trash2 size={15} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <AdminHeader
        title="Contact Messages"
        description="Direct messages received through the contact form."
      />
      <div className="mt-8">
        <DataTable
          columns={columns}
          data={messages}
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
}
