const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const REGION_CODE  = "IN"
export const DESCRIPTION_OFFSET = 255;

export const YOUTUBE_API_KEY = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API = "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="

export const YOUTUBE_VIDEOS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,liveStreamingDetails&chart=mostPopular&regionCode=IN&maxResults=50&key=" + GOOGLE_API_KEY;


export const YOUTUBE_COMMENTS_API = "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&key=" + GOOGLE_API_KEY;
export const YOUTUBE_CHANNELS_API = "https://youtube.googleapis.com/youtube/v3/channels?key=" + GOOGLE_API_KEY;


// Video details by ID
export const getVideoByIdApi = (videoId) =>
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,liveStreamingDetails&id=${videoId}&key=${GOOGLE_API_KEY}`;

// Channel details by ID
export const getChannelByIdApi = (channelId) =>
  `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${GOOGLE_API_KEY}`;

// Comments by video ID (with optional pageToken)
export const getCommentsByVideoIdApi = (videoId, pageToken = "") =>
  `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&maxResults=20&pageToken=${pageToken}&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_LIVE_CHAT_MESSAGES_API = "https://youtube.googleapis.com/youtube/v3/liveChat/messages?part=snippet%2CauthorDetails&key=" + GOOGLE_API_KEY;