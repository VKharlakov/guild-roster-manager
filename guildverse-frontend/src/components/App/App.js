import React from 'react';
import GuildProfile from '../GuildProfile/GuildProfile';
import Raid from '../Raid/Raid';
import MythicPlus from '../MythicPlus/MythicPlus';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css'
import api from '../../utils/api'
import { compareByRole, roles } from "../../utils/utils";
import { Route, Routes } from 'react-router-dom';
import { CurrentGuildContext } from '../../contexts/CurrentGuildContext';
import Home from '../Home/Home';
import Guilds from '../Guilds/Guilds';

function App() {
  const [activeGuildData, setActiveGuildData] = React.useState({ name: '', active_members: [] })
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false)
  const [errorText, setErrorText] = React.useState('')

  //Add characters to Roster(s)
  function handleCardAdd(cardData, roster, rosterSetter) {
    api.getCharacterData(cardData)
      .then((res) => {
        rosterSetter([{
          name: res.name,
          class: res.class,
          realm: res.realm,
          mythic_plus_raiting: res.mythic_plus_scores_by_season[0].scores.all,
          role: res.active_spec_role.toLowerCase(),
          role_id: roles.indexOf(res.active_spec_role.toLowerCase()),
          ilvl: res.gear.item_level_equipped,
          avatar: res.thumbnail_url,
        }, ...roster].sort(compareByRole))
      })
      .catch((err) => {
        setIsErrorPopupOpen(true)
        if (err.includes('400')) {
          setErrorText(`Couldn't find your character, please check if the name and realm are correct and try again.`)
        }
      })
  }

  //Delete character from a roster
  function handleCardDelete(roster, rosterSetter, id) {
    rosterSetter(roster.filter(card => roster.indexOf(card) !== id))
  }

  React.useEffect(() => {
    api.getGuildData('eu', 'aerie-peak', 'together')
      .then((res) => {
        setActiveGuildData({
          name: res.name,
          active_members: res.members
        })
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <section className="app">
      <CurrentGuildContext.Provider value={activeGuildData}>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/guilds' element={<Guilds />}/>
          <Route path={`/${activeGuildData.name}`} element={
              <GuildProfile
                isErrorPopupOpen={isErrorPopupOpen}
                setIsErrorPopupOpen={setIsErrorPopupOpen}
                errorText={errorText}
              />
            }>
            <Route path='raid' element={
              <Raid
                onCardAdd={handleCardAdd}
                onCardDelete={handleCardDelete}
                sectionType='raid'
              />}
            />
            <Route path='mythic-plus' element={
              <MythicPlus
                onCardAdd={handleCardAdd}
                onCardDelete={handleCardDelete}
                sectionType='mythic-plus'
              />}
            />
          </Route>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </CurrentGuildContext.Provider>
    </section>
  );
}

export default App;