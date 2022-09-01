# vanilajs_spa_todoList

Todolist SPA App

diff 알고리즘 적용해서 virtualDom <=> realDom 비교 테스트

start: npm start (usePort 5111)

## 현재 수정해야할것

- component mount시, component의 hydration이 중복해서 일어나고있음
  => 해결방법 : element compare시 unmount된 element의 event를 제거 or attribute update시 event를 그대로 유지시키기.

- updateElement과정이 각 component들에서 render될때마다 즉각적으로 일어나고있음
  => 해결방법 : virtualDom 변화는 fragmentElement에서 즉각적으로 반영하되(fragment Element는 실제 render되는 element가 되지않기때문에 reflow 개선에 효율적),
  해당 virtualDom => 실제 realDom으로의 update는 약 16ms(React가 약 그정도 주기로 state기반 갱신을 한다고 알고있음)주기로 setTimeout을 걸어서 업데이트
