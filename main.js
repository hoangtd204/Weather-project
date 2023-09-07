$(document).ready(function () {

  //onclick Enter
  $(".inputLocation").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;

    if (keycode == "13") {
      event.preventDefault();
      isReasult();
    }

    $(".search").click(function () {
      isReasult();
    });
  });



  //Onload
  $(document).ready(function () {
    isReasultDefault();
  });


});


function isReasultDefault() {
  const defaultSeverAPI =
    "http://api.weatherapi.com/v1/current.json?key=9683829700c84a269be72831231808&q=ha noi&aqi=no";
  $.get(defaultSeverAPI, function (datas) {
    isReasultWeather(datas);
  })
}


//Logic
function isReasult() {
  let severAPI = "http://api.weatherapi.com/v1/current.json?key=9683829700c84a269be72831231808&q= &aqi=no";
  let dataUser = $(".inputLocation").val();
  let weatherApi = severAPI.replace(" ", dataUser);

  $.get(weatherApi, function (datas, status) {

    isReasultWeather(datas, status)

  }).fail(function () {
    $(".messageError-content").show(500);
    $(document).ready(function () {
      setTimeout(hideMessageError, 5000)
    })
    const hideMessageError = function () {
      $(".messageError-content").hide(500);
    }

  })
}

function isReasultWeather(values, status) {
  const Location = values.location.name;
  const feelslike_c = values.current.feelslike_c;
  const humidity = values.current.humidity;
  const uvIndex = values.current.uv;
  const wind_kph = values.current.wind_kph;
  const temperature = values.current.temp_c;

  console.log(values)
  const isDate = new Date();
  const Hours = isDate.getHours();
  const Today =
    Hours +
    ":" +
    isDate.getMinutes() +
    "   " +
    isDate.getDate() +
    "-" +
    (isDate.getMonth() + 1) +
    "-" +
    isDate.getFullYear();

  $(".location").html(function () {
    return Location;
  });

  $(".todayDate").html(function () {
    return Today;
  });


  $(".weather-feelslike_c").html(function () {
    return feelslike_c + "°";
  });

  $(".weather-uvIndex").html(function () {
    return " Chỉ số UV:" + uvIndex;
  });

  $(".weather-humidity").html(function () {
    return "Độ ẩm:" + humidity + "%";
  });
  $(".weather-temperature").html(function () {
    return "Nhiệt độ:" + temperature + "°C";
  })
  $(".wind_speed").html(function () {
    return "Gió:" + wind_kph + "  km/h";
  })
  $(".messageError-content").hide();

  if (Hours >= 19 && Hours <= 5) {
    $(".display-data").html(function () {
      $(".display-data").css({
        "background-image": "url(images/pexels-miriam-espacio-365633.jpg)",
      });
      $(".icon-weather").attr("src", "images/moon (1).png");
    });


  } else {
    if (feelslike_c < 34) {
      $(".display-data").html(function () {
        $(".display-data").css({
          "background-image": "url(images/04099_dataibaysunset_1920x1080.jpg)",
        });
        $(".icon-weather").attr("src", "images/cloudy (1).png");
      });
    }

    if (feelslike_c >= 34) {
      $(".display-data").html(function () {
        $(".display-data").css({
          "background-image": "url(images/chup-anh-khi-troi-nang-gat.jpg)",
        });

        $(".icon-weather").attr("src", "images/sun.png");
      });
    }

    if (feelslike_c < 34 && humidity > 70) {
      $(".display-data").html(function () {
        $(".display-data").css({
          "background-image": "url(images/anh-bau-troi-u-am-buon-tuyet-vong_022429207.jpg)",
        });
        $(".icon-weather").attr("src", "images/cloudy.png");
      });
    }

  }
}