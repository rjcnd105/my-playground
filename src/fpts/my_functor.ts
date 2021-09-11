/***
 * Functor
 *
 * 범주 형태를 보존한 채로 범주를 매핑한 형태
 * (a: A) => F<B> 형태로 매핑
 ***/

import * as N from 'fp-ts/number'
import * as Opt from 'fp-ts/Option'

/*
 * 두 generic function
 * f: (a: A) => B
 * g: (c: C) => D
 * 에서 f, g를 어떻게 합칠 것인가. (f∘g)
 * 광범위하면 합치기 어렵기 때문에 제약을 걸어야 한다.
 *
 * 범주론을 모델 프로그래밍으로 구현해놓은
 * morphisms을 사용하여 모델을 합성할 수 있다. (morphisms(사상)은 수학적 구조를 보존하는 함수의 개념을 추상화한 것이다. 예를 들어 집합의 사상은 임의의 함수이며, 군의 사상은 군 준동형, 위상 공간의 사상은 연속 함수이다. 범주론은 대상과 사상으로 이루어진 범주를 연구하는 분야이다.)
 * 프로그램을 합성한다는 것은 문제를 해결하는 것이다.
 * */

// pure function
// (a: A) => B
function pureFunction(a: number) {
  return `${a}`
}

// effectful function
// (a: A) => F<B>
// 여기서 F는 유형 생성자이며, 유형 생성자는 무조건 1개 이상의 인수를 받아 다른 유형을 리턴해야 한다.
function myFunction(a: string) {
  return Opt.some(a)
}

// f∘g를 하기 위에서는 제약사항이 필요하다.
// 제약사항: B = C라면?
function compose<A, B, D>(g: (b: B) => D, f: (a: A) => B): (a: A) => D {
  return (a) => g(f(a))
}

/***
 * Lift
 *
 * f: (a: A) => B 형태를
 * lift(f): (a: F<A>) => F<B> 형태로 매핑해줌
 *
 * lift: <A, B>(f: (a: A) => B) => ((fa: F<A>) => F<B>)
 * map:  <A, B>(fa: F<A>, f: (a: A) => B) => F<B>
 ***/
