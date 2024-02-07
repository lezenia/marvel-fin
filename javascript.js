jQuery(document).ready(function () {
  $(".navi > li")
    .mouseover(function () {
      $(this).find(".sub-menu").stop().slideDown(500);
    })
    .mouseout(function () {
      $(this).find(".sub-menu").stop().slideUp(500);
    });
});

// 슬라이드
$(".slider").each(function () {
  var $this = $(this);
  var $group = $this.find(".slide_group");
  var $slides = $this.find(".slide");
  var bulletArray = [];
  var currentIndex = 0;
  var timeout;

  function move(newIndex) {
    var animateLeft, slideLeft;

    advance();

    if ($group.is(":animated") || currentIndex === newIndex) {
      return;
    }

    bulletArray[currentIndex].removeClass("active");
    bulletArray[newIndex].addClass("active");

    if (newIndex > currentIndex) {
      slideLeft = "100%";
      animateLeft = "-100%";
    } else {
      slideLeft = "-100%";
      animateLeft = "100%";
    }

    $slides.eq(newIndex).css({
      display: "block",
      left: slideLeft,
    });
    $group.animate(
      {
        left: animateLeft,
      },
      function () {
        $slides.eq(currentIndex).css({
          display: "none",
        });
        $slides.eq(newIndex).css({
          left: 0,
        });
        $group.css({
          left: 0,
        });
        currentIndex = newIndex;
      }
    );
  }

  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if (currentIndex < $slides.length - 1) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 4000);
  }

  $(".next_btn").on("click", function () {
    if (currentIndex < $slides.length - 1) {
      move(currentIndex + 1);
    } else {
      move(0);
    }
  });

  $(".previous_btn").on("click", function () {
    if (currentIndex !== 0) {
      move(currentIndex - 1);
    } else {
      move(3);
    }
  });

  $.each($slides, function (index) {
    var $button = $('<a class="slide_btn">&bull;</a>');

    if (index === currentIndex) {
      $button.addClass("active");
    }
    $button
      .on("click", function () {
        move(index);
      })
      .appendTo(".slide_buttons");
    bulletArray.push($button);
  });

  advance();
});

// part-2
const container = document.querySelector(".comics-container");
const innerContainer = document.querySelector(".inner-container");
let isDown = false;
let startX;
let scrollLeft;

container.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener("mouseleave", () => {
  isDown = false;
});

container.addEventListener("mouseup", () => {
  isDown = false;
});

container.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 2; // 조절 가능한 속도
  container.scrollLeft = scrollLeft - walk;
});

// 처음에 4개의 상자만 보이도록 설정
container.scrollLeft = 0;
innerContainer.style.width = "820px"; // 200px * 8 + 10px * 7

// part-3
function playVideo(videoId, videoMenu, title, description) {
  document.getElementById("videoPlayer").src =
    "https://www.youtube.com/embed/" + videoId;
  document.getElementById("videoMenu").innerHTML = videoMenu;
  document.getElementById("videoTitle").innerHTML = title;
  document.getElementById("videoDescription").innerHTML = description;
  const videoContainer = document.getElementById("videoContainer");

  // 이미지를 클릭하면 비디오 컨테이너를 보여주고 에니메이션 적용
  videoContainer.style.display = "block";

  // 비디오 컨테이너의 높이와 투명도를 변경하여 나타나는 애니메이션 적용
  setTimeout(() => {
    videoContainer.classList.remove("hidden");
    videoContainer.style.opacity = 1;
    videoContainer.style.height = "820px"; // 최종 높이 설정
  }, 10);
}

function showMenu(menuId) {
  // Hide all menu content
  var menus = document.querySelectorAll(".menu-content");
  menus.forEach(function (menu) {
    menu.style.display = "none";
  });

  document.getElementById(menuId).style.display = "block";
}

// part-4
function flip(event) {
  var element = event.currentTarget;
  if (element.className === "card") {
    if (element.style.transform == "rotateY(180deg)") {
      element.style.transform = "rotateY(0deg)";
    } else {
      element.style.transform = "rotateY(180deg)";
    }
  }
}
// part-5
// 캔버스 요소 가져오기
const canvas = document.getElementById("right-bg");

// 2d 그래픽 컨택스트 가져오기
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(500, 0); // 첫번쨰 포인트
ctx.lineTo(1400, 0); // 두번째 포인트
ctx.lineTo(1400, 700);
ctx.lineTo(200, 700);
ctx.closePath();
ctx.fillStyle = "#000";
ctx.fill();

// 슬라이드
let currentIndex = 0;
const slides = document.querySelectorAll(".slide-list");
const totalSlides = slides.length;

function showSlide(index) {
  if (index < 1) {
    currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  const translateValue = -currentIndex * 220 + "px";
  document.querySelector(
    ".slider-2"
  ).style.transform = `translateX(${translateValue})`;
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

// 자동으로 슬라이드 넘기기 (옵션)
// setInterval(nextSlide, 3000);

// 마블 버튼
// const secondcanvas = document.getElementById("mybutton");

// var crt = secondcanvas.getContext("2d");

// crt.beginPath();
// crt.moveTo(10, 0);
// crt.lineTo(150, 0);
// crt.lineTo(150, 30);
// crt.lineTo(140, 40);
// crt.lineTo(0, 40);
// crt.lineTo(0, 10);
// crt.lineTo(0, 10);
// crt.closePath();
// crt.fillStyle = "red";
// crt.fill();

// 텍스트 스타일 정의
// crt.font = "bold 19px Arial";
// crt.fillStyle = "white";

// 캔버스에 텍스트 쓰기
// crt.fillText("JOIN NOW", 25, 26);
