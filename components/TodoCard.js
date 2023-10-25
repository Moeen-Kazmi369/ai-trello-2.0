import React, { useEffect, useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { useBoardStore } from "@/store/boardStore";
import { getImageUrl } from "@/lib/getImageUrl";
import Image from "next/image";

const TodoCard = ({
  draggableProps,
  dragHandleProps,
  innerRef,
  todo,
  id,
  index,
}) => {
  const { deleteTask, board } = useBoardStore();
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    if (todo.image) {
      console.log(typeof todo.image === "object");
      if (!(typeof todo.image === "object")) {
        const image = JSON.parse(todo.image);
        const fetchurl = async () => {
          const res = await getImageUrl(image.bucketId, image.fileId);
          setImageUrl(res.href);
        };
        fetchurl();
      } else {
        const image = todo.image;
        const fetchurl = async () => {
          const res = await getImageUrl(image.bucketId, image.fileId);
          setImageUrl(res.href);
        };
        fetchurl();
      }
    }
  }, [board]);
  return (
    <div
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
      className="bg-white rounded-xl"
    >
      <div className="flex justify-between items-center px-3 py-2">
        <p className="text-xl font-medium capitalize">{todo.title}</p>
        <button>
          <AiFillCloseCircle
            onClick={() => deleteTask(todo, index, id)}
            className="w-8 h-8 text-red-500 hover:text-red-600"
          />
        </button>
      </div>
      {imageUrl && (
        <div className="w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Todo image"
            height={200}
            width={200}
            className="object-contain w-full rounded-b-md"
          />
        </div>
      )}
    </div>
  );
};

export default TodoCard;
