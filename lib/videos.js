import videoData from "../data/videos.json";

export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";

    const response = await fetch(
      `https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    if (data?.error) {
      console.error("YT API error", data.error);
      return [];
    }
    return data?.items.map((item, index) => {
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id: item?.id?.videoId || item.id,
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
  // https://youtube.googleapis.com/youtube/v3/&key=[YOUR_API_KEY] HTTP/1.1
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=es`;
  return getCommonVideos(URL);
}
