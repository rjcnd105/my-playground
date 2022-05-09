### 용어 (목차)
<font size="2" color="#888">용어의 코드는 전부 example</font>


**constructors:** 다른 유형에서 해당 유형으로의 변환, 또는 lifting  ```B<A> -> F<A>```, ```A -> F<A>```  
**combinators:** 유형 타입 결합자들  ```F<A> + F<B> -> F<A | B>```  
**destructors:** 유형 타입을 벗김 ```F<A> -> A```  
**instances:** 유형의 특징적인 함수들


---
### 메소드
**map:** 함수를 받아 유형 내의 값에 적용시킴 - Functor의 구현  
**ap:** 유형 내에 함수를 받아 값에 적용시킴 map의 역순과도 같음 - Apply의 구현  
**of:** lifting, Functor로 들어 올림 - Pointed의 구현  
**chain:** 현재 유형으로부터 함수를 거쳐 현재 유형을 리턴함. map, ap와 같이 값이(ex: Either의 left) 통과하지 않으므로 통합적인 재처리에 유용 - Chain의 구현  
**Do:** 해당 유형의 빈 값을 생성.[ Monad를 chain하는 자기 사상을 사용할때 sugar 역할로 많이 쓰임.](https://gcanti.github.io/fp-ts/guides/do-notation.html)


---
### 접미사 
**W:** Less strict version  
**S:**   
**K:**  
**T:**    
**C:** Curry의 약어


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
T: ```Left<E> | Right<A>```

**Reader&lt;R, A&gt;**  
[Dependence Injector로 많이 사용됌](https://dev.to/gcanti/getting-started-with-fp-ts-reader-1ie5)  
DI인데, Lazy한 DI이다.  
미리 값을 가질 필요 없이 미래에 이 값을 줄 것이다. 라는 의미   
```R -> A```

**Magma&lt;A&gt;**  
유형 결합자  
내부에 ```concat(a1: A, a2: A) -> A```를 가지고 있음

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
IO<void>처럼 쓰면 리턴하지 않는 side effect를 실행한다는 것. (ex: localStorage set, console.log, dom write 작업)  
T: ```() -> A```


**Task&lt;A&gt;**  
비동기 작업, Lazy Promise&lt;A&gt;, Promise는 순수하지 않고 참조 불투명하여 Task라는 통으로 Promise라는 내용물을 감싼다.  
이로써 내부적으로는 side effect를 처리하지만 이를 lazy하게 처리함으로써 순수함을 얻는다.
실패가 존재하지 않는다.
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
T: ```R -> () -> Promise<Either<E, A>>```




---
### 추가 설명
**Option을 예로 Monad의 구성 함수 한번에 보기**  
of: &lt;A&gt;(a: A)  
map: &lt;A, B&gt;(fa: Option&lt;A&gt;, f: (a: A) =&gt; B)  
chain: &lt;A, B&gt;(fa: Option&lt;A&gt;, f: (a: A) =&gt; Option&lt;B&gt;)  
ap: &lt;A, B&gt;(fab: Option&lt;(a: A) =&gt; B&gt;, fa: Option&lt;A&gt;)  