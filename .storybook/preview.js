import * as React from 'react'
import { addDecorator, configure } from '@storybook/react'
import { makeDecorator } from '@storybook/addons'
import { Global } from '@emotion/core'

const withGlobal = makeDecorator({
  name: 'withGlobalStyle',
  wrapper: (getStory, context) => {
    return (
      <>
        <Global
          styles={css`
            #root {
              height: 100%;
            }
          `}
        />
        {getStory(context)}
      </>
    )
  },
})

addDecorator(withGlobal)
configure(require.context('../src', true, /\.stories\.tsx?$/), module)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
