import React, { useContext } from 'react'
import styled from 'styled-components'

import LangContext from '../contexts/LanguageContext'
import { perfectHeight, perfectWidth } from '../services/commonFunctions'
import colors from '../constants/colors'
import VerticalSpace from '../components/containers/VerticalSpace'
import HeaderText from '../components/headers/HeaderText'
import InputContainer from '../modules/booking/components/InputContainer'
import ActionButton from '../components/buttons/ActionButton'
import useChangePassword from '../modules/settings/customHooks/useChangePassword'

const ChangePassword = () => {
  const {
    dictionary: {
      changePassword: {
        changePassword,
        oldPassword,
        newPassword,
        reEnterPassword,
        typeHere,
        submit,
      },
    },
  } = useContext(LangContext)

  const {
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    trigger,
    changePasswordLoader,
  } = useChangePassword()

  return (
    <Scroll>
      <VerticalSpace height={21} />
      <HeaderText>{changePassword}</HeaderText>
      <VerticalSpace height={50} />
      <InnerContainer>
        <InputContainer
          onChangeText={text => setValue('oldPassword', text)}
          inputText={oldPassword}
          lineWidth={333}
          placeholder={typeHere}
          onBlur={() => trigger('oldPassword')}
          err={errors?.oldPassword?.message}
        />
        <InputContainer
          onChangeText={text => setValue('newPassword', text)}
          inputText={newPassword}
          lineWidth={333}
          placeholder={typeHere}
          onBlur={() => trigger('newPassword')}
          err={errors?.newPassword?.message}
        />
        <InputContainer
          onChangeText={text => setValue('newPasswordRetyped', text)}
          inputText={reEnterPassword}
          lineWidth={333}
          placeholder={typeHere}
          onBlur={() => trigger('newPasswordRetyped')}
          err={errors?.newPasswordRetyped?.message}
        />
      </InnerContainer>
      <VerticalSpace height={10} />
      <ActionButton loading={changePasswordLoader} onPress={handleSubmit(onSubmit)} text={submit} />
    </Scroll>
  )
}

export default ChangePassword

const Scroll = styled.ScrollView`
  flex: 1;
  background-color: ${colors.primary};
  height: ${perfectHeight(675)}px;
`
const InnerContainer = styled.View`
  width: ${perfectWidth(332)}px;
  align-self: center;
`
