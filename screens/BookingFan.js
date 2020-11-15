/* eslint-disable max-len */
import React, { useState } from 'react'
import { Platform } from 'react-native'
import moment from 'moment'
import styled from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'
import HorizontalSpace from '../components/containers/HorizontalSpace'
import AppColors from '../constants/colors'
import occasions from '../constants/occasions'
import ActionButton from '../components/buttons/ActionButton'
import useMap from '../hooks/useMap'
import { perfectWidth, perfectHeight, screenWidth, screenHeight } from '../services/commonFunctions'
import VerticalSpace from '../components/containers/VerticalSpace'
import RadiobuttonsOuterContainer from '../components/containers/RadiobuttonsOuterContainer'
import CustomizedBookingModal from '../modules/booking/components/CustomizedBookingModal'
import StaticInputText from '../modules/booking/components/StaticInputText'
import BookingTimeInput from '../modules/booking/components/BookingTimeInput'
import InputContainer from '../modules/booking/components/InputContainer'
import MapPickerModal from '../components/maps/MapPickerModal'
import DurationTextInput from '../modules/booking/components/DurationTextInput'
import useBookingForm from '../modules/booking/customHooks/useBookingForm'
import KeyboardAvoiding from '../components/containers/KeyboardAvoiding'
import Row from '../components/containers/Row'
import Dropdown from '../components/dropdowns/DropdownModal.js'
import TermsAndConditionsModal from '../modules/booking/components/TermsAndConditionsModal'

export default function Booking() {
  const [timeModalOpened, setTimeModalOpened] = useState(false)
  const [termsVisible, setTermsVisible] = useState(false)
  const [calendarModalOpened, setcalendarModalOpened] = useState(false)
  const [timeText, setTimeText] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  )
  const [calendarText, setcalendarText] = useState(
    moment().add(1, 'days').format('ddd, D MMM YYYY'),
  )
  const [durationText, setdurationText] = useState('')
  const {
    mapViewOpened,
    setMapViewOpened,
    addressText,
    setAddressText,
    position,
    setPosition,
  } = useMap()
  const {
    handleSubmit,
    errors,
    setValue,
    onSubmit,
    dictionary: {
      booking,
      signup: { done },
    },
    lang,
    loading,
    trigger,
  } = useBookingForm()
  return (
    <KeyboardAvoiding>
      <Container
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 1 }}
        colors={
          timeModalOpened || calendarModalOpened
            ? [AppColors.gradientModal, AppColors.secondary]
            : [AppColors.primary, AppColors.primary]
        }>
        <Row centerSelf={false} wrap={false} width={perfectWidth(332)}>
          <InputColumn>
            <InputContainer
              inputWidth={155}
              lineWidth={155}
              inputText={booking?.date?.toUpperCase()}
              err={errors?.date?.message}>
              <StaticInputText
                onChangeText={text => setValue('date', text, true)}
                actionNeeded={() => {
                  setcalendarModalOpened(true)
                }}>
                {calendarText}
              </StaticInputText>
            </InputContainer>
          </InputColumn>
          <HorizontalSpace width={21} />
          <InputColumn>
            <BookingTimeInput
              setTimeModalOpened={setTimeModalOpened}
              timeText={timeText}
              onChangeText={text => setValue('time', text, true)}
              err={errors?.time?.message}
            />
          </InputColumn>
        </Row>
        <InputContainer
          inputText={booking?.Duration}
          err={errors?.duration?.message}
          onBlur={() => trigger('duration')}>
          <DurationTextInput
            durationText={durationText}
            setdurationText={setdurationText}
            onChangeText={text => setValue('duration', text, true)}
            onBlur={() => trigger('duration')}
          />
        </InputContainer>
        <InputContainer
          inputText={booking?.Address}
          err={errors?.address?.message}
          onBlur={() => trigger('address')}>
          <StaticInputText
            actionNeeded={() => {
              setMapViewOpened(true)
            }}
            onChangeText={text => {
              setValue('address', text, true)
            }}
            placeholder={booking?.selectAddressPlaceholder}>
            {addressText}
          </StaticInputText>
        </InputContainer>
        <Row width={perfectWidth(332)}>
          <InputColumn>
            <InputContainer
              lineWidth={155}
              placeholder={booking?.buildingPlaceholder}
              inputText={booking?.buildingPlaceholder}
              onChangeText={text => setValue('building', text, true)}
              err={errors?.building?.message}
              onBlur={() => trigger('building')}
            />
          </InputColumn>
          <HorizontalSpace width={15} />
          <InputColumn>
            <InputContainer
              lineWidth={155}
              placeholder={booking.apartmentPlaceholder}
              inputText={booking?.apartmentPlaceholder}
              onChangeText={text => setValue('apartment', text, true)}
              err={errors?.apartment?.message}
              onBlur={() => trigger('apartment')}
            />
          </InputColumn>
        </Row>
        <InputContainer inputText={booking?.Eventtype}>
          <Row width={perfectWidth(290)}>
            <RadiobuttonsOuterContainer
              onChange={value => setValue('isPublic', value, true)}
              buttonsArray={[{ text: `${booking?.private}` }, { text: `${booking?.public}` }]}
            />
          </Row>
        </InputContainer>
        <InputContainer
          placeholder={booking?.occasionName}
          onChangeText={text => setValue('occasionName', text, true)}
          inputText={booking?.occasionName}
          err={errors?.occasionName?.message}
          onBlur={() => trigger('occasionName')}
        />
        <InputContainer err={errors?.occasionType?.message} inputText={booking?.OccasionType}>
          <Dropdown
            buttonTitle={done}
            dataArray={occasions.map(occ => ({ ...occ, key: occ?.key?.[lang] }))}
            onSelect={selected => {
              setValue('occasionType', selected?.value, true)
              trigger('occasionType')
            }}
            imageSize={screenWidth * 0.05}
            fieldWidth={perfectWidth(290)}
            fieldHeight={screenHeight * 0.06}
            textColor={AppColors.fontColor}
            fieldBgColor={'transparent'}
            placeholderColor={AppColors.fontColorLowOpacity}
            itemsColor={AppColors.fontColor}
            seperatorColor={AppColors.primary}
            backgroundColor={AppColors.primary}
            doneButtonColor={AppColors.greyShade}
            buttonColor={AppColors.fontColor}
            placeholder={booking?.selectOcassion}
          />
        </InputContainer>

        <VerticalSpace height={20} />

        <ActionButton
          centered
          loading={loading}
          withGradient={true}
          text={booking?.sendRequest}
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 2,
            }),
          }}
          onPress={handleSubmit(() => setTermsVisible(true))}
        />
        <VerticalSpace height={60} />
        <MapPickerModal
          isVisible={mapViewOpened}
          position={position}
          setPosition={setPosition}
          cancel={() => setMapViewOpened(false)}
          setAddress={setAddressText}
        />
        <CustomizedBookingModal
          calendarText={calendarText}
          timeText={timeText}
          timeModalOpened={timeModalOpened}
          calendarModalOpened={calendarModalOpened}
          setTimeModalOpened={setTimeModalOpened}
          setcalendarModalOpened={setcalendarModalOpened}
          setcalendarText={setcalendarText}
          setTimeText={setTimeText}
        />
        <TermsAndConditionsModal
          isVisible={termsVisible}
          cancel={() => setTermsVisible(false)}
          accept={handleSubmit(values => onSubmit(values))}
        />
      </Container>
    </KeyboardAvoiding>
  )
}
const Container = styled(LinearGradient)`
  flex-direction: column;
  flex: 1;
  background-color: ${AppColors.primary};
  padding-top: ${perfectHeight(20)}px;
  padding-horizontal: ${perfectWidth(22)}px;
  width: 100%;
`
const InputColumn = styled.View`
  flex-direction: column;
`
