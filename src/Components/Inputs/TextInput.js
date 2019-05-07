// @flow
//@jsx jsx
import * as React from 'react'
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { isValid } from './'
import { Label } from './Label'
import type { FieldProps } from 'formik'
import type { ComponentType } from 'react'
import type { InputProps } from './'

type TextInputProps = {
  error?: boolean | string,
  disabled?: boolean,
  size?: 'medium' | 'large',
}
const TextInput: ComponentType<TextInputProps & InputProps<?string>> = styled(
  'input',
)(
  {
    width: '100%',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
    outline: 'none',
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'solid',
    outlineWidth: 2,
    transition:
      'border-color .2s ease, background .2s ease, box-shadow .2s ease',
  },
  ({ size = 'medium' }) =>
    size === 'large'
      ? {
          height: 48,
          padding: '0 16px',
          fontSize: 17,
          lineHeight: 1.53,
          letterSpacing: -0.3,
        }
      : {
          fontSize: 15,
          lineHeight: 1.33,
          letterSpacing: -0.2,
          height: 40,
          padding: '0 12px',
        },
  ({ theme: { colors }, error, disabled }) => ({
    cursor: disabled && 'not-allowed',
    boxShadow: 'transparent 0 0 0 2px',
    color: error ? colors.reds[1] : disabled ? colors.darks[4] : colors.text,
    backgroundColor: disabled ? colors.lights[2] : 'white',
    borderColor: error ? colors.reds[1] : colors.lights[0],
    ':hover': disabled || {
      borderColor: colors.darks[4],
    },
    ':focus': disabled || {
      borderColor: colors.primary[0],
      boxShadow: `${transparentize(0.92, colors.primary[0])} 0 0 0 2px`,
    },
  }),
)

type LabeledTextInputProps = {
  label: string,
  required?: boolean,
  className?: string,
}
const LabeledTextInput = ({
  className,
  required,
  label,
  name,
  // $FlowFixMe
  ...props
}: LabeledTextInputProps & TextInputProps & InputProps<?string>) => (
  <div css={{ width: '100%' }} className={className}>
    {label && (
      <Label
        for={name}
        required={required}
        size={props.size}
        css={{ paddingBottom: 10, display: 'block' }}>
        {label}
      </Label>
    )}
    <TextInput placeholder={label} {...props} name={name} id={name} />
  </div>
)

const asField = <Props: {}>(
  Input: React.ComponentType<Props>,
): React.ComponentType<Props & FieldProps> => props => {
  const {
    field,
    form: { errors, touched },
    ...inputProps
  } = props
  return (
    <Input
      {...field}
      error={isValid(field.name, { errors, touched })}
      {...inputProps}
    />
  )
}
LabeledTextInput.Field = asField(LabeledTextInput)
export { LabeledTextInput as TextInput, asField }
