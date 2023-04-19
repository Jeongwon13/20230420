console.log("main.js loaded.");

const boardFormbtn = document.getElementsByClassName("click", function() {
     if (loginMember) {
    window.location.href = "/board/boardForm";
  } else {
    // 로그인 정보가 없는 경우 권한 없음 알림 표시
    alert("로그인이 필요합니다.");
  }
});


document.getElementById("inputSearchBtn").addEventListener("click", function(){

    const input = document.getElementById("inputSearch");
 	const tbody = document.getElementById("tbody1");


    // AJAX 코드 작성(jQuery 방식) -> jQuery 라이브러리가 추가 되어 있는지 확인
    $.ajax({
        
        url : "selectOne",
        data : {"inputSearch" : input.value},
        type : "POST",
        dataType : "JSON",  // dataType : 응답데이터 형식을 지정
                            // -> "JSON"으로 지정 시 자동으로 JS 객체로 변환

        success : function(board){ 

	 
            //console.log(board); // JS 객체 형태 문자열
                                // 단, dataType : "JSON" 추가 후 -> JS 객체

            // JSON.parse(문자열) : 문자열(JSON) -> JS 객체로 변환
            //console.log(  JSON.parse(member)    ); 

            // 1) div에 작성된 내용 모두 삭제
            tbody.innerHTML = "";

            if(board != null){ // 게시글 정보 존재 O

                // 2) ul 요소 생성
                const tr = document.createElement("tr");
	
                // 3) li 요소 생성 * 5 + 내용 추가
                const td1 = document.createElement("td");
                td1.innerText = board.num;

                const td2 = document.createElement("td");
                td2.innerText = board.title;

                const td3 = document.createElement("td");
                td3.innerText = board.writer;

                const td4 = document.createElement("td");
                td4.innerText =  board.regdate;

                const td5 = document.createElement("td");
                td5.innerText = board.cnt;

                
                tr.append(td1, td2, td3, td4, td5);

               
                tbody.append(tr);

            } else { // 회원 정보 존재 X

                // 1) h4 요소 생성
                const h4 = document.createElement("h4");

                // 2) 내용 추가
                h4.innerText = "해당 게시글이 존재하지 않습니다.";

                // 3) 색 추가
                h4.style.color = "red";

                // 4) div에 추가
               	tbody.append(h4);
            }

        },
        error : function(request, status, error){
            console.log("AJAX 에러 발생");
            console.log("상태코드 : " + request.status); // 404, 500
        }
    });
});



function selectAll(){ // 회원 전체 조회 함수
    // ajax코드
    $.ajax({
        url : "boardList",
        type : "POST",
        dataType : "json",    //  응답 데이터의 형식을 "json"으로 지정
                              // -> 자동으로 JS 객체로 변환됨
        success : function( list ){
            //console.log(list);
            // list == JS 객체 배열 

            // 1) #memberList 내용 삭제
          	const tbody = document.getElementById("tbody1");
			 
            tbody.innerHTML = "";

            // 2) list를 for문을 이용해서 반복 접근
            for(let item of list){
                // item == 회원 1명의 정보가 담긴 JS 객체

                // 3) tr 요소 생성
                const tr = document.createElement("tr");

				tr.addEventListener("click", function(){
                    // 클릭한 회원의 번호를 추출하여 상세 정보 페이지 URL 생성
                  const detailUrl = "boardDetail?num=" + item.num;
                    // 상세 정보 페이지로 이동
                  window.location.href = detailUrl;
                });
	 
                // 4) td 요소 생성 + 내용 추가 * 3
                const td1 = document.createElement("td");
                td1.innerText = item.num; // 회원 번호

                const td2 = document.createElement("td");
                td2.innerText = item.title; // 회원 이메일

                const td3 = document.createElement("td");
                td3.innerText = item.writer; // 회원 닉네임

  				const td4 = document.createElement("td");
                td4.innerText =  item.regdate;

                const td5 = document.createElement("td");
                td5.innerText = item.cnt;
                
                // 5) tr요소에 td요소 3개 추가
                tr.append(td1, td2, td3, td4, td5);

                // 6) memberList에 tr 추가
                tbody.append(tr);
            }


        },
        error : function(){
            console.log("에러 발생");
        }
    });

}


// 즉시 실행 함수(속도 빠름, 변수명 중복 문제 해결)
(function(){
    selectAll(); // 함수 호출 -> 회원 목록을 먼저 조회

    //window.setInterval(함수, 딜레이(ms))
    window.setInterval(selectAll, 50000); // 10초
    // 함수 이름만 작성 -> 함수 코드가 대입
    // -> 10초마다 selectAll 함수 수행

    // setInterval()은 지연 -> 수행 -> 지연 -> 수행 ... 반복
    // --> 처음에 함수가 수행되지 않아서 공백인 상태가 있음

})();

