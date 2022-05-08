### 목차 항목
<font size="2" color="#888">목차의 코드는 전부 example</font>

**constructors:** 다른 유형에서 해당 유형으로의 변환, 또는 lifting  ```B<A> -> F<A>```, ```A -> F<A>```  
**combinators:** 유형 타입 결합자들  ```F<A> + F<B> -> F<A | B>```  
**destructors:** 유형 타입을 벗김 ```F<A> -> A```


---
### 네이밍
**map:** 유형 타입은 유지하면서 내부 값을 순회하며 변환  
**of:** lifting, Functor로 들어 올림
**Do:** 해당 유형의 빈 값을 생성


---
### 접미사 
**W:** Less strict version  
**S:**   
**K:**  
**T:**  


[//]: # (---)
[//]: # (### 접두사)


---
### 유형 설명
**Option&lt;A&gt;**  
있음(```Some<A>```) or 없음(```none```)

**Either&lt;E, A&gt;**  
실패(```left<E>```) or 성공(```right<A>```)

**Reader&lt;R, A&gt;**  
[Dependence Injector로 많이 사용됌](https://dev.to/gcanti/getting-started-with-fp-ts-reader-1ie5)  
R -> A

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

