import React from 'react';
import Header from './Header';
import Main from './Main';
import Raid from './Raid';
import MythicPlus from './MythicPlus';
import api from '../utils/api'
import { compareByRole, roles } from "../utils/utils";
import { Route, Routes } from 'react-router-dom';
import { CurrentGuildContext } from '../contexts/CurrentGuildContext';

function App() {
  const [activeGuildData, setActiveGuildData] = React.useState({ name: '', active_members: '' })

  //Add characters to Roster(s)
  function handleCardAdd(cardData, roster, rosterSetter) {
    api.getCharacterData(cardData)
      .then((res) => {
        console.log(res)
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
    <div className="page">
      <CurrentGuildContext.Provider value={activeGuildData}>
        <Header />
        <Routes>
          <Route path='/' element={<Main />}>
            <Route path="raid" element={
              <Raid
                onCardAdd={handleCardAdd}
                onCardDelete={handleCardDelete}
                sectionType='raid'
              />}
            />
            <Route path="mythic-plus" element={
              <MythicPlus
                onCardAdd={handleCardAdd}
                onCardDelete={handleCardDelete}
                sectionType='mythic-plus'
              />}
            />
          </Route>
        </Routes>
      </CurrentGuildContext.Provider>
    </div>
  );
}

export default App;