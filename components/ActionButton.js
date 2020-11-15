import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import AppColors from '../../constants/colors'
import {
  perfectHeight,
  perfectSize,
  perfectWidth,
  fontSelector,
} from '../../services/commonFunctions'

export default function ActionButton({
  text,
  color,
  textColor,
  withGradient,
  colors,
  onPress,
  loading,
  centered,
  width,
  height,
  disabled,
}) {
  let buttonColor = color || AppColors.yellowShade
  let gradColors = colors || [AppColors.primaryGradientStart, AppColors.primaryGradientEnd]
  let fontColor = textColor || AppColors.primary
  if (disabled) {
    buttonColor = AppColors.textInputColor
    gradColors = [AppColors.textInputColor, AppColors.textInputColor]
    fontColor = AppColors.disabled
  }
  return (
    <>
      {withGradient ? (
        <TouchableOpacity disabled={disabled} onPress={onPress}>
          <GradientWrapper
            centered={centered}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={gradColors}>
            {loading ? (
              <ActivityIndicator size='small' color={AppColors.fontColor} />
            ) : (
              <ButtonText textColor={fontColor}>{text?.toUpperCase()}</ButtonText>
            )}
          </GradientWrapper>
        </TouchableOpacity>
      ) : (
        <ButtonBody
          onPress={onPress}
          color={buttonColor}
          width={width}
          height={height}
          disabled={disabled}>
          {loading === true ? (
            <ActivityIndicator size='small' color={AppColors.fontColor} />
          ) : (
            <ButtonText textColor={fontColor}>{text?.toUpperCase()}</ButtonText>
          )}
        </ButtonBody>
      )}
    </>
  )
}

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
  textColor: PropTypes.string,
  withGradient: PropTypes.bool,
  colors: PropTypes.array,
}

const GradientWrapper = styled(LinearGradient)`
  width: ${({ width }) => perfectWidth(width) || perfectWidth(267)}px;
  height: ${({ height }) => perfectHeight(height) || perfectHeight(33)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${perfectSize(10)}px;
  align-self: ${({ centered }) => (centered ? 'center' : 'flex-start')};
`

const ButtonBody = styled.TouchableOpacity`
  width: ${({ width }) => perfectWidth(width) || perfectWidth(267)}px;
  height: ${({ height }) => perfectHeight(height) || perfectHeight(33)}px;
  background-color: ${({ color }) => color};
  justify-content: center;
  align-items: center;
  border-radius: ${perfectSize(10)}px;
  align-self: center;
`

const ButtonText = styled.Text`
  text-align: center;
  color: ${({ textColor }) => textColor};
  font-size: ${perfectSize(14)}px;
  font-family: ${fontSelector().bold};
`
