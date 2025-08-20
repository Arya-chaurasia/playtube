import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CommentsList from "./CommentList.js";
import Broken from "./common/ErrorCard.js";
import SignInButton from "./common/SignInButton.js";
import { convertNumberToK } from "../utils/helper";
import { SlActionRedo } from "react-icons/sl";
import { VscThumbsdown, VscThumbsdownFilled, VscThumbsup, VscThumbsupFilled } from "react-icons/vsc";
import { DESCRIPTION_OFFSET } from "../utils/config.js";
import { getVideoByIdApi, getChannelByIdApi, getCommentsByVideoIdApi } from "../utils/config.js";
import LiveChats from "./LiveChats.js";

const WatchPage = () => {
  const [videoData, setVideoData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
 // const [nextPageToken, setNextPageToken] = useState(null);
  const [comment, setComment] = useState("");
  const [isReadMore, setIsReadMore] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const [searchParams] = useSearchParams();
  const userData = useSelector((store) => store.user);
  const videoId = decodeURIComponent(searchParams.get("v"));

  // Fetch Video Details
  const fetchVideoDetails = async () => {
    try {
      const res = await fetch(getVideoByIdApi(videoId));
      const data = await res.json();
      setVideoData(data.items || []);

      if (data?.items?.length === 1) {
        // Fetch Channel Details
        const channelRes = await fetch(getChannelByIdApi(data.items[0].snippet.channelId));
        const channelJson = await channelRes.json();
        setChannelData(channelJson.items || []);

        // Fetch First batch of Comments
        fetchComments(videoId);
      }
    } catch (error) {
      console.error("Failed to fetch video data: ", error);
    }
  };

  // Fetch Comments (supports pagination)
  const fetchComments = async (videoId, pageToken = "") => {
    try {
      const res = await fetch(getCommentsByVideoIdApi(videoId, pageToken));
      const data = await res.json();
      setCommentsData((prev) => [...prev, ...(data.items || [])]);
      //setNextPageToken(data.nextPageToken || null);
    } catch (error) {
      console.error("Failed to fetch comments: ", error);
    }
  };

  useEffect(() => {
    fetchVideoDetails();
  }, [videoId]);

  if (videoData.length !== 1) return <Broken />;

  return (
    <div className="flex flex-1 px-4 py-4 gap-6 overflow-hidden">
      {/* LEFT: Video + Details + Comments */}
      <div className="flex-1 overflow-y-auto pr-4">
        {/* Video Player */}
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube Video Player"
            allow="accelerometer; autoplay; clipboard-write"
            allowFullScreen
          ></iframe>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold">{videoData[0].snippet.title}</h2>

        {/* Channel Info + Actions */}
        <div className="flex justify-between items-center mt-4 flex-wrap gap-4">
          {/* Channel */}
          <div className="flex items-center gap-3">
            <img
              src={
                channelData[0]?.snippet?.thumbnails?.default?.url ||
                videoData[0]?.snippet?.thumbnails?.high?.url
              }
              alt="channel"
              className="rounded-full w-12 h-12 shadow-md"
            />
            <div>
              <h4 className="font-bold text-lg">{channelData[0]?.snippet?.title}</h4>
              <p className="text-sm text-gray-600">
                {!channelData[0]?.statistics?.hiddenSubscriberCount &&
                  convertNumberToK(channelData[0]?.statistics?.subscriberCount) + " subscribers"}
              </p>
            </div>
            {userData?.uid && (
              <button className="ml-4 bg-black py-2 px-6 rounded-full text-white hover:bg-gray-800">
                Subscribe
              </button>
            )}
          </div>


          <div className="flex items-center gap-4">
            {userData?.uid && (
              <div className="flex items-center border rounded-full overflow-hidden">
                <button
                  className="flex items-center px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setIsLiked(!isLiked);
                    if (isDisliked) setIsDisliked(false);
                  }}
                >
                  {isLiked ? (
                    <VscThumbsupFilled className="mr-2 text-xl" />
                  ) : (
                    <VscThumbsup className="mr-2 text-xl" />
                  )}
                  <span>
                    {isLiked
                      ? convertNumberToK(Number(videoData[0]?.statistics?.viewCount) + 1)
                      : convertNumberToK(videoData[0]?.statistics?.viewCount)}
                  </span>
                </button>
                <span className="text-gray-300">|</span>
                <button
                  className="px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setIsDisliked(!isDisliked);
                    if (isLiked) setIsLiked(false);
                  }}
                >
                  {isDisliked ? (
                    <VscThumbsdownFilled className="text-xl" />
                  ) : (
                    <VscThumbsdown className="text-xl" />
                  )}
                </button>
              </div>
            )}

            <button className="flex items-center bg-black px-5 py-2 rounded-full text-white hover:bg-gray-800">
              <SlActionRedo className="mr-2" /> Share
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 p-4 rounded-xl bg-gray-100 whitespace-pre-line">
          {!isReadMore
            ? videoData[0].snippet.description.substring(0, DESCRIPTION_OFFSET)
            : videoData[0].snippet.description}
          {!isReadMore ? (
            <span
              className="font-semibold text-gray-700 cursor-pointer"
              onClick={() => setIsReadMore(true)}
            >
              ...more
            </span>
          ) : (
            <p
              className="font-semibold text-gray-700 cursor-pointer mt-2"
              onClick={() => setIsReadMore(false)}
            >
              Show less
            </p>
          )}
        </div>

        {/* Comments */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {userData?.uid ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                className="w-full border-b pb-2 text-lg bg-transparent outline-none"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex justify-end mt-2 gap-2">
                <button
                  className="px-4 py-2 hover:text-gray-600"
                  onClick={() => setComment("")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
                >
                  Comment
                </button>
              </div>
            </form>
          ) : (
            <SignInButton buttonText="Sign In to Comment" customClassName="w-full" />
          )}

          <CommentsList commentsData={commentsData} parentCommentId={0} />
        </div>
      </div>

      {/* RIGHT: Live Chat */}
      {videoData[0]?.liveStreamingDetails?.activeLiveChatId && (
        <div className="w-96 hidden lg:block sticky top-4 h-[85vh]">
          <LiveChats liveChatId={videoData[0]?.liveStreamingDetails?.activeLiveChatId} />
        </div>
      )}
    </div>
  );
};

export default WatchPage;
