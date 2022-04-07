import videoData from "../data/videos.json";

const fetchVideos = async (url) => {
  const BASE_URL = "youtube.googleapis.com/youtube/v3";
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const response = await fetch(
    `https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`
  );
  return await response.json();
};

export const getCommonVideos = async (url) => {
  try {
    const data = process.env.DEVELOPMENT ? videoData : await fetchVideos(url);
    if (data?.error) {
      console.error("YT API error", data.error);
      return [];
    }
    return data?.items.map((item, index) => {
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id: item?.id?.videoId || item.id,
        description: item.snippet.description,
        publishTime: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.error("Something went wrong with the video library", error);
    return [];
  }
};

export async function getVideos(searchQuery) {
  const URL = `search?part=snippet&maxResults=25&q=${searchQuery}`;
  return getCommonVideos(URL);
}

export async function getPopularVideos() {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=es`;
  return getCommonVideos(URL);
}

export async function getYoutubeVideoById(videoId) {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
}
