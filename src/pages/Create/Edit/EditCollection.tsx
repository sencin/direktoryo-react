import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Loader2, Trash2 } from "lucide-react";
import { api } from "../../../utils/api";

export default function EditCollection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/collections/${id}`);
        const data = res?.data?.data ?? res?.data;

        if (!data) return;

        setFormData({
          name: data.name ?? "",
          description: data.description ?? "",
          image_url: data.image_url ?? ""
        });
      } catch (err) {
        console.error("Failed loading collection:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/collections/${id}`, formData);
      navigate(`/collections`);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ DELETE COLLECTION
  const handleDelete = async () => {
    if (!window.confirm("Delete this collection? This cannot be undone.")) return;

    setLoading(true);

    try {
      await api.delete(`/collections/${id}`);
      navigate("/collections");
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] opacity-40 animate-pulse">
          loading collection...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-4 md:p-10">
      <div className="max-w-2xl mx-auto">

        {/* BACK + DELETE */}
        <div className="flex justify-between items-center mb-8">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100"
          >
            <ArrowLeft size={14} /> Back
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-red-400 hover:text-red-500 transition"
          >
            <Trash2 size={14} />
            Delete
          </button>

        </div>

        {/* HEADER */}
        <h1 className="text-xl font-black uppercase mb-8">
          Edit Collection
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-[10px] uppercase opacity-50">Name</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 bg-nature-nav border border-nature-sage/20"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase opacity-50">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 bg-nature-nav border border-nature-sage/20"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase opacity-50">Image URL</label>
            <input
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
              className="w-full p-3 bg-nature-nav border border-nature-sage/20"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-5 bg-nature-sage text-nature-bg font-black uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}