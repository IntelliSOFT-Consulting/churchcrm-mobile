export const BASE_URL = 'https://karencommunitychurch.org:4433';
const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const URL = `${BASE_URL}/api/`;

const fetchData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const fetchDataByEndpoint = async endpoint => {
  const url = `${URL}${endpoint}`;
  return fetchData(url);
};
