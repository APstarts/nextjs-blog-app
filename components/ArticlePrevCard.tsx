'use client';

import Link from "next/link";
import React from "react";

interface ArticlePrevCardProps {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  image?: string | null;
}

const ArticlePrevCard: React.FC<ArticlePrevCardProps> = ({
  id,
  title,
  author,
  createdAt,
  image,
}) => {
  return (
    <Link href={`/dashboard/${id}`} prefetch>
      <div className="p-4 border rounded-lg shadow hover:shadow-md transition flex gap-4 items-center cursor-pointer">
        {image ? (
          <img
            src={image}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            {author[0]}
          </div>
        )}

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">
            By {author} · {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArticlePrevCard;
