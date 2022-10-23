function TicketServis() {
    const btnCalculate = document.getElementsByClassName('calculate')[0];
    const main = document.querySelector('.main_page');
    const selectRoute = document.querySelector('.route');
    const selectTime = document.getElementById('time');
    const selectReturnTime = document.getElementById('return_ticket_time');
    // const arrAtoB = ["18:00","18:30", "18:45", "19:00", "19:15", "21:00"];
    const arrBtoA = ['18:30', '18:45', '19:00', '19:15', '19:35', '21:50', '21:55'];
    const text = document.createElement('div');
    text.className = 'text';
    const routeLength = 50;
  
    selectRoute.addEventListener('change', (e) => {
      if (e.target.value === 'из A в B и обратно в А') {
        selectReturnTime.innerHTML = '';
      }
      text.innerHTML = '';
      if (e.target.value === 'из A в B') {
        document.querySelector('.return_time_choise').style.display = 'none';
        document.querySelector('.return_ticket_time').style.display = 'none';
        selectTime.innerHTML = '<option value=\'\'></option>';
        selectTime.innerHTML += `<option class="A_B"value="18:00">18:00</option>
      <option value="18:30">18:30</option>
      <option value="18:45">18:45</option>
      <option value="19:00">19:00</option>
      <option value="19:15">19:15</option>
      <option value="21:00">21:00</option>`;
      } else if (e.target.value === 'из B в A') {
        document.querySelector('.return_time_choise').style.display = 'none';
        document.querySelector('.return_ticket_time').style.display = 'none';
        selectTime.innerHTML = '<option value=\'\'></option>';
        selectTime.innerHTML += `<option value="18:30">18:30</option>
      <option value="18:45">18:45</option>
      <option value="19:00">19:00</option>
      <option value="19:15">19:15</option>
      <option value="19:35">19:35</option>
      <option value="21:50">21:50</option>
      <option value="21:55">21:55</option>`;
      } else if (e.target.value === 'из A в B и обратно в А') {
        selectTime.innerHTML = '<option value=\'\'></option>';
        selectTime.innerHTML += `<option value="18:00">18:00</option>
      <option value="18:30">18:30</option>
      <option value="18:45">18:45</option>
      <option value="19:00">19:00</option>
      <option value="19:15">19:15</option>
      <option value="21:00">21:00</option>`;
        document.querySelector('.return_time_choise').style.display = 'inline';
        document.querySelector('.return_ticket_time').style.display = 'inline';
      }
    });
    let hours;
    let minutes;
    function sumToTime(sum) {
      hours = Math.trunc(sum / 60);
      minutes = sum % 60;
      if (minutes >= 0 && minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (hours >= 0 && hours < 10) {
        hours = `0${hours}`;
      }
    }
  
    selectTime.addEventListener('change', (e) => {
      selectReturnTime.innerHTML = '';
      if (e.target.value) {
        const departTimeArr = e.target.value.split(':');
        const arrSum = Number(departTimeArr[0]) * 60 + Number(departTimeArr[1]);
        for (let i = 0; i < arrBtoA.length; i += 1) {
          const arriveTime = arrBtoA[i].split(':');
          const sumArrive = Number(arriveTime[0]) * 60 + Number(arriveTime[1]);
          if (sumArrive > arrSum + routeLength) {
            sumToTime(sumArrive);
            selectReturnTime.innerHTML += `<option value="${hours}:${minutes}">${hours}:${minutes}</option>`;
          }
        }
      }
    });
  
    // При нажатии на кнопку "посчитать" нужно вывести результат
  
    // функция для расчета времени обратного прибытия
    let hoursReturn; // время прибытия обратное
    let minutesReturn;// минуты прибытия обратные
    function sumToTimeReturn(sumReturn) {
      hoursReturn = Math.trunc(sumReturn / 60);
      minutesReturn = sumReturn % 60;
      if (minutesReturn >= 0 && minutesReturn < 10) {
        minutesReturn = `0${minutesReturn}`;
      }
      if (hoursReturn >= 0 && hoursReturn < 10) {
        hoursReturn = `0${hoursReturn}`;
      }
    }
    const quantityTickets = document.getElementById('num');
  
    // При нажатии на кнопку "посчитать" выводим результат
    btnCalculate.addEventListener('click', (e) => {
      if (selectRoute.value && selectTime.value && quantityTickets.value) {
        e.preventDefault();
        const ticketPrice = 700; // цена билета
        const roundTicketPrice = 1200; // цена составного билета
        let quantityResult;
        let tripLength;
  
        if (selectRoute.value === 'из A в B и обратно в А') {
          quantityResult = roundTicketPrice * quantityTickets.value;
        } else if (selectRoute.value === 'из A в B' || 'из B в A') {
          quantityResult = ticketPrice * quantityTickets.value;
        }
  
        if (selectRoute.value === 'из A в B и обратно в А') {
          const retArr = selectReturnTime.value.split(':');
          const sumRet = Number(retArr[0]) * 60 + Number(retArr[1]);
          const arrDep = selectTime.value.split(':');
          const sumDep = Number(arrDep[0]) * 60 + Number(arrDep[1]);
          tripLength = sumRet + routeLength - sumDep;// сколько минут займет поездка
          sumToTimeReturn(sumRet + routeLength);
        } else if (selectRoute.value === 'из A в B' || 'из B в A') {
          tripLength = routeLength; // время в пути в одну сторону
          const sumReturn = Number(selectTime.value.split(':')[0]) * 60 + Number(selectTime.value.split(':')[1]);
          sumToTimeReturn(sumReturn + tripLength);
        }
  
        text.innerHTML = ` Вы выбрали <span class="quantity_result">${quantityTickets.value} </span> билета по маршруту <span class="route_result">${selectRoute.value} </span> стоимостью <span class="price_result">${quantityResult}</span>р.
    Это путешествие займет у вас<span class="time_result">${tripLength}</span> минут. 
    Теплоход отправляется в <span class="time_departure">${selectTime.value} </span>, а прибудет в <span class="time_arrive">${hoursReturn}:${minutesReturn} </span>`;
  
        main.appendChild(text);
      } else {
        alert('Вы заполнили не все поля!');
      }
    });
  }

  
  TicketServis();