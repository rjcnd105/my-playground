보기전에... **타입클래스란?**  
OOP의 클래스랑은 전혀 다른 용어이다. 타입 클래스는 ad hoc(특정한 목적을 가진) 다형성을 지원하는 타입 시스템 구조이다. [참고](https://en.wikipedia.org/wiki/Type_class)  
어떠한 형태 A에 대한 조작을 정의한 구조이다. 

타입클래스의 인스턴스는 OOP의 인스턴스와는 다른 말이다. 
여기에서의 인스턴스는 어디까지나 위에서 정의한 것 같은 타입클래스를 어느 형태에 대해서 구상화한 것이라고 생각해 주었으면 한다.

여기선 편의상 타입클래스의 인스턴스도 그냥 타입클래스라 부르겠다. 보통은 타입클래스의 인스턴스를 칭할 것이다.  
그리고 타입클래스 F에 대해 F<A>에서 A에 대한 타입을 내부 유형이라고 부르겠다.   

### 용어 (목차)
<font size="2" color="#888">용어의 코드는 전부 example</font>

**constructors:** 다른 타입클래스에서 해당 타입클래스로의 변환, 또는 lifting(pure value에서 타입클래스로 변환)  ```B<A> -> F<A>```, ```A -> F<A>```  
**combinators:** 타입클래스 내 타입 결합자  ```F<A> + F<B> -> F<A | B>```  
**destructors:** 타입클래스 유형 반환자 ```F<A> -> A```  
**instances:** 타입클래스의 특징적인 함수들


---
### 메소드  
**map:** 함수를 받아 내부에 적용시킴 - Functor의 구현  
**ap:** 타입클래스로 랩핑된 함수를 받아 내부에 적용시킴 map의 역순과도 같음 - Apply의 구현  
**flab:** map의 정확한 역순. ap는 값을 타입클래스로 받지만, flab은 바로 내부로 받음. ap의 간소화 버전인듯.  
**of:** 순수한 값을 통해 타입클래스로 lifting - Pointed의 구현  
**chain:** 현재 타입클래스로부터 함수를 거쳐 현재 타입클래스를 리턴함. map, ap와 같이 값이(ex: Either의 left) 통과하지 않으므로 통합적인 재처리에 유용 - Chain의 구현  
**chain{Monad}K:** 해당 Monad 내부를 디코딩한 값을 받아 {Monad}에 적힌 low-level을 타입클래스로 lifting함.  
**Do:** 해당 타입클래스의 빈 값을 생성.[ Monad를 chain하는 자기 사상을 사용할때 sugar 역할로 많이 쓰임.](https://gcanti.github.io/fp-ts/guides/do-notation.html)
**duplicate:** 타입클래스를 중첩시킨다.  
**alt:** 대안, 실패할 경우만 실행되며(left, none 등) 실패할 경우에 다른 Effect를 제공한다.  
**fold:** 타입클래스 내부의 값을 반환. 단, 반환 유형이 같아야 한다. (ex: none => "none", some(v) => "v: ${v}")  
**foldW:** 타입클래스 내부의 값을 반환, 반환 유형이 같을 필요가 없다. (ex: none => 0, some(v) => "v: ${v}"가 가능).  W 붙으면 전부 이런 식  
**match:** fold와의 차이는 Effect하지 않다는 것. matchE를 사용하면 fold와 같다. fold가 Effect하지 않은 타입클래스의 경우는 match와 fold가 같다.  
**apFirst, apSecond:** 두 타입클래스를 취하고 첫번째(First) 또는 두번째(Second) 유형생성자를 반환  
**sequenceArray:** 타입클래스 F에 대해 ```Array<F<A>>```를 ```F<Array<A>>``` 형태로 변환.  
**tryCatch:** 정상적인 값의 경우 성공, throw되는 경우 실패로 처리하여 타입클래스로 감싼다.    
**sequenceS:** 내부 유형을 객체(Struct)로 변환  
**sequenceT:** 내부 유형을 튜플로 변환  
**flatten:** 중첩된 타입클래스를 평탄화 한다. ```F<F<A>> -> F<A>```   
**flatMap:** map으로 유형을 타입클래스로 한번 더 감싼 후, flatten을 한 것(F<A> -> F<F<A>> -> F<A>). ```flatMap(g) ∘ f = flatten ∘ map(g) ∘ f```  

---
### 접미사 
**W:** Less strict version. 더 나은 타입 추론을 위해 사용할 수도 있음.  
**S:** Structs의 약어. 즉 내부 유형을 객체로 변환  
**K:** Kleisli의 약어. ```A -> F<B>``` 와 같은 서명을 지님   
**T:** Transformer의 약어. 모나드 변환기를 의미. 그러나 sequenceT에서의 T는 Tuple을 의미한다.     
**E:** Effect의 약어. 함수형 프로그래밍에서의 Effect는 모델링된 값을 의미한다. 즉 T가 F&lt;T&gt;처럼 F라는 모델링안에 감싸여져 있는 것을 말함. [참고](https://www.reddit.com/r/hascalator/comments/ald8qs/what_is_functional_effect/)  
**C:** Constrained의 약어. 제약을 의미함.
```typescript
const getFunctor = <E>(S: Semigroup<E>): Functor2C<"Validation", E> = { ... }
// Validation은 실패 부분에 대해 Semigroup 인스턴스를 제공하는 경우에만 Functor 인스턴스를 허용한다.
```


[//]: # (---)
[//]: # (### 접두사)


---
### 유형 설명
**Apply&lt;N...&gt;**   
```ap()```를 제공, 
인수에 함수를 적용시킴

**Functor&lt;N...&gt;**  
함수를 받아 값 매핑 ```ex: F<A> -> F<B>```
```map()```을 제공 

**Monad&lt;N...&gt;**  
자기사상 Functor Monoid.   
```chain(flatmap), of, map, ap```을 제공  
_monadic laws_(모노이드의 법칙과도 같음)  
- Left Identity: of(x).chain(f) == of(f(x))  
- Right Identity: of(x).chain(of) = of(x)  
- Associativity: of(x).chain(f).chain(g) = of(x).chain(flow(f, g))  

**Pointed<N...>**  
lifting 함수인 ```of```를 제공.

**Option&lt;A&gt;**  
있음(```Some<A>```) or 없음(```none```)  
T: ```Some<A> | None```

**Either&lt;E, A&gt;**  
실패(```left<E>```) or 성공(```right<A>```)  
```Either<never, A>``` 처럼 사용시 실패할 수 없는 Either이다.
T: ```Left<E> | Right<A>```

**Reader&lt;R, A&gt;**  
[Dependence Injector로 많이 사용됌](https://dev.to/gcanti/getting-started-with-fp-ts-reader-1ie5)  
DI인데, Lazy한 DI이다.  
미리 값을 가질 필요 없이 미래에 이 값을 줄 것이다. 라는 의미   
T: ```R -> A```

**Magma&lt;A&gt;**  
유형 결합자  
```concat(a1: A, a2: A) -> A```함수를 가지고 있음

**Semigroup&lt;A&gt;**  
Magma랑 구현이 같으나, semigroup은 Associativity(결합법칙)을 준수하는 유형  
즉 ```concat(x, concat(y, z)) === concat(concat(x, y), z)```이 성립해야 semigroup이다.

**Monoid&lt;A&gt;**  
Semigroup에 추가로 empty(항등원) 피라미터를 가지고 있다.  
concat으로 항등원을 결합하면 입력 값이 그대로 나옴을 약속한다.  
연산의 초기값의 역활로써 쓰이기도 한다. (ex: 더하기의 경우 0, 곱하기의 경우 1)

**Lazy&lt;A&gt;** (thunk라고도 함)  
동기적인 작업. side effect처리가 아닌 순수 함수의 의미  
T: ```() -> A```

**IO&lt;A&gt;**  
동기적으로 side effect를 수행한 후 결과를 돌려줌. (ex: localStorage get, dom 읽기 등)  
IO&lt;void&gt;처럼 쓰면 리턴하지 않는 side effect를 실행한다는 것. (ex: localStorage set, console.log, dom write 작업)  
T: ```() -> A```

**Task&lt;A&gt;**  
비동기 작업, Lazy Promise&lt;A&gt;, Promise는 순수하지 않고 참조 불투명하여 Task라는 통으로 Promise라는 내용물을 감싼다.  
이로써 내부적으로는 side effect를 처리하지만 이를 lazy하게 처리함으로써 순수함을 얻는다.
실패가 존재하지 않는다.  
실패가 존재하지 않음을 확실히 알고 있을 때에만 Task를 쓰며, 아닐 경우 TaskEither을 사용하라.  
T: ```() -> Promise<A>```

**TaskEither&lt;E, A&gt;**
Task + Either  
결과를 Either로 내려줌으로써 실패에 대한 처리를 할 수 있다.  
Promise처럼 참조 불투명한 실패처리가 아니라 값에 대한 처리이므로 추적이 용이하고 합성이 쉽다.  
T: ```() -> Promise<Either<E, A>>```

**ReaderIO&lt;R, A&gt;**  
Reader(DI) + IO(side effect)
부작용을 읽어 주입  
T: ```R -> () -> A```

**ReaderTask&lt;R, A&gt;**  
Reader(DI) + Task(async)
T: ```R -> () -> Promise<A>```

**ReaderTaskEither&lt;R, E, A&gt;**  
Reader(DI) + Task(async) + Either(can fail)  
이 사례가 굉장히 많아서, 일상적인 프로그래밍에 굉장히 많이 쓰임.  
Reader로 값을 주입하고 나서 TaskEither가 반환되기 때문에 이를 가지고 여러 체이닝을 할 수 있다.  
T: ```R -> () -> Promise<Either<E, A>>```




---
### Useful info, pattern

**Option Monad를 예로 Monad의 구성 함수 한번에 보기**  
of: &lt;A&gt;(a: A)  
map: &lt;A, B&gt;(fa: Option&lt;A&gt;, f: (a: A) =&gt; B)  
chain: &lt;A, B&gt;(fa: Option&lt;A&gt;, f: (a: A) =&gt; Option&lt;B&gt;)  
ap: &lt;A, B&gt;(fab: Option&lt;(a: A) =&gt; B&gt;, fa: Option&lt;A&gt;)

**flab과 ap와의 차이**
```typescript
O.ap(O.of(1))(O.some((a) => a * 2)) // { _tag: 'Some', value: 2 }
O.flap(1)(O.some((a) => a * 2)) // { _tag: 'Some', value: 2 }
```

**Option으로 보는 apS**  
```typescript
O.apS("b", O.some(1))(O.some({ a: 2 })) // { _tag: 'Some', value: { a: 2, b: 1 } }
O.apS("a", O.some(1))(O.some({ a: 2 })) // { _tag: 'Some', value: { a: 1 } }
O.apS("b", O.none)(O.some({ a: 2 })) // { _tag: 'None' }
O.apS("b", O.some(1))(O.none) // { _tag: 'None' }

// apS는 pipe를 통해 struct의 확장에 자주 쓰인다.  
pipe(
  O.Do,
  O.apS('age', O.some(3)),
  O.apS('name', O.some('gggruru'))
) // { _tag: 'Some', value: { age: 3, name: 'gggruru } }
```

**ReaderTaskEither 활용 예**
- ReaderTaskEither에서 의존성 주입에 상관 없는 TaskEither로의 사용  
```ReaderTaskEither<unknown, E, A>``` 처럼 사용하면 된다.  

```typescript
import * as RTE from 'fp-ts/lib/ReaderTaskEither'
```

- From pure value
```typescript
var myRTE1: ReaderTaskEither<unknown, never, number> = RTE.of(42)
// 이 경우 right로 받는게 타입 추론이 더 잘 됌
var myRTE1 = RTE.right(42) // ReaderTaskEither<unknown, never, number>
```

- From pure value to RTE left
```typescript
const myRTE = RTE.left({ message: 'Fail!' }) 
```

- From Task
```typescript
const myTaskA: Task<number> = () => Promise.resolve(42)
const myTaskE: Task<{ message: string }> = () =>
  Promise.resolve({ message: 'Fail' })

const myRTE1 = RTE.rightTask(myTaskA) // ReaderTaskEither<unknown, never, number>
const myRTE2 = RTE.leftTask(myTaskE) // ReaderTaskEither<unknown, { message: string }, never>
```

- From Promise
```typescript
const myTaskEitherGood: TE.TaskEither<
  { message: string },
  number
> = TE.tryCatch(
  () =>
    new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        resolve(42)
      }, 100)
    }),
  (e: any) => ({ message: 'Oops' }), // Or do some runtime inspection of `e` to try to figure out what it is :(
)

const myTaskEitherBad: TE.TaskEither<{ message: string }, number> = TE.tryCatch(
  () =>
    new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        reject('Yolo') // Promise can be rejected with any value
      }, 100)
    }),
  (e: any) => {
    return e === 'Yolo' ? { message: 'Fail' } : { message: 'I have no idea' }
  },
)
```

- map
```typescript
pipe(
  RTE.right(42),
  RTE.map((n: number) => n.toString()),
) // 
```
- apply, Applicative  
sequenceS를 사용하면 병렬, sequenceT를 사용하면 독립 작업을 시행할 수 있다.  
```typescript
const myRTE1 = RTE.right(1) 
const myRTE2 = RTE.right(2)
const myRTE3 = RTE.right(3)

const myRTEAll: ReaderTaskEither<
  unknown,
  never,
  { value1: number; value2: number; value3: number }
> = sequenceS(RTE.readerTaskEither)({
  value1: myRTE1,
  value2: myRTE2,
  value3: myRTE3,
})
```
