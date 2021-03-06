
	function offer(offerdata) {
	
		reset();
		
		var focusset = '';
		
		focusset += '<a data-target="#focus1" class="focuspoint">1.반경내 상가정보</a>';
		focusset += '<a data-target="#focus2" class="focuspoint">2.주중 매출비교</a>';
		focusset += '<a data-target="#focus3" class="focuspoint">3.시간대별 매출비교</a>';
		focusset += '<a data-target="#focus4" class="focuspoint">4.성별간 매출비교</a>';
		focusset += '<a data-target="#focus5" class="focuspoint">5.연령대별 매출비교</a>';
		
		$('#focustable').html(focusset);
		
		$(function() {		

			$.ajax({
				url : 'selectoffer',
				type : 'get',
				data : {
				'sigungu_cd' : offerdata.sigungu_cd,
				'sales_divison_s_cd' : offerdata.sales_divison_s_cd
				},
				success : function(res) {
					var ctprvnCd = 11;
					
					
					byregion(500,offerdata.cx,offerdata.cy,offerdata.indsLclsCd,offerdata.indsMclsCd,offerdata.indsSclsCd,offerdata.ctprvnCd,offerdata.indeSclsNm);
					bringshop(500,offerdata.cx,offerdata.cy,offerdata.indsLclsCd,offerdata.indsMclsCd,offerdata.indsSclsCd)
					tableset();
					selectoffer(res);
					mvswsales(res);
					agesales(res);
					mapsosa();
				},
				error : function(res) {
					alert('error');
				}
			});	
		
			$(".focuspoint").click(function(){
				var scrollPosition = $($(this).attr("data-target")).offset().top;
				
				$("body").animate({
					scrollTop : scrollPosition
				}, 500);
				
			});
			
	});
		
		function tableset() {
			var tablereset = '<br>';
			tablereset += '<a name="focus1" class="focus" id="focus2">1.반경내 상가정보</a><br>';
			tablereset +=			'<table>';
			tablereset +=			'<tr>';
			tablereset +=			'<td><div id="chart-area1" ></div></td>';
			tablereset +=			'<td><div id="chart-area2" ></div></td>';
			tablereset +=			'</tr>';
			tablereset +=			'<tr>';
			tablereset +=			'<td><div id="resulttable1"></div></td>';
			tablereset +=			'<td><div id="resulttable2"></div></td>';
			tablereset +=			'</tr>';
			tablereset +=			'<tr>';
			tablereset +=			'<td><div id="resultarea1" style="padding-left : 70px; width : 100%; font-size : 1.2em"></div></td>';
			tablereset +=			'<td><div id="resultarea2" style="padding-left : 70px; width : 100%; font-size : 1.2em; color : black"></div></td>';
			tablereset +=			'</tr>';
			tablereset +=			'</table>';
			
			tablereset += '<a name="focus1" class="focus" id="focus2">2.주중 매출비교</a><br>';
			tablereset += 			'<table >';
			tablereset += 			'<tr>';
			tablereset += 			'<td><div id="biz_month_g"></div> <!-- 평균영업개월수 그래프 --></td>';
			tablereset += 			'<td><div id="survivalRate_g"></div> <!-- 생존율 그래프 --></td>';
			tablereset += 			'</tr>';
			tablereset += 			'<tr>';
			tablereset += 			'<td><div id="biz_month_t"></div> <!-- 평균영업개월수 테이블 --></td>';
			tablereset += 			'<td><div id="survivalRate_t"></div> <!-- 생존율 테이블 --></td>';
			tablereset += 			'</tr>';
			tablereset += 			'<tr>';
			tablereset += 			'<td><div id="rate_cnt1"></div>	<!-- 주중주말금액  --></td>';
			tablereset += 			'<td><div id="rate_cnt2"></div> <!-- 요일별 금액--></td>';
			tablereset += 			'</tr>';
			tablereset += 			'<tr>';
			tablereset += 			'<td colspan="2"><div id="raterate"></div> <!-- 금액테이블 --></td>';
			tablereset += 			'</tr>';
			tablereset += 			'<tr>';
			
			tablereset += 			'<td colspan= "2">';
			tablereset +=				'<br><div id="rateexplain" style = "color : black; text-align : center; font-size : 1.3em; padding-left : 50px "></div><br><br> <!-- 금액분석 -->';
			tablereset +=			'</td>';						
									
			tablereset += 			'</tr>';
			tablereset += 			'<tr>';
			tablereset += 			'<td><div id="rate_amount1"></div> <!-- 주중주말건수 --></td>';
			tablereset += 			'<td><div id="rate_amount2"></div> <!-- 요일별 건수 --></td>';
			tablereset += 			'</tr>';
			tablereset += 			'<tr>';
			tablereset += 			'<td colspan="2"><div id="amountamount"></div> <!-- 건수테이블 & 분석 --></td>';
			tablereset += 			'</tr>';
			tablereset += 			'<tr>';
			tablereset += 			'<td colspan="2"><br><div id="amountexplain" style = "color : black; text-align : center; font-size : 1.3em; padding-left : 50px></div> <br><br> <!-- 건수분석 --></td>';
			tablereset += 			'</tr>';
			tablereset += 			'</table>';
			tablereset += '<a name="focus1" class="focus" id="focus3">3.시간대별 매출비교</a><br>';
			tablereset += '<table>';
			tablereset += '<tr>';
			tablereset += '<td><div id="salestimechart"></div></td>';
			tablereset += '<td><div id="salestime2chart"></div></td>';
			tablereset += '</tr>';
			tablereset += '</table>';				
			tablereset += '<table id="salestimetable"></table>';
			tablereset += '<table>';
			tablereset += 	'<tr>';
			tablereset += 		'<td>분석결과</td>';
			tablereset += 		'<td id="timesalesresult"></td>';
			tablereset += 	'</tr>';
			tablereset += '</table><br>';
			tablereset += '<a name="focus1" class="focus" id="focus4">4.성별간 매출비교</a><br>';
			tablereset += '<table>';
			tablereset += '<tr>';
			tablereset += '<td><div id="salesmvswchart"></div></td>';
			tablereset += '<td><div id="salesmvsw2chart"></div></td>';
			tablereset += '</tr>';
			tablereset += '</table>';	
			tablereset += '<table id="salesmvswtable"></table>';
			tablereset += '<table>';
			tablereset += 	'<tr>';
			tablereset += 		'<td>분석결과</td>';
			tablereset += 		'<td id="timemvswresult"></td>';
			tablereset += 	'</tr>';
			tablereset += '</table><br>';
			tablereset += '<a name="focus1" class="focus" id="focus5">5.연령대별 매출비교</a><br>';
			tablereset += '<table>';
			tablereset += '<tr>';
			tablereset += '<td><div id="agesaleschart"></div></td>';
			tablereset += '<td><div id="agesales2chart"></div></td>';
			tablereset += '</tr>';
			tablereset += '</table>';	
			tablereset += '<table id="agesalestable"></table>';
			tablereset += '<table>';
			tablereset += 	'<tr>';
			tablereset += 		'<td>분석결과</td>';
			tablereset += 		'<td id="agesalesresult"></td>';
			tablereset += 	'</tr>';
			tablereset += '</table>'; 				
							
			$('#defaulttable').html(tablereset);	
		
		}
		
		function selectoffer(data) {
		
			//데이터 추출
			var montharray = new Array;
			
			$(data).each(function (index,item) {
				montharray[index] = item;
			});
			
			var month1 = montharray[0];
			var month2 = montharray[1];
			var month3 = montharray[2];
			var month4 = montharray[3];
			
			//매출 변수
			var timeall1 = (month1.TIME1 + month2.TIME1 + month3.TIME1 + month4.TIME1) / 4;
			var timeall2 = (month1.TIME2 + month2.TIME2 + month3.TIME2 + month4.TIME2) / 4;
			var timeall3 = (month1.TIME3 + month2.TIME3 + month3.TIME3 + month4.TIME3) / 4;
			var timeall4 = (month1.TIME4 + month2.TIME4 + month3.TIME4 + month4.TIME4) / 4;
			var timeall5 = (month1.TIME5 + month2.TIME5 + month3.TIME5 + month4.TIME5) / 4;
			var timeall6 = (month1.TIME6 + month2.TIME6 + month3.TIME6 + month4.TIME6) / 4;
			var timeall = timeall1 + timeall2 + timeall3 + timeall4 + timeall5 + timeall6;
			var time1rate = (timeall1 / timeall) * 100;
			var time2rate = (timeall2 / timeall) * 100;
			var time3rate = (timeall3 / timeall) * 100;
			var time4rate = (timeall4 / timeall) * 100;
			var time5rate = (timeall5 / timeall) * 100;
			var time6rate = (timeall6 / timeall) * 100;
			var timeallrate = time1rate + time2rate + time3rate + time4rate + time5rate + time6rate;
			//매출건수 변수
			var timecntall1 = (month1.SALES_CNT_TIME1 + month2.SALES_CNT_TIME1 + month3.SALES_CNT_TIME1 + month4.SALES_CNT_TIME1)/4;
			var timecntall2 = (month1.SALES_CNT_TIME2 + month2.SALES_CNT_TIME2 + month3.SALES_CNT_TIME2 + month4.SALES_CNT_TIME2)/4;
			var timecntall3 = (month1.SALES_CNT_TIME3 + month2.SALES_CNT_TIME3 + month3.SALES_CNT_TIME3 + month4.SALES_CNT_TIME3)/4;
			var timecntall4 = (month1.SALES_CNT_TIME4 + month2.SALES_CNT_TIME4 + month3.SALES_CNT_TIME4 + month4.SALES_CNT_TIME4)/4;
			var timecntall5 = (month1.SALES_CNT_TIME5 + month2.SALES_CNT_TIME5 + month3.SALES_CNT_TIME5 + month4.SALES_CNT_TIME5)/4;
			var timecntall6 = (month1.SALES_CNT_TIME6 + month2.SALES_CNT_TIME6 + month3.SALES_CNT_TIME6 + month4.SALES_CNT_TIME6)/4;
			var timecntall = timecntall1 + timecntall2 + timecntall3 + timecntall4 + timecntall5 + timecntall6;
			var timecnt1rate = (timecntall1 / timecntall)*100;
			var timecnt2rate = (timecntall2 / timecntall)*100;
			var timecnt3rate = (timecntall3 / timecntall)*100;
			var timecnt4rate = (timecntall4 / timecntall)*100;
			var timecnt5rate = (timecntall5 / timecntall)*100;
			var timecnt6rate = (timecntall6 / timecntall)*100;
			var timecntallrate = timecnt1rate + timecnt2rate + timecnt3rate + timecnt4rate + timecnt5rate + timecnt6rate;
			
			//시간대별 매출액
			var timecontainer = document.getElementById('salestimechart');

				var timedata = {
				    categories: ['0 ~ 6시','6 ~ 12시','12 ~ 15시','15 ~ 18시','18 ~ 21시','21 ~ 24시'],
				    series: []
				}; 
			
			$(montharray).each(function (index, item) {
				var temp = {
			            name: (item.FIXED_MONTH + '월'),
			            data: [item.TIME1,item.TIME2,item.TIME3,item.TIME4,item.TIME5,item.TIME6]
			        }
				timedata.series.push(temp);
			});	
				
			var timeoptions = {
					
					chart: {width: 700, height: 400, title: '시간대별매출비교'},
					yAxis: {title: '매출'}
				};
					
			tui.chart.lineChart(timecontainer, timedata, timeoptions);
			
			
			//시간대별 매출건수
			var time2container = document.getElementById('salestime2chart');

			var time2data = {
			    categories: ['0 ~ 6시','6 ~ 12시','12 ~ 15시','15 ~ 18시','18 ~ 21시','21 ~ 24시'],
			    series: []
			}; 
		
			$(montharray).each(function (index, item) {
				var temp = {
		            name: (item.FIXED_MONTH + '월'),
		            data: [item.SALES_CNT_TIME1,item.SALES_CNT_TIME2,item.SALES_CNT_TIME3,item.SALES_CNT_TIME4,item.SALES_CNT_TIME5,item.SALES_CNT_TIME6]
		        }
			time2data.series.push(temp);
			});	
			
			var time2options = {
				
				chart: {width: 700, height: 400, title: '시간대별매출건수비교'},
				yAxis: {title: '매출건수'}
			};
				
			tui.chart.columnChart(time2container, time2data, time2options); 
			
			output = '';
			output+= '<caption>4개월간 시간대별 평균매출</caption>'
			output+= 		'<tr>';
			output+=			'<td rowspan="2">지역</td>';
			output+=			'<td rowspan="2">구분</td>';
			output+=		'</tr>';
			output+=		'<tr>';
			output+=			'<td>전체</td>';
			output+=			'<td>00 ~ 06시</td>';
			output+=			'<td>06 ~ 12시</td>';
			output+=			'<td>12 ~ 15시</td>';
			output+=			'<td>15 ~ 18시</td>';
			output+=			'<td>18 ~ 21시</td>';
			output+=			'<td>21 ~ 24시</td>';
			output+=		'</tr>';
			output+=		'<tr>';
			output+=			'<td rowspan="4">제1선택영역</td>';
			output+=			'<td>원</td>';
			output+=			'<td>'+ timeall.toFixed(0) +'</td>';
			output+=				'<td>'+ timeall1.toFixed(0)+'</td>';
			output+=				'<td>'+ timeall2.toFixed(0)+'</td>';
			output+=				'<td>'+ timeall3.toFixed(0)+'</td>';
			output+=				'<td>'+ timeall4.toFixed(0)+'</td>';
			output+=				'<td>'+ timeall5.toFixed(0)+'</td>';
			output+=				'<td>'+ timeall6.toFixed(0)+'</td>';
			output+=		'</tr>';
			output+=		'<tr>';
			output+=			'<td>매출비율</td>';
			output+=				'<td>'+ timeallrate.toFixed(0) +'%</td>';
			output+=				'<td>'+ time1rate.toFixed(1)+'%</td>';
			output+=				'<td>'+ time2rate.toFixed(1)+'%</td>';
			output+=				'<td>'+ time3rate.toFixed(1)+'%</td>';
			output+=				'<td>'+ time4rate.toFixed(1)+'%</td>';
			output+=				'<td>'+ time5rate.toFixed(1)+'%</td>';
			output+=				'<td>'+ time6rate.toFixed(1)+'%</td>';
			output+=			'</tr>';
			output+=		'<tr>';
			output+=			'<td>건수</td>';
			output+=			'<td>'+ timecntall.toFixed(0) +'</td>';
			output+=				'<td>'+ timecntall1.toFixed(0)+'</td>';
			output+=				'<td>'+ timecntall2.toFixed(0)+'</td>';
			output+=				'<td>'+ timecntall3.toFixed(0)+'</td>';
			output+=				'<td>'+ timecntall4.toFixed(0)+'</td>';
			output+=				'<td>'+ timecntall5.toFixed(0)+'</td>';
			output+=				'<td>'+ timecntall6.toFixed(0)+'</td>';
			output+=		'</tr>';
			output+=        '<tr>'
			output+=			'<td>매출건수비율</td>';
			output+=				'<td>'+ timecntallrate.toFixed(0) +'%</td>';
			output+=				'<td>'+ timecnt1rate.toFixed(1)+'%</td>';
			output+=				'<td>'+ timecnt2rate.toFixed(1)+'%</td>';
			output+=				'<td>'+ timecnt3rate.toFixed(1)+'%</td>';
			output+=				'<td>'+ timecnt4rate.toFixed(1)+'%</td>';
			output+=				'<td>'+ timecnt5rate.toFixed(1)+'%</td>';
			output+=				'<td>'+ timecnt6rate.toFixed(1)+'%</td>';
			output+=		'</tr>';
			
			
			$('#salestimetable').append(output);	

		//요약문 작성
		var firstresult='';
		var timeresult = '매출의 비율이 같습니다.';
		var timearray = [parseFloat(time1rate),parseFloat(time2rate),parseFloat(time3rate),parseFloat(time4rate),parseFloat(time5rate),parseFloat(time6rate)];
		var timecntarray = [parseFloat(timecnt1rate),parseFloat(timecnt2rate),parseFloat(timecnt3rate),parseFloat(timecnt4rate),parseFloat(timecnt5rate),parseFloat(timecnt6rate)];
		var timearray2 = ['00 ~ 06시', '06 ~ 12시', '12 ~ 15시', '15 ~ 18시', '18 ~ 21시', '21 ~ 24시']
		var timeflag = parseFloat(time6rate);
		var timecntflag = parseFloat(timecnt6rate);
		var timeflag2 = '21 ~ 24시';
		var timecntflag2 = '21 ~ 24시';
		
		//시간대별매출비교
		$(timearray).each(function(index,item){
			if (timeflag < item) {
				timeflag = item;
				timeflag2 = timearray2[index];
			}
		});
		$(timecntarray).each(function (index,item) {
			if (timecntflag < item) {
				timecntflag = item;
				timecntflag2 = timearray2[index];
			}
		});
		
		timeresult = timeflag2 + ' 시간대에 ' + timeflag.toFixed(1) + '%로 매출이 집중되어있습니다.';
		timeresult2 = timecntflag2 + ' 시간대에 ' + timecntflag.toFixed(1) + '%로 매출건수가 집중되어있습니다.';
		
		
		//결론
		firstresult += '제 1선택영역의 평균 시간대 매출은 ' + timeresult + '<br>';
		firstresult += '제 1선택영역의 평균 시간대 매출건수는 ' + timeresult2;
		
		$('#timesalesresult').html(firstresult);
		
		}
		
		//성별
		function mvswsales(data) {

			//데이터 추출
			var montharray = new Array;
			
			$(data).each(function (index,item) {
				montharray[index] = item;
			});
			
			var month1 = montharray[0];
			var month2 = montharray[1];
			var month3 = montharray[2];
			var month4 = montharray[3];
			
			//성별변수
			var manall = (month1.MAN + month2.MAN + month3.MAN + month4.MAN)/4;
			var womanall = (month1.WOMAN + month2.WOMAN + month3.WOMAN + month4.WOMAN)/4;
			var mvswall = manall + womanall;
			var manrate = (manall / mvswall)*100;
			var womanrate = (womanall / mvswall)*100;
			var mvswallrate = manrate + womanrate;
			
			//성별 매출 건수 변수
			var mancntall = (month1.MAN_CNT + month2.MAN_CNT + month3.MAN_CNT + month4.MAN_CNT)/4;
			var womancntall = (month1.WOMAN_CNT + month2.WOMAN_CNT + month3.WOMAN_CNT + month4.WOMAN_CNT)/4;
			var mvswcntall = mancntall + womancntall;
			var mancntrate = (mancntall / mvswcntall)*100;
			var womancntrate = (womancntall / mvswcntall)*100;
			var mvswcntallrate = mancntrate + womancntrate;
			
		//성별매출	
		var mvswcontainer = document.getElementById('salesmvswchart');

			var mvswdata = {
			    categories: ['남자','여자'],
			    series: []
			}; 
		
		$(montharray).each(function (index, item) {
			var temp = {
		            name: (item.FIXED_MONTH + '월'),
		            data: [item.MAN,item.WOMAN]
		        }
			mvswdata.series.push(temp);
		});	
			
		var mvswoptions = {
				
				chart: {width: 700, height: 400, title: '성별간매출비교'},
				yAxis: {title: '매출'}
			};
				
		tui.chart.columnChart(mvswcontainer, mvswdata, mvswoptions);
		
		//성별 건수
		var mvswcntcontainer = document.getElementById('salesmvsw2chart');

			var mvswcntdata = {
			    categories: ['남자','여자'],
			    series: []
			}; 
		
		$(montharray).each(function (index, item) {
			var temp = {
		            name: (item.FIXED_MONTH + '월'),
		            data: [item.MAN_CNT,item.WOMAN_CNT]
		        }
			mvswcntdata.series.push(temp);
		});	
			
		var mvswcntoptions = {
				
				chart: {width: 700, height: 400, title: '성별간매출건수비교'},
				yAxis: {title: '매출'}
			};
				
		tui.chart.columnChart(mvswcntcontainer, mvswcntdata, mvswcntoptions);
		
		
		output = '';
		output+= '<caption>4개월간 성별간 평균매출</caption>'
		output+= 		'<tr>';
		output+=			'<td rowspan="2">지역</td>';
		output+=			'<td rowspan="2">구분</td>';
		output+=		'</tr>';
		output+=		'<tr>';
		output+=			'<td>전체</td>';
		output+=			'<td>남자</td>';
		output+=			'<td>여자</td>';
		output+=		'</tr>';
		output+=		'<tr>';
		output+=			'<td rowspan="4">제1선택영역</td>';
		output+=			'<td>원</td>';
		output+=			'<td>'+ mvswall.toFixed(0) +'</td>';
		output+=				'<td>'+ manall.toFixed(0)+'</td>';
		output+=				'<td>'+ womanall.toFixed(0)+'</td>';
		output+=		'</tr>';
		output+=		'<tr>';
		output+=			'<td>비율</td>';
		output+=				'<td>'+ mvswallrate.toFixed(0) +'%</td>';
		output+=				'<td>'+ manrate.toFixed(1)+'%</td>';
		output+=				'<td>'+ womanrate.toFixed(1)+'%</td>';
		output+=		'</tr>';
		output+=		'<tr>';
		output+=			'<td>건수</td>';
		output+=			'<td>'+ mvswcntall.toFixed(0) +'</td>';
		output+=				'<td>'+ mancntall.toFixed(0)+'</td>';
		output+=				'<td>'+ womancntall.toFixed(0)+'</td>';
		output+=		'</tr>';
		output+=		'<tr>';
		output+=			'<td>비율</td>';
		output+=				'<td>'+ mvswcntallrate.toFixed(0) +'%</td>';
		output+=				'<td>'+ mancntrate.toFixed(1)+'%</td>';
		output+=				'<td>'+ womancntrate.toFixed(1)+'%</td>';
		output+=			'</tr>';
		 
		$('#salesmvswtable').append(output);	


		
		// 요약문 작성
		var secondresult = '';
		var mvswresult = '매출의 비율이 같습니다.';
		var mvswarray = [ parseFloat(manrate), parseFloat(womanrate) ];
		var mvswarray2 = [ '남자', '여자' ]
		var mvswflag = parseFloat(womanrate);
		var mvswflag2 = '여자';

		// 시간대별매출비교
		$(mvswarray).each(function(index, item) {
			if (mvswflag < item) {
				mvswflag = item;
				mvswflag2 = mvswarray2[index];
			}
		});

		mvswresult = mvswflag2 + '가 ' + mvswflag.toFixed(1)
				+ '%로 매출이 집중되어있습니다.';

		// 결론
		secondresult += '제 1선택영역의 평균 성별 간 매출은 ' + mvswresult;
		$('#timemvswresult').html(secondresult);
	
		
		}
		
		function agesales(data) {
			
			//데이터 추출
			var montharray = new Array;
			
			$(data).each(function (index,item) {
				montharray[index] = item;
			});
			
			var month1 = montharray[0];
			var month2 = montharray[1];
			var month3 = montharray[2];
			var month4 = montharray[3];
			
			//연령변수
			var age10 = (month1.AGESALE10 + month2.AGESALE10 + month3.AGESALE10 + month4.AGESALE10) / 4;
			var age20 = (month1.AGESALE20 + month2.AGESALE20 + month3.AGESALE20 + month4.AGESALE20) / 4;
			var age30 = (month1.AGESALE30 + month2.AGESALE30 + month3.AGESALE30 + month4.AGESALE30) / 4;
			var age40 = (month1.AGESALE40 + month2.AGESALE40 + month3.AGESALE40 + month4.AGESALE40) / 4;
			var age50 = (month1.AGESALE50 + month2.AGESALE50 + month3.AGESALE50 + month4.AGESALE50) / 4;
			var age60 = (month1.AGESALE60 + month2.AGESALE60 + month3.AGESALE60 + month4.AGESALE60) / 4;
			var ageall = age10 + age20 + age30 + age40 + age50 + age60;
			
			var age10rate = (age10 / ageall) * 100;
			var age20rate = (age20 / ageall) * 100;
			var age30rate = (age30 / ageall) * 100;
			var age40rate = (age40 / ageall) * 100;
			var age50rate = (age50 / ageall) * 100;
			var age60rate = (age60 / ageall) * 100;
			var ageallrate = age10rate + age20rate + age30rate + age40rate + age50rate + age60rate;
			
			//연령 매출 건수 변수
			var age10cnt = (month1.AGE_CNT_10 + month2.AGE_CNT_10 + month3.AGE_CNT_10 + month4.AGE_CNT_10) / 4;
			var age20cnt = (month1.AGE_CNT_20 + month2.AGE_CNT_20 + month3.AGE_CNT_20 + month4.AGE_CNT_20) / 4;
			var age30cnt = (month1.AGE_CNT_30 + month2.AGE_CNT_30 + month3.AGE_CNT_30 + month4.AGE_CNT_30) / 4;
			var age40cnt = (month1.AGE_CNT_40 + month2.AGE_CNT_40 + month3.AGE_CNT_40 + month4.AGE_CNT_40) / 4;
			var age50cnt = (month1.AGE_CNT_50 + month2.AGE_CNT_50 + month3.AGE_CNT_50 + month4.AGE_CNT_50) / 4;
			var age60cnt = (month1.AGE_CNT_60 + month2.AGE_CNT_60 + month3.AGE_CNT_60 + month4.AGE_CNT_60) / 4;
			var agecntall = age10cnt + age20cnt + age30cnt + age40cnt + age50cnt + age60cnt;
			
			var age10cntrate = (age10cnt / agecntall) * 100;
			var age20cntrate = (age20cnt / agecntall) * 100;
			var age30cntrate = (age30cnt / agecntall) * 100;
			var age40cntrate = (age40cnt / agecntall) * 100;
			var age50cntrate = (age50cnt / agecntall) * 100;
			var age60cntrate = (age60cnt / agecntall) * 100;
			var agecntallrate = age10cntrate + age20cntrate + age30cntrate + age40cntrate + age50cntrate + age60cntrate; 
			
		//연령매출	
		var agecontainer = document.getElementById('agesaleschart');

		var agedata = {
			categories : [ '10대', '20대', '30대', '40대', '50대', '60대이상'],
			series : []
		};

		$(montharray).each(function(index, item) {
			var temp = {
				name : (item.FIXED_MONTH + '월'),
				data : [ item.AGESALE10, item.AGESALE20, item.AGESALE30, item.AGESALE40, item.AGESALE50, item.AGESALE60 ]
			}
			agedata.series.push(temp);
		});

		var ageoptions = {

			chart : {
				width : 700,
				height : 400,
				title : '연령대별매출비교'
			},
			yAxis : {
				title : '매출'
			}
		};

		tui.chart.columnChart(agecontainer, agedata, ageoptions);

		//성별 건수
		var agecntcontainer = document.getElementById('agesales2chart');

		var agecntdata = {
			categories : [ '10대', '20대', '30대', '40대', '50대', '60대이상'],
			series : []
		};

		$(montharray).each(function(index, item) {
			var temp = {
				name : (item.FIXED_MONTH + '월'),
				data : [ item.AGE_CNT_10, item.AGE_CNT_20, item.AGE_CNT_30, item.AGE_CNT_40, item.AGE_CNT_50, item.AGE_CNT_60 ]
			}
			agecntdata.series.push(temp);
		});

		var agecntoptions = {

			chart : {
				width : 700,
				height : 400,
				title : '연령대매출건수비교'
			},
			yAxis : {
				title : '매출'
			}
		};

		tui.chart.columnChart(agecntcontainer, agecntdata, agecntoptions);

		output = '';
		output += '<caption>4개월간 연령대별 평균매출</caption>'
		output += '<tr>';
		output += '<td rowspan="2">지역</td>';
		output += '<td rowspan="2">구분</td>';
		output += '</tr>';
		output += '<tr>';
		output += '<td>전체</td>';
		output += '<td>10대</td>';
		output += '<td>20대</td>';
		output += '<td>30대</td>';
		output += '<td>40대</td>';
		output += '<td>50대</td>';
		output += '<td>60대</td>';
		output += '</tr>';
		output += '<tr>';
		output += '<td rowspan="4">제1선택영역</td>';
		output += '<td>원</td>';
		output += '<td>' + ageall.toFixed(0) + '</td>';
		output += '<td>' + age10.toFixed(0) + '</td>';
		output += '<td>' + age20.toFixed(0) + '</td>';
		output += '<td>' + age30.toFixed(0) + '</td>';
		output += '<td>' + age40.toFixed(0) + '</td>';
		output += '<td>' + age50.toFixed(0) + '</td>';
		output += '<td>' + age60.toFixed(0) + '</td>';
		output += '</tr>';
		output += '<tr>';
		output += '<td>비율</td>';
		output += '<td>' + ageallrate.toFixed(0) + '%</td>';
		output += '<td>' + age10rate.toFixed(1) + '%</td>';
		output += '<td>' + age20rate.toFixed(1) + '%</td>';
		output += '<td>' + age30rate.toFixed(1) + '%</td>';
		output += '<td>' + age40rate.toFixed(1) + '%</td>';
		output += '<td>' + age50rate.toFixed(1) + '%</td>';
		output += '<td>' + age60rate.toFixed(1) + '%</td>';
		output += '</tr>';
		output += '<tr>';
		output += '<td>건수</td>';
		output += '<td>' + agecntall.toFixed(0) + '</td>';
		output += '<td>' + age10cnt.toFixed(0) + '</td>';
		output += '<td>' + age20cnt.toFixed(0) + '</td>';
		output += '<td>' + age30cnt.toFixed(0) + '</td>';
		output += '<td>' + age40cnt.toFixed(0) + '</td>';
		output += '<td>' + age50cnt.toFixed(0) + '</td>';
		output += '<td>' + age60cnt.toFixed(0) + '</td>';
		output += '</tr>';
		output += '<tr>';
		output += '<td>비율</td>';
		output += '<td>' + agecntallrate.toFixed(0) + '%</td>';
		output += '<td>' + age10cntrate.toFixed(1) + '%</td>';
		output += '<td>' + age20cntrate.toFixed(1) + '%</td>';
		output += '<td>' + age30cntrate.toFixed(1) + '%</td>';
		output += '<td>' + age40cntrate.toFixed(1) + '%</td>';
		output += '<td>' + age50cntrate.toFixed(1) + '%</td>';
		output += '<td>' + age60cntrate.toFixed(1) + '%</td>';
		output += '</tr>';

		$('#agesalestable').append(output);

		// 요약문 작성
		var secondresult = '';
		var ageresult = '매출의 비율이 같습니다.';
		var ageresult2 = '매출건수 비율이 같습니다.';
		var agearray = [ parseFloat(age10rate), parseFloat(age20rate), parseFloat(age30rate), parseFloat(age40rate), parseFloat(age50rate), parseFloat(age60rate)];
		var agecntarray = [ parseFloat(age10cntrate), parseFloat(age20cntrate), parseFloat(age30cntrate), parseFloat(age40cntrate), parseFloat(age50cntrate), parseFloat(age60cntrate)];
		var agearray2 = [ '10대', '20대', '30대', '40대', '50대', '60대' ]
		var ageflag = parseFloat(age60rate);
		var ageflag2 = '60대';
		var agecntflag = parseFloat(age60cntrate);
		var agecntflag2 = '60대';

		// 시간대별매출비교
		$(agearray).each(function(index, item) {
			if (ageflag < item) {
				ageflag = item;
				ageflag2 = agearray2[index];
			}
		});
		
		$(agecntarray).each(function(index, item){
			if (agecntflag < item) {
				agecntflag = item;
				agecntflag2 = agearray2[index];
			}
		});
		
		ageresult = ageflag2 + '가 ' + ageflag.toFixed(1) + '%로 매출이 집중되어있습니다.';
		
		ageresult = agecntflag2 + '가' + agecntflag.toFixed(1) + '%로 매출건수가 집중되어있습니다.';
		
		// 결론
		secondresult += '제 1선택영역의 평균 연령대 간 매출은 ' + ageresult;
		$('#agesalesresult').html(secondresult);

	}
		
	function mapsosa () {
		
		$.ajax({
			url : 'mapsosa',
			type : 'get',
			data : {
				'sigungu_cd' : temp.sigungu_cd,
				'sales_divison_s_cd' : temp.sales_divison_s_cd
			},
			success : function(resp) {
				avgBizMonthG(resp);
				avgBizMonthT(resp);
				survivalRateG(resp);
				survivalRateT(resp);
				rate_cnt(resp);
				rate_cnt_dow(resp);
				raterate(resp);
				rate_amount(resp);
				rate_amount_dow(resp);
				amountamount(resp);
			},
			error : function() {
				alert('에러');
			}

		});
		
	}
	

	// 평균 영업 개월수 - 그래프
	function avgBizMonthG(resp) {
		
			var montharray = new Array;

			$(resp).each(function(index, item) {
				montharray[index] = item;
			});

			var month1 = montharray[3];
			var month2 = montharray[2];
			var month3 = montharray[1];
			var month4 = montharray[0];

			var container = document.getElementById('biz_month_g');
			var data = {
				categories : [ '2018년 ' + month1.FIXED_MONTH + '월',
						'2018년 ' + month2.FIXED_MONTH + '월',
						'2018년 ' + month3.FIXED_MONTH + '월',
						'2018년 ' + month4.FIXED_MONTH + '월' ],
				series : [ {
					name : '평균 영업 개월수',
					data : [  Math.round(month1.AVG_BIZ_MONTH), Math.round(month2.AVG_BIZ_MONTH),
						Math.round(month3.AVG_BIZ_MONTH), Math.round(month4.AVG_BIZ_MONTH) ]
				} ]
			};
			var options = {
				chart : {
					width : 700,
					height : 400,
					title : '평균 영업 개월 수',
					format : '1,000'
				},
				yAxis : {
					title : '개월 수'
				},
				xAxis : {
					title : 'Month'
				},
				legend : {
					align : 'top'
				}
			};
			var theme = {
				series : {
					colors : [ '#83b14e', '#458a3f', '#295ba0', '#2a4175',
							'#289399', '#289399', '#617178', '#8a9a9a',
							'#516f7d', '#dddddd' ]
				}
			};
			// For apply theme
			// tui.chart.registerTheme('myTheme', theme);
			// options.theme = 'myTheme';
			tui.chart.lineChart(container, data, options);

		}
		
	
		//평균 영업 개월수 - 테이블
		function avgBizMonthT(resp){
			
			var montharray = new Array;

			$(resp).each(function(index, item) {
				montharray[index] = item;
			});

			var month1 = montharray[3];
			var month2 = montharray[2];
			var month3 = montharray[1];
			var month4 = montharray[0];

			var container = document.getElementById('biz_month_t');
			var table = '';

			
			table += '<h5>평균 영업 개월 수</h5>';
			table += '<br>';
			table += '<table class = "table" >';
			table += '<tr>';
			table += '<th>기간</th>';
			table += '<td>' + month1.FIXED_MONTH +'월' + '</td>';
			table += '<td>' + month2.FIXED_MONTH +'월' + '</td>';
			table += '<td>' + month3.FIXED_MONTH +'월' + '</td>';
			table += '<td>' + month4.FIXED_MONTH +'월' + '</td>';
			table += '</tr>';
			table += '<tr>';
			table += '<td>개월</td>';
			table += '<td>' + Math.round(month1.AVG_BIZ_MONTH) + '</td>';
			table += '<td>' + Math.round(month2.AVG_BIZ_MONTH) + '</td>';
			table += '<td>' + Math.round(month3.AVG_BIZ_MONTH) + '</td>';
			table += '<td>' + Math.round(month4.AVG_BIZ_MONTH) + '</td>';
			table += '</tr>';
			table += '</table>';

			$('#biz_month_t').html(table);
		}
	
		
		
	// 생존율 - 그래프
	function survivalRateG(resp) {
	var montharray = new Array;
	
	$(resp).each(function(index, item){
		montharray[index] = item;
	});
	
	var month1 = montharray[3];
	var month2 = montharray[2];
	var month3 = montharray[1];
	var month4 = montharray[0];
	
	var container = document.getElementById('survivalRate_g');
	var data = {
	    categories: [month1.FIXED_MONTH, month2.FIXED_MONTH, month3.FIXED_MONTH, month4.FIXED_MONTH],
	    series:  [
	    	{
	    	name : '1년 이하',
	    	data : [month1.LESSONEYEAR,month2.LESSONONEYEAR,month3.LESSONEYEAR,month4.LESSONEYEAR]
	    },
	    {
	    	name : '1~2년',
	    	data : [month1.TWOYEAR,month2.TWOYEAR,month3.TWOYEAR,month4.TWOYEAR]
	    },
	    {
	    	name : '2~3년',
	    	data : [month1.THREEYEAR,month2.THREEYEAR,month3.THREEYEAR,month4.THREEYEAR]
	    },
	    {
	    	name : '3~4년',
	    	data : [month1.FOURYEAR,month2.FOURYEAR,month3.FOURYEAR,month4.FOURYEAR]
	    },
	    {
	    	name : '5년이상',
	    	data : [month1.OVERFIVEYEAR,month2.OVERFIVEYEAR,month3.OVERFIVEYEAR,month4.OVERFIVEYEAR]
	    }
	    ]
	};

	var options = {
	    chart: {
	        width: 700,
	        height: 400,
	        title: '생존율'
	    },
	    yAxis: {
	        title: 'Month'
	    },
	    xAxis: {
	        title: 'Amount'
	    },
	    series: {
	        stackType: 'normal'
	    }
	};
	var theme = {
	    series: {
	        colors: [
	            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
	            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
	        ]
	    }
	};

	// For apply theme

	// tui.chart.registerTheme('myTheme', theme);
	// options.theme = 'myTheme';

	tui.chart.barChart(container, data, options);
}
	
	
	//생존율 - 테이블
	function survivalRateT(resp){
		var montharray = new Array;
		
		$(resp).each(function(index, item){
			montharray[index] = item;
		});
		
		var month1 = montharray[3];
		var month2 = montharray[2];
		var month3 = montharray[1];
		var month4 = montharray[0];
		
		var container = document.getElementById('survivalRate_t');
		
		table = '';
		table += '<h5>생존율</h5><br>';
		table += '<table class ="table">';
		
		table += '<tr>';
		table += '<td>개월/생존기간</td>';
		table += '<td>1년 이하</td>';
		table += '<td>1~2년</td>';
		table += '<td>2~3년</td>';
		table += '<td>3~4년</td>';
		table += '<td>5년 이상</td>';
		table += '</tr>';
		table += '<tr>';
		table += '<td>'+ month1.FIXED_MONTH +'</td>';
		table += '<td>'+ month1.LESSONEYEAR +'</td>';
		table += '<td>'+ month1.TWOYEAR +'</td>';
		table += '<td>'+ month1.THREEYEAR + '</td>';
		table += '<td>'+ month1.FOURYEAR +'</td>';
		table += '<td>'+ month1.OVERFIVEYEAR +'</td>';
		table += '</tr>';
		table += '<tr>';
		table += '<td>'+ month2.FIXED_MONTH +'</td>';
		table += '<td>'+ month2.LESSONEYEAR +'</td>';
		table += '<td>'+ month2.TWOYEAR +'</td>';
		table += '<td>'+ month2.THREEYEAR + '</td>';
		table += '<td>'+ month2.FOURYEAR +'</td>';
		table += '<td>'+ month2.OVERFIVEYEAR +'</td>';
		table += '</tr>';
		table += '<tr>';
		table += '<td>'+ month3.FIXED_MONTH +'</td>';
		table += '<td>'+ month3.LESSONEYEAR +'</td>';
		table += '<td>'+ month3.TWOYEAR +'</td>';
		table += '<td>'+ month3.THREEYEAR + '</td>';
		table += '<td>'+ month3.FOURYEAR +'</td>';
		table += '<td>'+ month3.OVERFIVEYEAR +'</td>';
		table += '</tr>';
		table += '<tr>';
		table += '<td>'+ month4.FIXED_MONTH +'</td>';
		table += '<td>'+ month4.LESSONEYEAR +'</td>';
		table += '<td>'+ month4.TWOYEAR +'</td>';
		table += '<td>'+ month4.THREEYEAR + '</td>';
		table += '<td>'+ month4.FOURYEAR +'</td>';
		table += '<td>'+ month4.OVERFIVEYEAR +'</td>';
		table += '</tr>';
		table += '</table>';

		$('#survivalRate_t').html(table);
	}

	//주중 주말 매출건수
	function rate_cnt(resp) {
		
		var montharray = new Array;

		$(resp).each(function(index, item) {
			montharray[index] = item;
		});

		var month1 = montharray[3];
		var month2 = montharray[2];
		var month3 = montharray[1];
		var month4 = montharray[0];

		//4개월간 평균 주중 건수 
		var weektotal1 = (month1.SALES_CNT_MON + month1.SALES_CNT_TUE
				+ month1.SALES_CNT_WED + month1.SALES_CNT_THU + month1.SALES_CNT_FRI);
		var weektotal2 = (month2.SALES_CNT_MON + month2.SALES_CNT_TUE
				+ month2.SALES_CNT_WED + month2.SALES_CNT_THU + month2.SALES_CNT_FRI);
		var weektotal3 = (month3.SALES_CNT_MON + month3.SALES_CNT_TUE
				+ month3.SALES_CNT_WED + month3.SALES_CNT_THU + month3.SALES_CNT_FRI);
		var weektotal4 = (month4.SALES_CNT_MON + month4.SALES_CNT_TUE
				+ month4.SALES_CNT_WED + month4.SALES_CNT_THU + month4.SALES_CNT_FRI);

		//4개월간 평균 주말 건수
		var weekendtotal1 = (month1.SALES_CNT_SAT + month1.SALES_CNT_SUN);
		var weekendtotal2 = (month2.SALES_CNT_SAT + month2.SALES_CNT_SUN);
		var weekendtotal3 = (month3.SALES_CNT_SAT + month3.SALES_CNT_SUN);
		var weekendtotal4 = (month4.SALES_CNT_SAT + month4.SALES_CNT_SUN);

		var container = document.getElementById('rate_cnt1');
		var data = {
			categories : [ month1.FIXED_MONTH, month2.FIXED_MONTH,
					month3.FIXED_MONTH, month4.FIXED_MONTH ],
			series : [
					{
						name : '주중건수',
						data : [ weektotal1, weektotal2, weektotal3,
								weektotal4 ]
					},
					{
						name : '주말건수',
						data : [ weekendtotal1, weekendtotal2,
								weekendtotal3, weekendtotal4 ]
					} ]
		};
		var options = {
			chart : {
				width : 700,
				height : 400,
				title : '주중, 주말 건수',
				format : '1,000'
			},
			yAxis : {
				title : 'Amount',
				min : 0,
				max : 2000
			},
			xAxis : {
				title : 'Month'
			},
			legend : {
				align : 'top'
			}
		};
		var theme = {
			series : {
				colors : [ '#83b14e', '#458a3f', '#295ba0', '#2a4175',
						'#289399', '#289399', '#617178', '#8a9a9a', '#516f7d',
						'#dddddd' ]
			}
		};
		// For apply theme
		// tui.chart.registerTheme('myTheme', theme);
		// options.theme = 'myTheme';
		tui.chart.columnChart(container, data, options);
	}

	//요일별 매출건수
	function rate_cnt_dow(resp) {
		var montharray = new Array;

		$(resp).each(function(index, item) {
			montharray[index] = item;
		});
		
		var month1 = montharray[3];
		var month2 = montharray[2];
		var month3 = montharray[1];
		var month4 = montharray[0];
		
		var container = document.getElementById('rate_cnt2');
		var data = {
		    categories: ['일', '월', '화', '수', '목', '금', '토'],
		    series: [
		        {
		            name: (month1.FIXED_MONTH + '월'),
		            data: [month1.SALES_CNT_SUN, month1.SALES_CNT_MON, month1.SALES_CNT_TUE, month1.SALES_CNT_WED, month1.SALES_CNT_THU, month1.SALES_CNT_FRI, month1.SALES_CNT_SAT]
		        },
		        {
		            name: (month2.FIXED_MONTH + '월'),
		            data: [month2.SALES_CNT_SUN, month2.SALES_CNT_MON, month2.SALES_CNT_TUE, month2.SALES_CNT_WED, month2.SALES_CNT_THU, month2.SALES_CNT_FRI, month2.SALES_CNT_SAT]
		        },
		        {
		            name: (month3.FIXED_MONTH + '월'),
		            data: [month3.SALES_CNT_SUN, month3.SALES_CNT_MON, month3.SALES_CNT_TUE, month3.SALES_CNT_WED, month3.SALES_CNT_THU, month3.SALES_CNT_FRI, month3.SALES_CNT_SAT]
		        },
		        {
		        	name : (month4.FIXED_MONTH + '월'),
		            data: [month4.SALES_CNT_SUN, month4.SALES_CNT_MON, month4.SALES_CNT_TUE, month4.SALES_CNT_WED, month4.SALES_CNT_THU, month4.SALES_CNT_FRI, month4.SALES_CNT_SAT]
		        }
		    ]
		};
		var options = {
		    chart: {
		        width: 700,
		        height: 400,
		        title: '요일별 건수'
		    },
		    yAxis: {
		        title: '건',
		    },
		    xAxis: {
		        title: 'Month',
		        pointOnColumn: true,
		        dateFormat: 'MMM',
		        tickInterval: 'auto'
		    },
		    series: {
		        showDot: false,
		        zoomable: true
		    },
		    tooltip: {
		        suffix: '건'
		    },
		    plot: {
		        bands: [
		            {
		                range: ['03/01/2016', '05/01/2016'],
		                color: 'gray',
		                opacity: 0.2
		            }
		        ],
		        lines: [
		            {
		                value: '03/01/2016',
		                color: '#fa2828'
		            }
		        ]
		    }
		};
		var theme = {
		    series: {
		        colors: [
		            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
		            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
		        ]
		    }
		};
		// For apply theme
		// tui.chart.registerTheme('myTheme', theme);
		// options.theme = 'myTheme';
		var chart = tui.chart.lineChart(container, data, options);
	}

	//건수비율테이블
	function raterate(resp) {
		
		var montharray = new Array;

		$(resp).each(function(index, item) {
			montharray[index] = item;
		});

		var month1 = montharray[3];
		var month2 = montharray[2];
		var month3 = montharray[1];
		var month4 = montharray[0];
		
		//요일별 건수 총합
		var mon = (month1.SALES_CNT_MON + month2.SALES_CNT_MON
				+ month3.SALES_CNT_MON + month4.SALES_CNT_MON);
		var tue = (month1.SALES_CNT_TUE + month2.SALES_CNT_TUE
				+ month3.SALES_CNT_TUE + month4.SALES_CNT_TUE);
		var wed = (month1.SALES_CNT_WED + month2.SALES_CNT_WED
				+ month3.SALES_CNT_WED + month4.SALES_CNT_WED);
		var thu = (month1.SALES_CNT_THU + month2.SALES_CNT_THU
				+ month3.SALES_CNT_THU + month4.SALES_CNT_THU);
		var fri = (month1.SALES_CNT_FRI + month2.SALES_CNT_FRI
				+ month3.SALES_CNT_FRI + month4.SALES_CNT_FRI);
		var sat = (month1.SALES_CNT_SAT + month2.SALES_CNT_SAT
				+ month3.SALES_CNT_SAT + month4.SALES_CNT_SAT);
		var sun = (month1.SALES_CNT_SUN + month2.SALES_CNT_SUN
				+ month3.SALES_CNT_SUN + month4.SALES_CNT_SUN);

		var weekall = (mon + tue + wed + thu + fri + sat + sun);
		var onweek = (mon + tue + wed + thu + fri);
		var weekend = (sat + sun);
		var monrate = ((mon / weekall)*100);
		var tuerate = ((tue / weekall)*100);
		var wedrate = ((wed / weekall)*100);
		var thurate = ((thu / weekall)*100);
		var frirate = ((fri / weekall)*100);
		var satrate = ((sat / weekall)*100);
		var sunrate = ((sun / weekall)*100);
		var weekallrate = (monrate + tuerate + wedrate + thurate + frirate + satrate + sunrate);
		var onweekrate = (monrate + tuerate + wedrate + thurate + frirate);
		var weekendrate = (satrate + sunrate);
		
		
		var output = '';
		output+= '<h5>4개월간 평균 매출건수</h5>';
		output+= '<br><table class = "table" style="width : 100%; text-align : center; font-size : 1.2em">';
		
		output+= 		'<tr>';
		output+=			'<td rowspan="2">지역</td>';
		output+=			'<td rowspan="2">구분</td>';
		output+=			'<td colspan="3">주중/주말</td>';
		output+=			'<td colspan="7">요일별</td>';
		output+=		'</tr>';
		output+=		'<tr>';
		output+=			'<td>전체</td>';
		output+=			'<td>주중</td>';
		output+=			'<td>주말</td>';
		output+=			'<td>일</td>';
		output+=			'<td>월</td>';
		output+=			'<td>화</td>';
		output+=			'<td>수</td>';
		output+=			'<td>목</td>';
		output+=			'<td>금</td>';
		output+=			'<td>토</td>';
		output+=		'</tr>';
		output+=		'<tr>';
		output+=			'<td rowspan="2">제1선택영역</td>';
		output+=			'<td>건</td>';
		output+=			'<td>'+ weekall.toFixed(0) +'</td>';
		output+=			'<td>'+ onweek.toFixed(0) +'</td>';
		output+=			'<td>'+ weekend.toFixed(0) +'</td>';
		output+=				'<td>'+ sun.toFixed(0)+'</td>'; 
		output+=				'<td>'+ mon.toFixed(0)+'</td>';
		output+=				'<td>'+ tue.toFixed(0)+'</td>';
		output+=				'<td>'+ wed.toFixed(0)+'</td>';
		output+=				'<td>'+ thu.toFixed(0)+'</td>';
		output+=				'<td>'+ fri.toFixed(0)+'</td>';
		output+=				'<td>'+ sat.toFixed(0)+'</td>';
		output+=		'</tr>';
		output+=		'<tr>';
		output+=			'<td>비율</td>';
		output+=			'<td>' + weekallrate.toFixed(1) + '%</td>';
		output+=			'<td>'+ onweekrate.toFixed(1)+'%</td>';
		output+=			'<td>'+ weekendrate.toFixed(1)+'%</td>';
		output+=				'<td>'+ sunrate.toFixed(1)+'%</td>';
		output+=				'<td>'+ monrate.toFixed(1)+'%</td>';
		output+=				'<td>'+ tuerate.toFixed(1)+'%</td>';
		output+=				'<td>'+ wedrate.toFixed(1)+'%</td>';
		output+=				'<td>'+ thurate.toFixed(1)+'%</td>';
		output+=				'<td>'+ frirate.toFixed(1)+'%</td>';
		output+=				'<td>'+ satrate.toFixed(1)+'%</td>';
		output+=			'</tr>';
		output+= 		'</table>';
		
		$('#raterate').html(output);
		
		
		//건수 분석결과 설명
		var result = '';
		var cntarray = [ parseFloat(sunrate), parseFloat(monrate), parseFloat(tuerate), parseFloat(wedrate), parseFloat(thurate), parseFloat(frirate), parseFloat(satrate),];
		var weekallarray = ['일', '월', '화', '수', '목', '금', '토'];
		var cntflag = parseFloat(sunrate);
		var cntflag2 = '일';
			
		$(cntarray).each(function(index, item) {
			if (cntflag < item) {
				cntflag = item;
				cntflag2 = weekallarray[index];
			}
		});
		
		result += '제 1 선택영역의 매출 건수는 주중이 ' + onweek.toFixed(0) +'건으로 '+ onweekrate.toFixed(1) +'%, 주말이 ' + weekend.toFixed(0) + '건으로 ' + weekendrate.toFixed(1) +'%를 차지하고 있습니다.<br>';
		result += '일주일 중 ' + cntflag2 +'요일이 ' + cntflag.toFixed(1) +'%로 가장 많은 비율을 차지하고 있습니다.';
		
		$('#rateexplain').html(result);
	}

	//주중, 주말금액 - 그래프
	function rate_amount(resp) {
		
		var montharray = new Array;

		$(resp).each(function(index, item) {
			montharray[index] = item;
		});

		var month1 = montharray[3];
		var month2 = montharray[2];
		var month3 = montharray[1];
		var month4 = montharray[0];
		
		//4개월간 평균 주중 금액
		var weektotal1 = (month1.SALES_FIGURES_MON + month1.SALES_FIGURES_TUE
				+ month1.SALES_FIGURES_WED + month1.SALES_FIGURES_THU + month1.SALES_FIGURES_FRI);
		var weektotal2 = (month2.SALES_FIGURES_MON + month2.SALES_FIGURES_TUE
				+ month2.SALES_FIGURES_WED + month2.SALES_FIGURES_THU + month2.SALES_FIGURES_FRI);
		var weektotal3 = (month3.SALES_FIGURES_MON + month3.SALES_FIGURES_TUE
				+ month3.SALES_FIGURES_WED + month3.SALES_FIGURES_THU + month3.SALES_FIGURES_FRI);
		var weektotal4 = (month4.SALES_FIGURES_MON + month4.SALES_FIGURES_TUE
				+ month4.SALES_FIGURES_WED + month4.SALES_FIGURES_THU + month4.SALES_FIGURES_FRI);

		//4개월간 평균 주말 금액
		var weekendtotal1 = (month1.SALES_FIGURES_SAT + month1.SALES_FIGURES_SUN);
		var weekendtotal2 = (month2.SALES_FIGURES_SAT + month2.SALES_FIGURES_SUN);
		var weekendtotal3 = (month3.SALES_FIGURES_SAT + month3.SALES_FIGURES_SUN);
		var weekendtotal4 = (month4.SALES_FIGURES_SAT + month4.SALES_FIGURES_SUN);

		var container = document.getElementById('rate_amount1');
		var data = {
			categories : [ month1.FIXED_MONTH, month2.FIXED_MONTH,
					month3.FIXED_MONTH, month4.FIXED_MONTH ],
			series : [
					{
						name : '주중건수',
						data : [ weektotal1, weektotal2, weektotal3,
								weektotal4 ]
					},
					{
						name : '주말건수',
						data : [ weekendtotal1, weekendtotal2,
								weekendtotal3, weekendtotal4 ]
					} ]
		};
		var options = {
			chart : {
				width : 700,
				height : 400,
				title : '주중, 주말 금액',
				format : '1,000'
			},
			yAxis : {
				title : 'Amount',
				min : 0,
				max : 30000000
			},
			xAxis : {
				title : 'Month'
			},
			legend : {
				align : 'top'
			}
		};
		var theme = {
			series : {
				colors : [ '#83b14e', '#458a3f', '#295ba0', '#2a4175',
						'#289399', '#289399', '#617178', '#8a9a9a', '#516f7d',
						'#dddddd' ]
			}
		};
		// For apply theme
		// tui.chart.registerTheme('myTheme', theme);
		// options.theme = 'myTheme';
		tui.chart.columnChart(container, data, options);
	}
	
	
	// 요일별 금액 - 그래프
	function rate_amount_dow(resp) {
		var montharray = new Array;

		$(resp).each(function(index, item) {
			montharray[index] = item;
		});
		
		var month1 = montharray[3];
		var month2 = montharray[2];
		var month3 = montharray[1];
		var month4 = montharray[0];
		
		var container = document.getElementById('rate_amount2');
		var data = {
		    categories: ['일', '월', '화', '수', '목', '금', '토'],
		    series: [
		        {
		            name: (month1.FIXED_MONTH + '월'),
		            data: [month1.SALES_FIGURES_SUN, month1.SALES_FIGURES_MON, month1.SALES_FIGURES_TUE, month1.SALES_FIGURES_WED, month1.SALES_FIGURES_THU, month1.SALES_FIGURES_FRI, month1.SALES_FIGURES_SAT]
		        },
		        {
		            name: (month2.FIXED_MONTH + '월'),
		            data: [month2.SALES_FIGURES_SUN, month2.SALES_FIGURES_MON, month2.SALES_FIGURES_TUE, month2.SALES_FIGURES_WED, month2.SALES_FIGURES_THU, month2.SALES_FIGURES_FRI, month2.SALES_FIGURES_SAT]
		        },
		        {
		            name: (month3.FIXED_MONTH + '월'),
		            data: [month3.SALES_FIGURES_SUN, month3.SALES_FIGURES_MON, month3.SALES_FIGURES_TUE, month3.SALES_FIGURES_WED, month3.SALES_FIGURES_THU, month3.SALES_FIGURES_FRI, month3.SALES_FIGURES_SAT]
		        },
		        {
		        	name : (month4.FIXED_MONTH + '월'),
		            data: [month4.SALES_FIGURES_SUN, month4.SALES_FIGURES_MON, month4.SALES_FIGURES_TUE, month4.SALES_FIGURES_WED, month4.SALES_FIGURES_THU, month4.SALES_FIGURES_FRI, month4.SALES_FIGURES_SAT]
		        }
		    ]
		};
		var options = {
		    chart: {
		        width: 700,
		        height: 400,
		        title: '요일별 금액'
		    },
		    yAxis: {
		        title: '원',
		    },
		    xAxis: {
		        title: 'Month',
		        pointOnColumn: true,
		        dateFormat: 'MMM',
		        tickInterval: 'auto'
		    },
		    series: {
		        showDot: false,
		        zoomable: true
		    },
		    tooltip: {
		        suffix: '원'
		    },
		    plot: {
		        bands: [
		            {
		                range: ['03/01/2016', '05/01/2016'],
		                color: 'gray',
		                opacity: 0.2
		            }
		        ],
		        lines: [
		            {
		                value: '03/01/2016',
		                color: '#fa2828'
		            }
		        ]
		    }
		};
		var theme = {
		    series: {
		        colors: [
		            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
		            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
		        ]
		    }
		};
		// For apply theme
		// tui.chart.registerTheme('myTheme', theme);
		// options.theme = 'myTheme';
		var chart = tui.chart.lineChart(container, data, options);
	}
	
	// 금액비율테이블
	function amountamount(resp) {
			var montharray = new Array;

			$(resp).each(function(index, item) {
				montharray[index] = item;
			});

			var month1 = montharray[3];
			var month2 = montharray[2];
			var month3 = montharray[1];
			var month4 = montharray[0];
			
			//요일별 금액 총합
			var mon = (month1.SALES_FIGURES_MON + month2.SALES_FIGURES_MON
					+ month3.SALES_FIGURES_MON + month4.SALES_FIGURES_MON);
			var tue = (month1.SALES_FIGURES_TUE + month2.SALES_FIGURES_TUE
					+ month3.SALES_FIGURES_TUE + month4.SALES_FIGURES_TUE);
			var wed = (month1.SALES_FIGURES_WED + month2.SALES_FIGURES_WED
					+ month3.SALES_FIGURES_WED + month4.SALES_FIGURES_WED);
			var thu = (month1.SALES_FIGURES_THU + month2.SALES_FIGURES_THU
					+ month3.SALES_FIGURES_THU + month4.SALES_FIGURES_THU);
			var fri = (month1.SALES_FIGURES_FRI + month2.SALES_FIGURES_FRI
					+ month3.SALES_FIGURES_FRI + month4.SALES_FIGURES_FRI);
			var sat = (month1.SALES_FIGURES_SAT + month2.SALES_FIGURES_SAT
					+ month3.SALES_FIGURES_SAT + month4.SALES_FIGURES_SAT);
			var sun = (month1.SALES_FIGURES_SUN + month2.SALES_FIGURES_SUN
					+ month3.SALES_FIGURES_SUN + month4.SALES_FIGURES_SUN);

			var weekall = (mon + tue + wed + thu + fri + sat + sun);
			var onweek = (mon + tue + wed + thu + fri);
			var weekend = (sat + sun);
			var monrate = ((mon / weekall)*100);
			var tuerate = ((tue / weekall)*100);
			var wedrate = ((wed / weekall)*100);
			var thurate = ((thu / weekall)*100);
			var frirate = ((fri / weekall)*100);
			var satrate = ((sat / weekall)*100);
			var sunrate = ((sun / weekall)*100);
			var weekallrate = (monrate + tuerate + wedrate + thurate + frirate + satrate + sunrate);
			var onweekrate = (monrate + tuerate + wedrate + thurate + frirate);
			var weekendrate = (satrate + sunrate);
			
			
			var output = '';
			
			output+= '<h5>4개월간 평균 매출금액</h5><br>'
			output+= '<table class = "table" style="width : 100%; text-align : center; font-size : 1.2em">';
			
			output+= 		'<tr>';
			output+=			'<td rowspan="2">지역</td>';
			output+=			'<td rowspan="2">구분</td>';
			output+=			'<td colspan="3">주중/주말</td>';
			output+=			'<td colspan="7">요일별</td>';
			output+=		'</tr>';
			output+=		'<tr>';
			output+=			'<td>전체</td>';
			output+=			'<td>주중</td>';
			output+=			'<td>주말</td>';
			output+=			'<td>일</td>';
			output+=			'<td>월</td>';
			output+=			'<td>화</td>';
			output+=			'<td>수</td>';
			output+=			'<td>목</td>';
			output+=			'<td>금</td>';
			output+=			'<td>토</td>';
			output+=		'</tr>';
			output+=		'<tr>';
			output+=			'<td rowspan="2">제1선택영역</td>';
			output+=			'<td>액수</td>';
			output+=			'<td>'+ weekall.toFixed(0) +'</td>';
			output+=			'<td>'+ onweek.toFixed(0) +'</td>';
			output+=			'<td>'+ weekend.toFixed(0) +'</td>';
			output+=				'<td>'+ sun.toFixed(0)+'</td>'; 
			output+=				'<td>'+ mon.toFixed(0)+'</td>';
			output+=				'<td>'+ tue.toFixed(0)+'</td>';
			output+=				'<td>'+ wed.toFixed(0)+'</td>';
			output+=				'<td>'+ thu.toFixed(0)+'</td>';
			output+=				'<td>'+ fri.toFixed(0)+'</td>';
			output+=				'<td>'+ sat.toFixed(0)+'</td>';
			output+=		'</tr>';
			output+=		'<tr>';
			output+=			'<td>비율</td>';
			output+=			'<td>' + weekallrate.toFixed(1) + '%</td>';
			output+=			'<td>'+ onweekrate.toFixed(1)+'%</td>';
			output+=			'<td>'+ weekendrate.toFixed(1)+'%</td>';
			output+=				'<td>'+ sunrate.toFixed(1)+'%</td>';
			output+=				'<td>'+ monrate.toFixed(1)+'%</td>';
			output+=				'<td>'+ tuerate.toFixed(1)+'%</td>';
			output+=				'<td>'+ wedrate.toFixed(1)+'%</td>';
			output+=				'<td>'+ thurate.toFixed(1)+'%</td>';
			output+=				'<td>'+ frirate.toFixed(1)+'%</td>';
			output+=				'<td>'+ satrate.toFixed(1)+'%</td>';
			output+=			'</tr>';
			output+= 		'</table>';
			
			$('#amountamount').html(output);
			
			
			// 매출금액 분석결과 설명
			var result = '';
			var amountarray = [ parseFloat(sunrate), parseFloat(monrate), parseFloat(tuerate), parseFloat(wedrate), parseFloat(thurate), parseFloat(frirate), parseFloat(satrate),];
			var weekallarray = ['일', '월', '화', '수', '목', '금', '토'];
			var amountflag = parseFloat(sunrate);
			var amountflag2 = '일';
				
			$(amountarray).each(function(index, item) {
				if (amountflag < item) {
					amountflag = item;
					amountflag2 = weekallarray[index];
				}
			});
			
			result += '제 1 선택영역의 매출 금액은 주중이 ' + onweek.toFixed(1) +'원으로 '+ onweekrate.toFixed(1) +'%, 주말이 ' + weekend.toFixed(1) + '원으로 ' + weekendrate.toFixed(1) +'%를 차지하고 있습니다.<br>';
			result += '일주일 중 ' + amountflag2 +'요일이 ' + amountflag.toFixed(1) +'%로 가장 많은 비율을 차지하고 있습니다.';
			
			$('#amountexplain').html(result);
			
	}
	

	function byregion(radius,cx,cy,indsLclsCd,indsMclsCd,indsSclsCd,ctprvnCd,indeSclsNm) {
		
		var pagenum = 0;
		pagenum++;
		
		var url1 = 'http://apis.data.go.kr/B553077/api/open/sdsc/storeListInRadius?radius=' + radius + '&cx=' + cx + '&cy=' + cy + '&indsSclsCd=' + indsSclsCd + '&numOfRows=1000&pageNo=1&ServiceKey=Z1LF8b98Ojwyh%2BIbOextukF0ZBT6tIqeF61OCS9HgYL3qByfJ%2BfQD%2Fie1OtoSZmuFnQa%2Fx0mgjVymLuzlJVOKw%3D%3D&type=json'
		var url2 = 'http://apis.data.go.kr/B553077/api/open/sdsc/storeListInDong?divId=ctprvnCd&key=11&indsSclsCd=' + indsSclsCd + '&numOfRows=1000&pageNo=1&ServiceKey=Z1LF8b98Ojwyh%2BIbOextukF0ZBT6tIqeF61OCS9HgYL3qByfJ%2BfQD%2Fie1OtoSZmuFnQa%2Fx0mgjVymLuzlJVOKw%3D%3D&type=json'
		var url3 = 'http://apis.data.go.kr/B553077/api/open/sdsc/storeListInDong?divId=signguCd&key=11680&indsSclsCd=' + indsSclsCd + '&numOfRows=1000&pageNo=1&ServiceKey=Z1LF8b98Ojwyh%2BIbOextukF0ZBT6tIqeF61OCS9HgYL3qByfJ%2BfQD%2Fie1OtoSZmuFnQa%2Fx0mgjVymLuzlJVOKw%3D%3D&type=json'						
		var regionarray = new Array();	
		//var seoularray = ["11110", "11620", "11680", "11560", "11140", "11170", "11215", "11350", "11710", "11440", "11200", "11230", "11290", "11545", "11410", "11590", "11650", "11305", "11320", "11260", "11500", "11380", "11470", "11530", "11740"];
		$.ajax({
			method : 'GET',
			dataType : 'json',
			url : url2,
			success : function(resp) {
				//서울전체 업소수
				var regionarray = new Array();
				var seoul = resp.body.items;
				var seoultotal = resp.body.totalCount;
				//var regionCd = new Array();
				
			 /* $(seoul).each(function(index,item){
					if (item.signguCd == 11680) {
						if (regionCd.length <= 1) {
							regionCd[0] = item.signguCd;
						}
					} 
				});   */
				regionarray[0] = seoultotal;
			
				//해당 구 업소수
				$.ajax({
					method : 'get',
					dataType : 'json',
					url : url3,
					success : function(resp){
						
						var count1 = 0;
						var district = resp.body.items;
						var districttotal = resp.body.totalCount;
						
						/* console.log(JSON.stringify(resp));
						 $(district).each(function(index,item){
							if (item.signguCd == 11680) {
								count1++;
							}
						});  */
						
						regionarray[1] = districttotal;
						
				//var seoulcc = seoul.length;
				/*
				$(seoul).each(function(index,item){
					if (regionCd.length == 0) {
						regionCd.push(item.signguCd);
					}
					if (regionCd.length > 0) {
						var cdcount = 0;
						for(var asd = 0 ; asd < regionCd.length ; asd++) {	
							if (item.signguCd == regionCd[asd]) {
								cdcount++;
								break;
							} 
					}; 
						if (cdcount==0) {
							regionCd.push(item.signguCd);
						}
						
						regionarray[0] = cdcount;
						
					}
					
					if (item.indsSclsCd==indsSclsCd) {
							count1++;
						}
					regionarray[0] = count1; 
				});
				*/			
				
				//반경 내 업소수
						$.ajax({
							method : 'GET',
							dataType : 'json',
							url : url1,
							success : function(resp) {
								var boundtotal = resp.body.totalCount
								//alert("토탈 : " + JSON.stringify(resp.body.totalCount));
								var count2 = 0;
								var coffee = resp.body.items;
								$(coffee).each(function(index,item){
									if (item.indsSclsCd==indsSclsCd) {
										count2++;	
										}
									});
									regionarray[2] = count2;
									
									//차트함수넣을곳
									regionchart(regionarray);
									//차트설명넣을곳
									explainregion(regionarray,indeSclsNm);
									
								},
								error : function(resp) {
								alert('fail');
								}
							});
						 	
						},
						error : function(resp) {
							alert('fail');
						}
					
				});
			},
				error : function(resp) {
					alert('fail');
				}

			});
		
				
		}

		


	
	function regionchart(regionarray) {
		var container = document.getElementById('chart-area2');
		var data = {
		    categories: ['업종'],
		    series: [
		        {
		            name: '그 외',
		            data: 100 - (regionarray[2]/regionarray[1])*100
		        }
		    ]
		};
		var temp = {
				name : '반경 내 업소 수',
				data : (regionarray[2]/regionarray[1])*100
		}
		
		data.series.push(temp);
		
		
		var options = {
		    chart: {
		        width: 700,
		        height: 400,
		        title: '지역별 추이'
		    },
		    tooltip: {
		        suffix: '%'
		    }
		};
		var theme = {
		    series: {
		        colors: [
		            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
		            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
		        ]
		    }
		};
		// For apply theme

		// tui.chart.registerTheme('myTheme', theme);
		// options.theme = 'myTheme';

		tui.chart.pieChart(container, data, options);
	}
	
	
	//분석결과
	function explainregion(regionarray,indeSclsNm) {
		
		var container2 = document.getElementById('resulttable2');
		var container = document.getElementById('resultarea2');
		//서울, 구, 반경내 업소 수
		var areaS = regionarray[0];
		var areaD = regionarray[1];
		var areaR = regionarray[2];
		
		//서울 내 업소수 대비 반경 내 업소수
		var rate1 = ((areaR/areaS)*100);
		//구 내 업소수 대비 반경 내 업소수
		var rate2 = ((areaR/areaD)*100);
		
		console.log(areaS);
		console.log(areaD);
		console.log(areaR);
		
		
		table = '';
		table += '<table class = "table" style="width : 70%; color : gray; text-align : center">';
		table += '<tr>';
		table += '		<th>지역</th><th>업소 수 </th>';
		table += '</tr>'
		table += '<tr>';
		table += '<tr>';
		table += '		<td>제 1 선택영역</td>';
		table += '		<td>'+ areaR+'</td>';
		table += '</tr>';
		table += '<tr>';
		table += '		<td>강남구</td>';
		table += '		<td>'+ areaD +'</td>';
		table += '</tr>';
		table += '<tr>';
		table += '		<td>서울</td>';
		table += '		<td>'+ areaS +'</td>';
		table += '</tr>';
		table += '</table>';
		
		
		
		result = '';
		result += '제 1 선택영역의 업소수는 ' + areaR + '건으로,<br>'; 
		result += '해당 구 내의 '+ rate2.toFixed(1) + '%, 서울 내 '+ rate1.toFixed(1) +'%를 차지하고 있습니다.<br>';
		
		
		$('#resulttable2').html(table);
		$('#resultarea2').html(result);
	}
	
	
	//반경내 대중소분류 상가정보
	function bringshop(radius,cx,cy,indsLclsCd,indsMclsCd,indsSclsCd) {
		
		var url1 = 'http://apis.data.go.kr/B553077/api/open/sdsc/storeListInRadius?radius=' + radius + '&cx=' + cx + '&cy=' + cy + '&indsLclsCd=' + indsLclsCd +  '&numOfRows=1000&pageNo=1&ServiceKey=Z1LF8b98Ojwyh%2BIbOextukF0ZBT6tIqeF61OCS9HgYL3qByfJ%2BfQD%2Fie1OtoSZmuFnQa%2Fx0mgjVymLuzlJVOKw%3D%3D&type=json'
		var url2 = 'http://apis.data.go.kr/B553077/api/open/sdsc/storeListInRadius?radius=' + radius + '&cx=' + cx + '&cy=' + cy + '&indsMclsCd=' + indsMclsCd + '&numOfRows=1000&pageNo=1&ServiceKey=Z1LF8b98Ojwyh%2BIbOextukF0ZBT6tIqeF61OCS9HgYL3qByfJ%2BfQD%2Fie1OtoSZmuFnQa%2Fx0mgjVymLuzlJVOKw%3D%3D&type=json'
		var url3 = 'http://apis.data.go.kr/B553077/api/open/sdsc/storeListInRadius?radius=' + radius + '&cx=' + cx + '&cy=' + cy + '&indsSclsCd=' + indsSclsCd + '&numOfRows=1000&pageNo=1&ServiceKey=Z1LF8b98Ojwyh%2BIbOextukF0ZBT6tIqeF61OCS9HgYL3qByfJ%2BfQD%2Fie1OtoSZmuFnQa%2Fx0mgjVymLuzlJVOKw%3D%3D&type=json'
		var coffeearray = new Array();
	
		$.ajax({
			method : 'GET',
			dataType : 'json',
			url : url1,
			success : function(resp) {
				var count1 = 0;
				var coffee = resp.body.items;	
				$(coffee).each(function(index,item){
					if (item.indsLclsCd==indsLclsCd) {
					 count1++;	
					}
					coffeearray[0] = count1;
					
				});
				
				$.ajax({
					method : 'GET',
					dataType : 'json',
					url : url2,
					success : function(resp) {
						var count2 = 0;
						var coffee = resp.body.items;
						$(coffee).each(function(index,item){
							if (item.indsMclsCd==indsMclsCd) {
								 count2++;	
							}
						});
						
						coffeearray[1] = count2;
	
							$.ajax({
								method : 'GET',
								dataType : 'json',
								url : url3,
								success : function(resp) {
									var count3 = 0;
									var namearray = new Array();
									var coffee = resp.body.items;
									$(coffee).each(function(index,item){
										if (item.indsSclsCd==indsSclsCd) {
											 count3++;	
										}
										if (namearray.length < 4) {
											namearray.push(item.indsLclsNm);
											namearray.push(item.indsMclsNm);
											namearray.push(item.indsSclsNm);
										}
									});
									coffeearray[2] = count3;
								//var namearray = [resp.indsLclsNm, resp.indsMclsNm, resp.indsSclsNm];					

									console.log(JSON.stringify(resp));
									//차트함수넣을곳
									makechart(coffeearray);
									//결과설명
									resulttable1(namearray, coffeearray);
									
									
								},
								error : function(resp) {
								alert('fail');
								}
							});
						 	
						},
						error : function(resp) {
							alert('fail');
						}
					
				});
				
			},
			error : function(resp) {
				alert('fail');
			}
		});

		
}
	
	function makechart(coffeearray) {
		var container = document.getElementById('chart-area1');
		var data = {
		    categories: ['업종'],
		    series: [
		        {
		            name: '그 외',
		            data: 100 - (coffeearray[2]/coffeearray[0])*100
		        }
		    ]
		};
		var temp = {
				name : '소분류',
				data : (coffeearray[2]/coffeearray[0])*100
		}
		
		data.series.push(temp);
		
		var options = {
		    chart: {
		        width: 700,
		        height: 400,
		        title: '업종별 추이'
		    },
		    tooltip: {
		        suffix: '%'
		    }
		};
		var theme = {
		    series: {
		        colors: [
		            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
		            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
		        ]
		    }
		};
		// For apply theme

		// tui.chart.registerTheme('myTheme', theme);
		// options.theme = 'myTheme';

		tui.chart.pieChart(container, data, options);
	}
	
	
	/* 
	function bringshop(shopcode) {
		var url = 'http://apis.data.go.kr/B553077/api/open/sdsc/storeListInArea?key=' + shopcode + '&indsLclsCd=Q&indsMclsCd=Q12&indsSclsCd=Q12A01&numOfRows=100&pageNo=1&type=json&ServiceKey=Z1LF8b98Ojwyh%2BIbOextukF0ZBT6tIqeF61OCS9HgYL3qByfJ%2BfQD%2Fie1OtoSZmuFnQa%2Fx0mgjVymLuzlJVOKw%3D%3D';
		
		$.ajax({
			method : 'GET',
			url : url,
			dataType : 'json',
			success : function(resp) {
				console.log(JSON.stringify(resp));
				alert('success');
				$('#resulttxt').html(url);
			},
			error : function(e) {
				consolelog(e.responseText);
				
			}
		});
	}
	
 */
 
 //분석결과
 function resulttable1(namearray, coffeearray) {
	 
	var groupL = namearray[0];
	var groupM = namearray[1];
	var groupS = namearray[2];
	 

	var container = document.getElementById('resultarea1');
	var container2 = document.getElementById('resulttable1');
	var rate = ((coffeearray[2]/coffeearray[0])*100);
	
	table = '';
	table +=' <table class="table" style = "width : 100%; color : gray; text-align : center">';
	table += '<tr>';
	table += '<th>구분</th>';
	table += '<th>업종</th>';
	table += '<th>업소수</th>';
	table += '</tr>';
	table += '<tr>';
	table += '<th>선택업종</th>';
	table += '<td>'+ groupS +'</td>';
	table += '<td>'+ coffeearray[2] +'</td>';
	table += '</tr>';
	table += '<tr>';
	table += '<th>중분류</th>';
	table += '<td>'+ groupM +'</td>';
	table += '<td>'+ coffeearray[1] +'</td>';
	table += '</tr>';
	table += '<tr>';
	table += '<th>대분류</th>';
	table += '<td>'+ groupL +'</td>';
	table += '<td>'+ coffeearray[0]+'</td>';
	table += '</tr>';
	table += '</table>';
	 
	 
	result = '';
	result += '제 1 선택영역의 ' + groupS + ' 업종의 개수는 ' + coffeearray[2] + '개로<br>';
	result += '대분류인 ' + groupL + ' 의 ' + rate.toFixed(1) +'%를 차지하고 있습니다.<br>';
	
	$('#resulttable1').html(table);
	$('#resultarea1').html(result);
 }
	
}