import { Form } from "@/components/UI/Form/Form";
import { Product, Props } from "./types/Props";
import { assets } from "@/assets/assets";
import { OptionList } from "@/constants/Options";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "@/server/api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Add({}: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "Salad",
  });

  const generateCategory = OptionList.map(({ name, value }, i) => {
    return (
      <option key={i} value={value} className="cursor-pointer">
        {name}
      </option>
    );
  });

  const setImageView = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const ifImage = image ? URL.createObjectURL(image) : assets.upload_area;

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  // Define the mutation for adding a product
  const mutation = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: async (newProduct: Product) => {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", String(newProduct.price));
      formData.append("category", newProduct.category);
      if (image) {
        formData.append("image", image);
      }

      // Make the POST request
      const res = await axios.post("/api/food/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product added successfully!");
    },
    onError: () => {
      toast.error("Failed to add product.");
    },
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(data);
  };

  return (
    <div className="w-[70%] ml-[max(5vw,25px)] mt-12 text-gray-600 text-md">
      <Form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={ifImage} alt="upload" className="w-[120px] rounded-md" />
            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              onChange={setImageView}
              required
            />
          </label>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-[max(40%,280px)]">
          <label htmlFor="name">Product name</label>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            onChange={onChangeHandler}
            value={data.name}
            className="border rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-4 w-full md:w-[max(40%,280px)]">
          <label htmlFor="description">Product description</label>
          <textarea
            name="description"
            rows={6}
            className="border resize-none rounded p-2"
            placeholder="Write content here..."
            onChange={onChangeHandler}
            value={data.description}
            required></textarea>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-4 w-full md:w-fit">
            <label htmlFor="">Product category</label>
            <select
              name="category"
              onChange={onChangeHandler}
              className="cursor-pointer p-2 w-full md:max-w-32 h-full rounded-md bg-white border">
              {generateCategory}
            </select>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-fit">
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              name="price"
              placeholder="$20"
              onChange={onChangeHandler}
              value={data.price}
              className="border p-2 w-full md:max-w-32 rounded-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full md:max-w-[120px] p-2 bg-black text-white rounded-md">
          Add
        </button>
      </Form>
    </div>
  );
}
