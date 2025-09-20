"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const Editfooditem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchFood = async () => {
      const id = params.id;
      const res = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${id}`);
      const data = await res.json();
      if (data.success) {
        setName(data.result.name);
        setPrice(data.result.price);
        setPath(data.result.path);
        setDescription(data.result.description);
      }
    };
    fetchFood();
  }, [params.id]);

 const handleSubmit = async () => {
  if (!name || !price || !path || !description) {
    setError(true);
    return;
  }

  const response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${params.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      price,
      path,
      description
    })
  });

  const data = await response.json();

  if (data.success) {
    alert("Data updated successfully");
    router.push("/restaurant/dashboard");
  } else {
    alert("Failed to update");
  }
};


  return (
    <div className="p-8 text-red-600 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Food Item</h1>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 block mb-4 w-full" />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 block mb-4 w-full" />
      <input placeholder="Image URL" value={path} onChange={(e) => setPath(e.target.value)} className="border p-2 block mb-4 w-full" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 block mb-4 w-full" />
      {error && <p className="text-red-500">All fields are required</p>}
      <button onClick={handleSubmit} className="bg-red-600 text-white px-6 py-2">Update</button>
    </div>
  );
};

export default Editfooditem;
