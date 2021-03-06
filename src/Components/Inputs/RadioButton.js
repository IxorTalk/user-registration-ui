/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016-present IxorTalk CVBA
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
// @flow
//@jsx jsx
import { jsx } from '@emotion/core'
import * as React from 'react'
import styled from '@emotion/styled'
import { Label } from './Label'
import type { InputProps } from './'
import type { FieldProps } from 'formik'
import { isValid } from './'

type RadioButtonProps = InputProps<string> & {
  required?: boolean,
  size?: 'medium' | 'large',
  value: string,
  className?: string,
  idPrefix?: string,
  checked?: boolean,
  children: React.Node,
}
const RadioButtonComponent = ({
  required,
  size,
  idPrefix,
  className,
  children,
  name,
  value,
  ...props
}: RadioButtonProps) => {
  const id = idPrefix ? `${idPrefix}-${name}-${value}` : `${name}-${value}`
  return (
    <div className={className}>
      <input type="radio" name={name} value={value} id={id} {...props} />
      <div className="radiobutton" />
      <Label for={id} size={size} required={required} css={{ paddingLeft: 10 }}>
        {children}
      </Label>
    </div>
  )
}

const Radio: React.ComponentType<RadioButtonProps> = styled(
  RadioButtonComponent,
)(
  {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    input: {
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: 0,
      appearance: 'none',
      width: 18,
      height: 18,
      outline: 'none',
      transform: 'translateY(-50%)',
    },
    '.radiobutton': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      width: 18,
      height: 18,
      borderRadius: '50%',
      transition: 'background-color .2s ease',
      svg: {
        opacity: 0,
        transition: 'opacity .2s ease',
        path: { fill: 'white' },
      },
      ':after': {
        pointerEvents: 'none',
        content: '" "',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 18,
        height: 18,
        borderRadius: '50%',
        transform: 'scale(0.85)',
        transition: 'background-color .2s ease, transform .2s ease',
      },
    },
  },
  ({ theme: { colors }, value }) => ({
    '.radiobutton': {
      backgroundColor: colors.lights[0],
      ':after': {
        backgroundColor: 'white',
        transform: 'scale(0.85)',
      },
    },
    'input:hover + .radiobutton': {
      backgroundColor: colors.primary[0],
      ':after': {
        backgroundColor: colors.lights[2],
        transform: 'scale(0.75)',
      },
    },
    'input:checked + .radiobutton': {
      backgroundColor: colors.primary[0],
      svg: { opacity: 1 },
      ':after': {
        backgroundColor: 'white',
        transform: 'scale(0.4)',
      },
    },
    'input:checked:hover + .radiobutton': {
      ':after': {
        backgroundColor: 'white',
        transform: 'scale(0.3)',
      },
    },
  }),
)

const asRadioButtonField = <Props: { value: any }>(
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
      checked={field.value === inputProps.value}
    />
  )
}

// $FlowFixMe
Radio.Field = asRadioButtonField(Radio)
export { Radio }
