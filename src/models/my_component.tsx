import * as React from 'react'
import { Page } from '../stories/Page'
import { PropsWithChildren, ReactElement } from 'react'

// 각 컴포넌트에 의미를 부여하고 추가적인 프로퍼티를 줌으로써
// 각각의 컴포넌트가 특정 분야에 특화되어 사용할 수 있도록 한다.

// 모든 시작은 분류됨으로 부터 시작된다. (제 생각입니다.)
// 밑에 컴포넌트의 구분은 그저 예시일뿐, 활용하기에 따라 무궁무진하게 사용될 수 있습니다.
// 리스트 컴포넌트 안에는 아이템 컴포넌트만 들어갈 수 있게 한다던지...
// 페이지 컴포넌트만 받아서 처리하는 네비게이션을 만든다던지...

// 타입스크립트의 https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures 패턴을 활용하였습니다.
interface PageComponent<propsT = any, pathT = string> {
  (props: PropsWithChildren<propsT>): ReactElement | null
  type: 'Page'
  path: pathT
}

interface UiComponent<propsT = any, hooksT = unknown, utilsT = unknown> {
  (props: PropsWithChildren<propsT>): ReactElement | null
  type: 'UI'
  hooks: hooksT
  utils: utilsT
}

type MyProps = {
  className: string
}

// 직접 구현
// 명확성을 위해 type 나중에 unique symbol 로 교체.
// 최상단에서는 아래와 같이 .type, .path로 넣어줘도 타입스크립트에서 타입에 맞게 정의한 것으로 인식합니다.
const MyPage: PageComponent<MyProps, '/my-page'> = ({
  className,
  children,
}) => <div className={className}>{children}</div>
MyPage.type = 'Page'
MyPage.path = '/my-page'

Object.freeze(MyPage)

// 컴포넌트를 분류하였으면 아래와 같이 특정 컴포넌트일때 처리하는 함수들을 만들 수 있습니다.
function isPageComponent(component: any): component is PageComponent {
  return component.type === 'Page'
}
function isUiComponent(component: any): component is UiComponent {
  return component.type === 'UI'
}

isPageComponent(MyPage) /*?*/ // true
isUiComponent(MyPage) /*?*/ // false

// 위와 같이 매번 수동적으로 컴포넌트를 정의하는 것이 불편하므로(타입도 따로 넣어줘야 되고)
// 생성기를 만들었습니다.
// 타입스크립트에서 함수로 감싸면 타입 추론이 가능해지므로 훨신 편해지는 것이 많습니다.
// 컴포넌트 props 타입만 넘길 수 있도록 2차 함수로 작성하였습니다.
function makePageComponent<propsT>(Component: React.FC<propsT>) {
  // description function 방식 ts-ignore 안쓰고 어떻게 만드냐...ㅠ_ㅠ
  // 함수안에서는 PageComponent.path으로 넣어줘도 타입이 안먹음....
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const PageComponent: PageComponent<propsT> = Component
  PageComponent.type = 'Page'

  return function <pathT extends string>(path: pathT) {
    PageComponent.path = path

    Object.freeze(PageComponent)
    return PageComponent as PageComponent<propsT, pathT>
  }
}

function makeUiComponent<propsT>(Component: React.FC<propsT>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const UiComponent: UiComponent<propsT> = Component
  UiComponent.type = 'UI'

  return function <hooksT, utilsT>(props: { hooks?: hooksT; utils?: utilsT }) {
    UiComponent.hooks = props.hooks
    UiComponent.utils = props.utils

    Object.freeze(UiComponent)
    return UiComponent as UiComponent<propsT, hooksT, utilsT>
  }
}

type LessonProps = {
  type: 'student' | 'grade' | 'lesson-class'
}
const LessonPage = makePageComponent<LessonProps>(({ type, children }) => (
  <div>
    <span className="type">{type}</span>
    {children}
  </div>
))('/lesson-class')

isPageComponent(LessonPage) /*?*/ // true

type ButtonProps = {
  color: React.CSSProperties['color']
}

// utils안에 들어가는 타입도 다 정확히 추론함.
const Button = makeUiComponent<ButtonProps>(({ color, children }) => (
  <button color={color}>{children}</button>
))({
  utils: {
    onDelayButtonRightClick: (timeout: number) => {
      // ...code
    },
  } as const,
})

isUiComponent(Button) /*?*/ // true

const Wrap = () => {
  // 타입추론 잘 함
  Button.utils.onDelayButtonRightClick(1000)
  return (
    <div>
      <LessonPage type="lesson-class">
        <h2>lesson</h2>
        <Button color="black">버튼</Button>
      </LessonPage>
    </div>
  )
}
