export const BASE_URL = 'https://karencommunitychurch.org:4433';
const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const URL = `${BASE_URL}/api/`;

export const fetchData = url => {
  try {
    fetch(url)
      .then(response => response.json());
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const fetchDataByEndpoint = async endpoint => {
  const url = `${URL}${endpoint}`;
  return fetchData(url);
};

export const apiCalls = [
  'fetchEvents',
  'fetchAnnouncements',
  'fetchSermonnotes',
  'fetchSermons',
  'fetchShortVideo',
]

// map every url to the promise of the fetch
export const fetchAllData = async () => {
  try {
    const responses = await Promise.all(apiCalls.map(apiCall => fetch(`${URL}${apiCall}`)));
    const allData = await Promise.all(responses.map(response => response.json()));
    return allData;
  } catch (error) {
    console.error("An error occurred: ", error);
    throw error; 
  }
}
