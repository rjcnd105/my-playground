// 1. 타입을 추론하는 함수는 다음과 같이 작성
type MakeTuple = <T>(v: T) => [T, T]
const makeTuple: MakeTuple = (v) => [v, v] // OK
const tenTuple = makeTuple(10) // type: [number, number]

// 2. 타입을 선언시 명시하고 싶다면
type TypedMakeTuple<T> = (v: T) => [T, T]
const makeNumberTuple: TypedMakeTuple<number> = (v) => [v, v]
const oneTuple = makeNumberTuple(1) // type: [number, number]


// _MakeTuple은 망한 코드 (에러나 경고는 안남... 걍 주의하세요)
// _MakeTuple<T>와 <T>(v:T)에서의 T는 명백히 다른 T이며 _MakeTuple<T>의 T는 버려진다.
type _MakeTuple<T> = <T>(v: T) => [T, T]



// 위의 2가지 방법으로 충족을 할 수 없는 것이 있다.
// 바로 형태(타입클래스)는 지키면서 제네릭 인자에 대한 타입 추론은 시키는 것이다.

// 위의 1번 방식 (Error!)
// id: number처럼 확정지었는데 이는 위에서의
// R, A은 모든 타입을 받을 수 있다는 제네릭이라는 선언을 무시한 것이니 타입에러가 발생한다.
type LazyReaderPromise = <R, A>(a: R) => Promise<A>
const getTodoDataStream: LazyReaderPromise = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  if (res.status === 200) {
    return res.body
  }
  return new Error('Failed')
}

// 위의 2번 방식
// 타입을 명시해줘야하는 2번 방식은 타입추론을 할 수 없어 일일히 써줘야한다.
// LazyReaderPromise의 형식을 지키기만 하면 되는 것이라면, 이는 굉장히 불필요한 일이다.
// 타입클래스처럼 사용한다면 저 구현에 대한 R, A 타입은 상관 없는 경우가 많다.
type TypedLazyReaderPromise<R, A> = (a: R) => Promise<A>
const getTodoDataStream2: TypedLazyReaderPromise<number, ReadableStream<Uint8Array> | null | Error> =
  async (id: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    if (res.status === 200) {
      return res.body
    }
    return new Error('Failed')
  }

// 3번 방식 (new!)
// identity function
// 형태를 유지하면서 제네릭 인자 타입 추론을 시키려면 이 3번째 방법이 필요하다.
const lazyReaderPromise = <R, A>(lrp: TypedLazyReaderPromise<R, A>) => lrp
const getTodoDataStream3 = lazyReaderPromise(async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  if (res.status === 200) {
    return res.body
  }
  return new Error('Failed')
}) // TypedLazyReaderPromise<number, ReadableStream<Uint8Array> | null | Error> 로 타입을 잘 추론한다.





// F<T> = (v: T) => [T, T] 처럼 되어있는 코드를 추론하게 하려면
// F = <T>(v: T) => [T, T] 형식으로 바꿔라.
// 추론하지 않고 타입을 명시하게 하려면 위와 같이 해라.



const makeStringTuple: TypedMakeTuple<string> = (v) => [v, v] // OK
// const makeTupleK: MakeTupleK = (f) => f

