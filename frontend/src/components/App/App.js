import './App.css'
import React from 'react';
import GuildProfile from '../GuildProfile/GuildProfile';
import Raid from '../Raid/Raid';
import MythicPlus from '../MythicPlus/MythicPlus';
import PageNotFound from '../PageNotFound/PageNotFound';
import raiderIoApi from '../../utils/raiderIoApi'
import guildRMApi from '../../utils/guildRMApi';
import { Route, Routes } from 'react-router-dom';
import { CurrentGuildContext } from '../../contexts/CurrentGuildContext';
import Guilds from '../Guilds/Guilds';
import Header from '../Header/Header';
import Popup from '../Popup/Popup';

function App() {
  const [guildList, setGuildList] = React.useState([])                //All guilds state array
  const [isPreloader, setIsPreloader] = React.useState(true)          //Preloader state
  const [isPageLoading, setIsPageLoading] = React.useState(true)      //Upon loading page "skeleton" state
  const [isGuildLoading, setIsGuildLoading] = React.useState(false)   //When adding guild "skeleton" state

  const [isErrorPopup, setIsErrorPopup] = React.useState(false)
  const [errorPopupInfo, setErrorPopupInfo] = React.useState({ title: '', text: '', buttonText: '' })
  // Add guild popup state
  const [isAddPopup, setIsAddPopup] = React.useState(false)
  // Current guild data for context
  const [currentGuild, setCurrentGuild] = React.useState({ name: '', members: [], raid: [] })

  // Get all guilds
  React.useEffect(() => {
    guildRMApi.getGuilds()
      .then((guilds) => {
        setGuildList(guilds)
      })
      .catch((err) => {
        setErrorPopupInfo({
          title: 'Server is not responding',
          text: 'An unexpected error has occurred. Something has happened with our servers. Please, try again later.',
          buttonText: 'Ok',
        })
        setIsErrorPopup(true)
      })
      .finally(() => {
        setTimeout(() => {
          setIsPageLoading(false)
          setIsPreloader(false)
        }, 150)
      })
  }, [])

  // Add guild
  function handleAddGuild(data) {
    setIsPreloader(true)
    raiderIoApi.getGuildData(data)
      .then((guild) => {
        setIsGuildLoading(true)
        guildRMApi.createGuild(guild)
          .then((res) => {
            setGuildList([...guildList, res])
          })
          .catch((err) => {
            // if such guild already exists
            if (err.code === 11000) {
              setIsErrorPopup(true)
              setErrorPopupInfo({
                title: 'Guild already exists',
                text: 'Someone has already added your guild!',
                buttonText: 'Ok',
              })

              return
            }

            // if can't connect to guildRMApi servers
            setErrorPopupInfo({
              title: 'Server is not responding',
              text: 'An unexpected error has occurred. Something has happened with our servers. Please, try again later.',
              buttonText: 'Ok',
            })
            setIsErrorPopup(true)
          })
          .finally(() => {
            setIsGuildLoading(false)
            setIsPreloader(false)
          })
      })
      .catch((err) => {
        // if realm is incorrect
        if (err.message.includes('Failed to find realm')) {
          setIsErrorPopup(true)
          setErrorPopupInfo({
            title: 'Incorrect realm',
            text: 'Could not find matching realm in the official realm list.',
            buttonText: 'Ok',
          })
          setIsPreloader(false)
          return
        }

        // if guild name is incorrect
        if (err.message === 'Could not find requested guild') {
          setIsErrorPopup(true)
          setErrorPopupInfo({
            title: 'Incorrect guild name',
            text: 'Could not find requested guild in the raider.io database. It does not mean, that there is no such guild, it just means that raider.io has not recognised it potential yet!',
            buttonText: 'Ok:)',
          })
          setIsPreloader(false)
          return
        }

        console.log('handleAddGuild error:', err)
      })
  }

  return (
    <section className="app">
      <CurrentGuildContext.Provider value={currentGuild}>
        <Routes>
          <Route path='/' element={<Header setIsAddPopup={setIsAddPopup} />}>
            <Route path='guilds' element={
              <Guilds
                isPreloader={isPreloader}
                isPageLoading={isPageLoading}
                isGuildLoading={isGuildLoading}
                isAddPopup={isAddPopup}
                setIsAddPopup={setIsAddPopup}
                guildList={guildList}
                handleAddGuild={handleAddGuild}
                setCurrentGuild={setCurrentGuild}
              />}
            />
            <Route path={`guilds/:guildName`} element={<GuildProfile />}>
              <Route path='raid' element={
                <Raid
                  sectionType='raid'
                  rosterMaxAmount='4'
                  setErrorPopupInfo={setErrorPopupInfo}
                  setIsErrorPopup={setIsErrorPopup}
                />}
              />
              <Route path='mythic-plus' element={
                <MythicPlus
                  sectionType='mythic-plus'
                  rosterMaxAmount='6'
                  setErrorPopupInfo={setErrorPopupInfo}
                  setIsErrorPopup={setIsErrorPopup}
                />}
              />
            </Route>
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Popup
          errorPopupInfo={errorPopupInfo}
          setIsErrorPopup={setIsErrorPopup}
          isActive={isErrorPopup} />
      </CurrentGuildContext.Provider>
    </section>
  );
}

export default App;