import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import VerseOfTheDay from '../VerseOfTheDay/VerseOfTheDay';
import Announcements from '../ListView/Announcements';
import Sermons from '../ListView/Sermons';
import SermonsNotes from '../ListView/SermonNotes';

const Home = ({ setAnnouncement, announcement, setSermonNote, sermonNote, setSermon, sermon }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    verseOfTheDay: {},
    announcements: [],
    sermons: [],
    sermonNotes: [],
  });

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        verseOfTheDay: {},
        announcements: [],
        sermons: [],
        sermonNotes: [],
      });

      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <VerseOfTheDay data={data.verseOfTheDay} />
      <Announcements data={data.announcements} setAnnouncement={setAnnouncement} announcement={announcement}/>
      <Sermons data={data.sermons} setSermon={setSermon} sermon={sermon}/>
      <SermonsNotes data={data.sermonNotes} setSermonNote={setSermonNote} sermonNote={sermonNote} />
    </ScrollView>
  );
};

export default Home;
