export const refreshData = async () => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        const newData = {
          verseOfTheDay: {},
          announcements: [],
          sermons: [],
          sermonNotes: [],
        };

        resolve(newData);
      }, 2000);
    });
  } catch (error) {
    console.error('Error refreshing data:', error);
    throw error;
  }
};
