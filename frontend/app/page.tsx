"use client";
import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser, updateUser } from "../lib/api";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      await updateUser(editingId, { name, email, title, address });
      setEditingId(null);
    } else {
      // CREATE
      await createUser({ name, email, title, address });
    }

    setName("");
    setEmail("");
    setTitle("");
    setAddress("");
    loadUsers();
  };

  const handleEdit = (user: any) => {
    setName(user.name ?? "");
    setEmail(user.email ?? "");
    setTitle(user.title ?? "");
    setAddress(user.address ?? "");
    setEditingId(user.id);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    loadUsers();
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setTitle("");
    setAddress("");
    setEditingId(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 space-y-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center">User Details</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <input
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editingId ? "Update" : "Add"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* User List */}
        <ul className="space-y-3">
          {users.map((u: any) => (
            <li
              key={u.id}
              className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800 px-4 py-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
                <p className="text-sm text-gray-500">{u.title}</p>
                <p className="text-sm text-gray-500">{u.address}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(u)}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
