
<%@ page language="java" contentType= "text/html; charset=UTF-8" 
	pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>



    
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
<title>로그인</title>
	<link rel="stylesheet" href="${contextPath}/resources/css/main.css">
    <script src="https://kit.fontawesome.com/a2e8ca0ae3.js" crossorigin="anonymous"></script>

</head>
<body>
 
		<section id="section1">
		<form action="member/login" method="POST" name="login-form" onsubmit="return loginValidate()">
		 
		<table id="table1">
		<tr>
			<th><label>아이디</label></th>
		<td><input type="email" id="inputEmail" name="inputEmail" placeholder="  이메일을 입력하세요." value="${cookie.saveId.value}"></td><br>
	</tr>
		<tr>
		<th><label>비밀번호</label></th>
		<td><input type="password" id="inputPw" name="inputPw" placeholder="  비밀번호를 입력하세요." ></td><br>
		</tr>
		<tr>
		<th></th>
		<td><button>회원가입</button>
			<button>로그인</button></td>
		<td>
		</td>
	</tr>
	 <c:if test="${ !empty cookie.saveId.value}">
		<tr>
		<td></td>
                                <%-- chk 변수 생성(page scope)--%>
                                <c:set var="chk" value="checked"/>

                            </c:if>

		                    <label>
                                <!-- checked 속성 : radio/checkbox를 체크하는 속성 -->
		         <td>               <input type="checkbox" name="saveId" ${chk}  id="saveId"> 아이디 저장 </td>
		                    </label>
		         </tr>
	</table>
 
	</form>
	</section>
	
	
	
	  <!-- jQuery 라이브러리 추가 -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
   
    <!-- main.js 연결 -->
    <script src="${contextPath}/resources/js/main.js"></script>
	
</body>
</html>