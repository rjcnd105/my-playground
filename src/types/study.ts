// 타입을 추론하려면 다음과 같이 작성
type MakeTuple = <T>(v: T) => [T, T]
// 타입을 추론하지 않고 받아서 쓸 경우 다음과 같이 작성
type TypedMakeTuple<T> = (v: T) => [T, T]
// 아래는 그냥 망한 코드 (근데 컴파일 에러는 안남 -_-)
// _MakeTuple<T>와 <T>(v:T)에서의 T는 명백히 다른 T이며 _MakeTuple<T>의 T는 버려진다.
type _MakeTuple<T> = <T>(v: T) => [T, T]

type MakeTupleK = <T>(f: TypedMakeTuple<T>) => typeof f

// F<T> = (v: T) => [T, T] 처럼 되어있는 코드를 추론하게 하려면
// F = <T>(v: T) => [T, T] 형식으로 바꿔라.
// 추론하지 않고 타입을 명시하게 하려면 위와 같이 해라.


const makeTuple: MakeTuple = (v) => [v, v] // OK
const makeStringTuple: TypedMakeTuple<string> = (v) => [v, v] // OK
const makeTupleK: MakeTupleK = (f) => f

const numberTuple = makeTupleK((v: number) => [v, v])