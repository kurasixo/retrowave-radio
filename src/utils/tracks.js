import { originUrl, tracksUrl } from './urls';

export const getTracks = async () => {
  const tracksResp = await fetch(tracksUrl);
  const { body: { tracks: originTracks } } = await tracksResp.json();
  const tracks = originTracks.map((item) => ({
    ...item,
    artworkUrl: `${originUrl}${item.artworkUrl}`,
    streamUrl: `${originUrl}${item.streamUrl}`,
  }));

  const activeTrackId = tracks[0].id;
  tracks[0].isInitial = true;

  const tracksMap = tracks.reduce((acc, item) => {
    acc[item.id] = item;

    return acc;
  }, {});

  return { tracks, tracksMap, activeTrackId };
};
