import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  perfectHeight,
  perfectWidth,
  perfectSize,
  fontSelector,
} from '../../services/commonFunctions'
import AppColors from '../../constants/colors'
import Switch from '../inputs/Switch'

export default function SwitchBasedList({ items }) {
  /* items prop is supposed to be an array of objects each of them has
  (id, title, state (true or false ?), action (the function to
   be executed upon toggling switch)) */

  const [toggleState, setToggleState] = useState({})
  useEffect(() => {
    const initalState = {}
    if (items) {
      items.forEach(item => {
        initalState[item.id] = item.state || false
      })
    }
    setToggleState(initalState)
  }, [])

  const toggleItem = id => {
    const elementToggled = items.find(item => item.id === id)
    if (elementToggled?.action) {
      elementToggled.action(!toggleState[id])
    }
    setToggleState({ ...toggleState, [id]: !toggleState[id] })
  }
  const renderItem = ({ item }) => (
    <>
      <UpSpacing />
      <ItemContainer>
        <ItemText>{item?.title?.toUpperCase()}</ItemText>
        <Switch
          state={toggleState[item.id]}
          action={() => toggleItem(item.id)}
        />
      </ItemContainer>

      <UpSpacing />
      <Separator />
    </>
  )

  return (
    <>
      <UpSpacing />
      <List data={items} renderItem={renderItem}></List>
    </>
  )
}

SwitchBasedList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number.isRequired,
      state: PropTypes.bool,
      action: PropTypes.func,
    }),
  ),
}

const List = styled.FlatList`
  flex-grow: 0;
`
const UpSpacing = styled.View`
  margin-top: ${perfectHeight(10)}px;
`
const Separator = styled.View`
  width: ${perfectWidth(332)}px;
  height: ${perfectHeight(1)}px;
  border: solid 0.5px ${AppColors.secondaryLightTwo};
`
const ItemText = styled.Text`
  font-size: ${perfectSize(12)}px;
  font-style: normal;
  color: ${AppColors.fontColor};
  font-family: ${fontSelector().bold};
`

const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
