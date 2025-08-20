import React from "react";

const VideoCard = ({ info }) => {
  if (!info) return null;

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="cursor-pointer">
    
      <div className="w-full aspect-video overflow-hidden rounded-xl">
        <img
          className="w-full h-full object-cover"
          alt="thumbnail"
          src={thumbnails?.medium?.url || thumbnails?.high?.url}
        />
      </div>

      <div className="mt-2">
        <h2 className="font-semibold text-sm text-gray-900 line-clamp-2">
          {title}
        </h2>
        <p className="text-xs text-gray-600">{channelTitle}</p>
        <p className="text-xs text-gray-600">
          {Number(statistics?.viewCount).toLocaleString()} views
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
