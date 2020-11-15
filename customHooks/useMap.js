import { useEffect, useState } from 'react'
import { getUserCurrentLocation, getAddressFromLongAndLat } from '../services/commonFunctions'

const useMap = ({ initialValues }) => {
  const [mapViewOpened, setMapViewOpened] = useState(false)
  const [addressText, setAddressText] = useState('')
  const [position, setPosition] = useState({
    coords: {
      longitude: 31.44568,
      latitude: 30.05419,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  })

  useEffect(() => {
    if (!initialValues) {
      getUserCurrentLocation(pos => {
        setPosition(pos)
      })
    }
  }, [])

  useEffect(() => {
    getAddressFromLongAndLat(position?.coords?.latitude, position?.coords?.longitude, res => {
      if (position) setAddressText(res?.results?.[0]?.formatted_address)
    })
  }, [position])

  return {
    mapViewOpened,
    setMapViewOpened,
    addressText,
    setAddressText,
    position,
    setPosition,
  }
}
export default useMap
