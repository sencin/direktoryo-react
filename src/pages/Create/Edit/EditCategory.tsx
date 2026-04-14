import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Loader2, Trash2 } from "lucide-react";
import { api } from "../../../utils/api";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    icon_label: ""
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/categories/${id}`);
        const data = res?.data?.data ?? res?.data;

        if (!data) return;

        setForm({
          name: data.name ?? "",
          description: data.description ?? "",
          icon_label: data.icon_label ?? ""
        });
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    fetch();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/categories/${id}`, form);
      navigate("/categories");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this category?")) return;

    setLoading(true);

    try {
      await api.delete(`/categories/${id}`);
      navigate("/categories");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] opacity-40 animate-pulse">loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-4 md:p-10">
      <div className="max-w-2xl mx-auto">

        {/* TOP ACTIONS */}
        <div className="flex justify-between mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] opacity-40 hover:opacity-100">
            <ArrowLeft size={14} /> Back
          </button>

          <button onClick={handleDelete} className="text-[10px] text-red-400 hover:text-red-500 flex items-center gap-2">
            <Trash2 size={14} /> Delete
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleUpdate} className="space-y-6">

          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 bg-nature-nav border border-nature-sage/20"
            placeholder="Category name"
          />

          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-3 bg-nature-nav border border-nature-sage/20"
            placeholder="Description"
          />

          <input
            value={form.icon_label}
            onChange={(e) => setForm({ ...form, icon_label: e.target.value })}
            className="w-full p-3 bg-nature-nav border border-nature-sage/20"
            placeholder="Icon label"
          />

          <button
            disabled={loading}
            className="w-full py-5 bg-nature-sage text-nature-bg font-black uppercase flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}