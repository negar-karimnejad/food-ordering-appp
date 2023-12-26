"use client";

import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { toast } from "react-toastify";

export default function ExistingCategories() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");

  async function getCategories() {
    await fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }

  useEffect(() => {
    getCategories();
  }, []);

  const editCategory = async (id) => {
    const res = await fetch(`/api/category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      toast.success("Category updated successfully");
      getCategories();
    }
  };

  const deleteCategory = async (id) => {
    const res = await fetch(`/api/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      toast.success("Category deleted successfully");
      getCategories();
    }
  };

  return (
    <>
      {categories?.map((category) => (
        <div
          key={category._id}
          className="bg-gray-100 mb-2 flex w-full justify-between rounded-lg p-2"
        >
          <Input
            type="text"
            defaultValue={category.title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-0 font-bold bg-gray-100"
          />
          <div className="flex gap-x-2 items-center">
            <Button
              onClick={() => editCategory(category._id)}
              className="rounded-lg h-9 px-3 text-gray-800 text-base bg-transparent border"
              type="button"
            >
              Edit
            </Button>
            <Button
              onClick={() => deleteCategory(category._id)}
              className="rounded-lg h-9 px-3 text-gray-800 text-base bg-transparent border"
              type="button"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
