import { generatePath } from 'react-router'
import type { ParamParseKey } from 'react-router/lib/router'

import type { IdentifiableString } from '../types/utils'

// ParamParseKey는 :로 시작하는 동적 라우트 키 값의 이름을 뽑아온다.
// ParamParseKey<"/:userName/aaa/:blogId/edit"> -> 'userName' | 'blogId'

export type RouterPathFn<T extends string> = (
  ...params: IdentifiableString<ParamParseKey<T>> extends true
    ? [
        {
          [key in ParamParseKey<T>]: string
        }
      ]
    : []
) => string

/*
 * @example
 * const roomRouteGenerator = makePathGenerator('/:userId/:roomId/new')
 * roomRouteGenerator({ userId: "minsu", roomId: "32" })
 * // -> /minsu/32/new
 *
 * const loginRouteGenerator = makePathGenerator('/login')
 * loginRouteGenerator()
 * // -> /login
 * */
export const makePathGenerator =
  <Path extends string>(patternPath: Path): RouterPathFn<Path> =>
  (...params) =>
    generatePath(patternPath, ...params)
