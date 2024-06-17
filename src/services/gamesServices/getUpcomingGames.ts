import axios, { AxiosError } from 'axios';
import { format, addMonths } from 'date-fns';

const apiKey = process.env.RAWG_API_KEY;
const accessToken = process.env.IGDB_ACCESS_TOKEN;
const clientId = process.env.IGDB_CLIENT_ID;

interface Game {
  name: string;
  released: string;
  background_image: string;
}

const getUpcomingGames = async (minGames: number = 7) => {
  let startDate = format(new Date(), 'yyyy-MM-dd');
  let endDate = format(addMonths(startDate, 1), 'yyyy-MM-dd');

  const endpoint = 'https://api.rawg.io/api/games';
  let params = {
    key: apiKey,
    dates: `${startDate},${endDate}`,
    ordering: 'released'
  };

  let games: Game[] = [];

  try {
    while (games.length < minGames) {
      const response = await axios.get(endpoint, { params });
      games = response.data.results;

      endDate = format(addMonths(endDate, 1), 'yyyy-MM-dd');
      params.dates = `${startDate},${endDate}`;
    }
  } catch (error) {
    console.error('Error fetching games');
  }

  try {
    await Promise.all(games.map((game) => changeGameCoverUrl(game)));
  } catch (error) {
    console.error('Error updating game cover URLs:', error);
  }

  return games.slice(0, minGames);
};

const changeGameCoverUrl = async (game: Game) => {
  const id = await findGameByName(game.name);
  const coverUrl = await getGameCoverById(id);

  game.background_image = coverUrl!;
};

const findGameByName = async (gameName: string) => {
  try {
    const response = await axios({
      url: 'https://api.igdb.com/v4/games',
      method: 'POST',
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`
      },
      data: `search "${gameName}"; fields id; limit 1;`
    });

    if (response.data && response.data.length > 0) {
      return response.data[0].id;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching game ID:', (error as AxiosError).response?.data);
    return null;
  }
};

const getGameCoverById = async (gameId: string) => {
  try {
    const response = await axios({
      url: 'https://api.igdb.com/v4/covers',
      method: 'POST',
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`
      },
      data: `fields image_id; where game=${gameId};`
    });

    if (response.data && response.data.length > 0) {
      const imageId = response.data[0].image_id;
      return `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`;
    } else {
      console.error('No cover image found for the game.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching game cover:', (error as AxiosError).response?.data);
    return null;
  }
};

export default { getUpcomingGames };
