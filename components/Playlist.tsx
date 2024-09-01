import React from "react";

interface Props {
  className?: string;
  name: string;
  imageURL: string;
}

export const Playlist: React.FC<Props> = ({ className, name, imageURL }) => {
  return (
    <div className={className}>
      <div className="m-3 max-sm:m-0 muted cursor-pointer hover:opacity-80 hover:scale-105 transition-all">
        <img
          className="rounded-xl object-fill w-72 h-72 max-sm:w-full  mx-auto "
          width={300}
          height={300}
          src={imageURL}
          alt="example playlist"
        />
        <h1 className="text-3xl foreground  text-center mt-2">{name}</h1>
      </div>
    </div>
  );
};
