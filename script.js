/* *************** Slider *************** */

//Ottengo gli elementi con il query selector
const slider = document.querySelector(".slider-container"),
  slides = Array.from(document.querySelectorAll(".slide"));

//Set up
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0;

//Aggiungo gli event listener
slides.forEach((slide, index) => {
  const slideImage = slide.querySelector(".citySlide");

  slideImage.addEventListener("dragstart", (e) => e.preventDefault());
  //Touch events
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);
  //Mouse events
  slide.addEventListener("mousedown", touchStart(index));
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mousemove", touchMove);
  slide.addEventListener("mouseleave", touchEnd);
});

//Rendo responsive in base al cambiamento del viewport
window.addEventListener("resize", setPositionByIndex);

window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.classList.add("grabbing");
  };
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function touchEnd() {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;

  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();

  slider.classList.remove("grabbing");
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

/* *************** Chiamate dei dati per le 5 città Londra,Milano,Bangkok,Los Angeles,Nairobi *************** */

const apiKey = "0c76eb61d38ea55964f584e642ef952f";

//Fetch per i dati di Londra
const list = document.querySelector(".city1");
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=51.509865&lon=-0.118092&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`;

//Chiamata dei dati e markup
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const icon = `https://openweathermap.org/img/wn/${data.daily[0].weather[0]["icon"]}@2x.png`;

    const div1 = document.createElement("div");
    div1.classList.add("contenitore1");
    const markup = `
    
    <div class="citta">London</div>
    <div class="descrizioneTempo">${
      data.daily[0].weather[0]["description"]
    }</div>
    <img class="iconaTempo" src=${icon} alt=${data.daily[0].weather[0]["main"]}>
    <div class="temperatura">${Math.round(data.daily[0].temp.day)}°</div>
    <div class="temperatura-maxMin">Min: ${Math.round(
      data.daily[0].temp.min
    )}° / Max: ${Math.round(data.daily[0].temp.max)}°</div>
 
    `;
    div1.innerHTML = markup;
    list.appendChild(div1);

    //Prendo i valori delle temperature minime e massime per ogni giorno della settimana
    for (i = 0; i < 7; i++) {
      document.getElementById("day" + (i + 1) + "Min").innerHTML =
        "Min: " + data.daily[i].temp.min.toFixed() + "°";
    }
    for (i = 0; i < 7; i++) {
      document.getElementById("day" + (i + 1) + "Max").innerHTML =
        "Max: " + data.daily[i].temp.max.toFixed() + "°";
    }
    //Prendo le icone relative alle condizioni atmosferiche per ogni giorno della settimana
    for (i = 0; i < 7; i++) {
      document.getElementById("img" + (i + 1)).src =
        "http://openweathermap.org/img/wn/" +
        data.daily[i].weather[0].icon +
        ".png";
    }

    /* ********** Ottengo e visualizzo il testo per ogni giorno della settimana ********** */
    var d = new Date();
    var weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    //Funzione per ottenere il giorno esatto della settimana
    function CheckDay(day) {
      if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
      } else {
        return day + d.getDay();
      }
    }
    for (i = 0; i < 7; i++) {
      document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
    }
  })
  .catch(() => {
    console.log("something wrong");
  });

//Fetch per i dati di Milano
const list2 = document.querySelector(".city2");
const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=45.464664&lon=9.188540&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`;

//Chiamata dei dati
fetch(url2)
  .then((response) => response.json())
  .then((data) => {
    const icon = `https://openweathermap.org/img/wn/${data.daily[0].weather[0]["icon"]}@2x.png`;

    const div2 = document.createElement("div");
    div2.classList.add("contenitore2");
    const markup2 = `
 
    <div class="citta">Milan</div>
    <div class="descrizioneTempo">${
      data.daily[0].weather[0]["description"]
    }</div>
    <img class="iconaTempo" src=${icon} alt=${data.daily[0].weather[0]["main"]}>
    <div class="temperatura">${Math.round(data.daily[0].temp.day)}°</div>
    <div class="temperatura-maxMin">Min: ${Math.round(
      data.daily[0].temp.min
    )}° / Max: ${Math.round(data.daily[0].temp.max)}°</div>
 
    `;
    div2.innerHTML = markup2;
    list2.appendChild(div2);

    //Prendo i valori delle temperature minime e massime per ogni giorno della settimana
    for (i = 0; i < 7; i++) {
      document.getElementById("dayA" + (i + 1) + "Min").innerHTML =
        "Min: " + data.daily[i].temp.min.toFixed() + "°";
    }
    for (i = 0; i < 7; i++) {
      document.getElementById("dayA" + (i + 1) + "Max").innerHTML =
        "Max: " + data.daily[i].temp.max.toFixed() + "°";
    }
    //Prendo le icone relative alle condizioni atmosferiche per ogni giorno della settimana
    for (i = 0; i < 7; i++) {
      document.getElementById("imgA" + (i + 1)).src =
        "http://openweathermap.org/img/wn/" +
        data.daily[i].weather[0].icon +
        ".png";
    }

    /* ********** Ottengo e visualizzo il testo per ogni giorno della settimana ********** */
    var d = new Date();
    var weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    //Funzione per ottenere il giorno esatto della settimana
    function CheckDay(day) {
      if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
      } else {
        return day + d.getDay();
      }
    }
    for (i = 0; i < 7; i++) {
      document.getElementById("dayA" + (i + 1)).innerHTML =
        weekday[CheckDay(i)];
    }
  })
  .catch(() => {
    console.log("something wrong");
  });

//Fetch per i dati di Bangkok
const list3 = document.querySelector(".city3");
const url3 = `https://api.openweathermap.org/data/2.5/onecall?lat=13.668217&lon=100.614021&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`;

//Chiamata dei dati
fetch(url3)
  .then((response) => response.json())
  .then((data) => {
    const icon = `https://openweathermap.org/img/wn/${data.daily[0].weather[0]["icon"]}@2x.png`;

    const div3 = document.createElement("div");
    div3.classList.add("contenitore3");
    const markup3 = `
 
    <div class="citta">Bangkok</div>
    <div class="descrizioneTempo">${
      data.daily[0].weather[0]["description"]
    }</div>
    <img class="iconaTempo" src=${icon} alt=${data.daily[0].weather[0]["main"]}>
    <div class="temperatura">${Math.round(data.daily[0].temp.day)}°</div>
    <div class="temperatura-maxMin">Min: ${Math.round(
      data.daily[0].temp.min
    )}° / Max: ${Math.round(data.daily[0].temp.max)}°</div>
 
    `;
    div3.innerHTML = markup3;
    list3.appendChild(div3);

    //Prendo i valori delle temperature minime e massime per ogni giorno della settimana
    for (i = 0; i < 7; i++) {
      document.getElementById("dayB" + (i + 1) + "Min").innerHTML =
        "Min: " + data.daily[i].temp.min.toFixed() + "°";
    }
    for (i = 0; i < 7; i++) {
      document.getElementById("dayB" + (i + 1) + "Max").innerHTML =
        "Max: " + data.daily[i].temp.max.toFixed() + "°";
    }
    //Prendo le icone relative alle condizioni atmosferiche per ogni giorno della settimana
    for (i = 0; i < 7; i++) {
      document.getElementById("imgB" + (i + 1)).src =
        "http://openweathermap.org/img/wn/" +
        data.daily[i].weather[0].icon +
        ".png";
    }

    /* ********** Ottengo e visualizzo il testo per ogni giorno della settimana ********** */
    var d = new Date();
    var weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    //Funzione per ottenere il giorno esatto della settimana
    function CheckDay(day) {
      if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
      } else {
        return day + d.getDay();
      }
    }
    for (i = 0; i < 7; i++) {
      document.getElementById("dayB" + (i + 1)).innerHTML =
        weekday[CheckDay(i)];
    }
  })
  .catch(() => {
    console.log("something wrong");
  });

//Fetch per i dati di Los Angeles
const list4 = document.querySelector(".city4");
const url4 = `https://api.openweathermap.org/data/2.5/onecall?lat=34.052235&lon=-118.243683&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`;

//Chiamata dei dati
fetch(url4)
  .then((response) => response.json())
  .then((data) => {
    const icon = `https://openweathermap.org/img/wn/${data.daily[0].weather[0]["icon"]}@2x.png`;

    const div4 = document.createElement("div");
    div4.classList.add("contenitore4");
    const markup4 = `
 
    <div class="citta">Los Angeles</div>
    <div class="descrizioneTempo">${
      data.daily[0].weather[0]["description"]
    }</div>
    <img class="iconaTempo" src=${icon} alt=${data.daily[0].weather[0]["main"]}>
    <div class="temperatura">${Math.round(data.daily[0].temp.day)}°</div>
    <div class="temperatura-maxMin">Min: ${Math.round(
      data.daily[0].temp.min
    )}° / Max: ${Math.round(data.daily[0].temp.max)}°</div>
 
    `;
    div4.innerHTML = markup4;
    list4.appendChild(div4);

    //Prendo i valori delle temperature minime e massime per ogni giorno della settimana
    for (i = 0; i < 7; i++) {
      document.getElementById("dayC" + (i + 1) + "Min").innerHTML =
        "Min: " + data.daily[i].temp.min.toFixed() + "°";
    }
    for (i = 0; i < 7; i++) {
      document.getElementById("dayC" + (i + 1) + "Max").innerHTML =
        "Max: " + data.daily[i].temp.max.toFixed() + "°";
    }
    //Prendo le icone relative alle condizioni atmosferiche per ogni giorno della settimana
    for (i = 0; i < 7; i++) {
      document.getElementById("imgC" + (i + 1)).src =
        "http://openweathermap.org/img/wn/" +
        data.daily[i].weather[0].icon +
        ".png";
    }

    /* ********** Ottengo e visualizzo il testo per ogni giorno della settimana ********** */
    var d = new Date();
    var weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    //Funzione per ottenere il giorno esatto della settimana
    function CheckDay(day) {
      if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
      } else {
        return day + d.getDay();
      }
    }
    for (i = 0; i < 7; i++) {
      document.getElementById("dayC" + (i + 1)).innerHTML =
        weekday[CheckDay(i)];
    }
  })
  .catch(() => {
    console.log("something wrong");
  });

//Fetch per i dati di Nairobi
const list5 = document.querySelector(".city5");
const url5 = `https://api.openweathermap.org/data/2.5/onecall?lat=-1.2920659&lon=36.82194619999996&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`;

//Chiamata dei dati
fetch(url5)
  .then((response) => response.json())
  .then((data) => {
    const icon = `https://openweathermap.org/img/wn/${data.daily[0].weather[0]["icon"]}@2x.png`;

    const div5 = document.createElement("div");
    div5.classList.add("contenitore5");
    const markup5 = `
 
    <div class="citta">Nairobi</div>
    <div class="descrizioneTempo">${
      data.daily[0].weather[0]["description"]
    }</div>
    <img class="iconaTempo" src=${icon} alt=${data.daily[0].weather[0]["main"]}>
    <div class="temperatura">${Math.round(data.daily[0].temp.day)}°</div>
    <div class="temperatura-maxMin">Min: ${Math.round(
      data.daily[0].temp.min
    )}° / Max: ${Math.round(data.daily[0].temp.max)}°</div>
 
    `;
    div5.innerHTML = markup5;
    list5.appendChild(div5);

    //Prendo i valori delle temperature minime e massime per ogni giorno della settimana
    for (i = 0; i < 7; i++) {
      document.getElementById("dayD" + (i + 1) + "Min").innerHTML =
        "Min: " + data.daily[i].temp.min.toFixed() + "°";
    }
    for (i = 0; i < 7; i++) {
      document.getElementById("dayD" + (i + 1) + "Max").innerHTML =
        "Max: " + data.daily[i].temp.max.toFixed() + "°";
    }
    //Prendo le icone relative alle condizioni atmosferiche per ogni giorno della settimana
    for (i = 0; i < 7; i++) {
      document.getElementById("imgD" + (i + 1)).src =
        "http://openweathermap.org/img/wn/" +
        data.daily[i].weather[0].icon +
        ".png";
    }

    /* ********** Ottengo e visualizzo il testo per ogni giorno della settimana ********** */
    var d = new Date();
    var weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    //Funzione per ottenere il giorno esatto della settimana
    function CheckDay(day) {
      if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
      } else {
        return day + d.getDay();
      }
    }
    for (i = 0; i < 7; i++) {
      document.getElementById("dayD" + (i + 1)).innerHTML =
        weekday[CheckDay(i)];
    }
  })
  .catch(() => {
    console.log("something wrong");
  });
