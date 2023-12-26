"use client";

import Link from "next/link";
import EditableImage from "../../../components/shared/EditableImage";
import UserTabs from "../../../components/shared/UserTabs";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import LeftArrow from "../../../components/ui/LeftArrow";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewMenuItems() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const saveMenuItem = async (e) => {
    e.preventDefault();

    const data = { image, title, description, category, price };
    const res = await fetch("/api/menu-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success("Menu item saved successfully");
    } else {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      {/* <UserTabs /> */}
      <div className="w-[350px] md:w-[700px] mt-16 m-auto flex flex-col justify-center items-center">
        <Link
          href="menu-items/new"
          className="flex gap-3 font-bold border rounded-lg p-2 w-full items-center justify-center"
        >
          <LeftArrow /> Show all menu item
        </Link>
        <div className="mt-10">
          <div className="min-w-[350px] md:w-[700px]  mt-5 flex justify-between items-center sm:gap-5 flex-col sm:flex-row sm:items-start">
            <EditableImage image={image} setImage={setImage} />
            <form
              onSubmit={saveMenuItem}
              className="flex flex-col gap-3 flex-grow w-full"
            >
              <Input
                type="text"
                placeholder="Item Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Base Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <Button type="submit" className="rounded-lg">
                Save
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
