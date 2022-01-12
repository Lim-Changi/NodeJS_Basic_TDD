# Basic NodeJS

- 독립적으로 JS Code 를 실행시킬 수 있다

<br>

- `V8 엔진`을 사용한다
  - JS Code 를 해석하여 실행시켜주는 도구

<br>

- `Event 기반의 Non Blocking - Single Thread 비동기 I/O Framework`

  - Client 에서 NodeJS 서버에 요청을 보내면 요청을 Event로 만들어서 Event Queue에 담아서 처리한다
  - Event Loop 가 Event Queue에 담긴 요청을 하나씩 처리한다 (Single Thread)
  - 처리된 요청을 Client 에게 Return
  - 처리가 오래걸리는 요청(Blocking 작업)은 EventLoop 가 처리하지 않음
    - <u>Blocking 작업</u> -> `I/O Intensive` (DNS, FileSystem), `CPU Intensive` (Crypto, Zlib)
    - 다른 Thread Pool (libuv) 혹은 OS Kernel 에게 위임하여 비동기 처리함 -> off loading
    - 완료되면 결과를 Event Queue 에 다시 전달
  - 참고 - [공식문서](https://nodejs.org/ko/docs/guides/event-loop-timers-and-nexttick/) + [블로그](https://darrengwon.tistory.com/953)

<br>

- `CommonJS` 로 구현한 Module 시스템
  - 파일형태로 모듈을 관리할 수 있도록 함
