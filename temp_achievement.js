const allAchievementsDOM = document.querySelector(".achievement");

const urlParams = new URLSearchParams(window.location.search);
const achievement = urlParams.get("achievement");

//Achievements
class Achievements {
  async getAchievements() {
    try {
      let result = await fetch("achievement.json");

      let data = await result.json();

      let achievements = data.items;

      achievements = achievements.map((item) => {
        const {
          name,
          competition,
          place,
          organizers,
          projectDate,
          duration,
          preparationTime,
          category,
          location,
          team,
          prize,
          problemStatement,
          aboutCompetition,
          solution,
          image1,
          image2,
          image3,
          image4,
          image5,
          image6,
          image7,
          image8,
          image9,
          image10,
          video,
        } = item.fields;
        const { id } = item.sys;

        return {
          name,
          competition,
          place,
          organizers,
          projectDate,
          duration,
          preparationTime,
          category,
          location,
          team,
          prize,
          problemStatement,
          aboutCompetition,
          solution,
          image1,
          image2,
          image3,
          image4,
          image5,
          image6,
          image7,
          image8,
          image9,
          image10,
          video,
        };
      });
      return achievements;
    } catch (error) {
      console.log(error);
    }
  }
}

class AchievementsUI {
  filter(achievements) {
    let result = ``;
    //console.log(project);
    achievements.forEach((product) => {
      if (achievement == product.name) {
        var id = product.id;
        var name = product.name;
        var competition = product.competition;
        var place = product.place;
        var organizers = product.organizers;
        var projectDate = product.projectDate;
        var duration = product.duration;
        var preparationTime = product.preparationTime;
        var category = product.category;
        var location = product.location;
        var team = product.team;
        var prize = product.prize;
        var problemStatement = product.problemStatement;
        var aboutCompetition = product.aboutCompetition;
        var solution = product.solution;
        var image1 = product.image1;
        var image2 = product.image2;
        var image3 = product.image3;
        var image4 = product.image4;
        var image5 = product.image5;
        var image6 = product.image6;
        var image7 = product.image7;
        var image8 = product.image8;
        var image9 = product.image9;
        var image10 = product.image10;
        if (product.video == "Empty") {
          var video = ``;
        } else {
          var video = `<iframe width="560" height="315" src="${product.video}"frameborder="0" allowfullscreen></iframe>`;
        }
        if (product.image2 == "Empty") {
          var certificate = product.image1;
        } else {
          var certificate = product.image2;
        }
        if (
          achievement == "SIH" ||
          achievement == "IFA" ||
          achievement == "TNSCST" ||
          achievement == "TCS_XR_Pro"
        ) {
          var carousel = `<div class="project-details-slider swiper">
          <div class="swiper-wrapper align-items-center">
          <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="assets/img/acheivements/${image3}.jpg" alt="">
            </div>
            <div class="carousel-item">
              <img src="assets/img/acheivements/${image5}.jpg" alt="">          
            </div>
            <div class="carousel-item">
              <img src="assets/img/acheivements/${image4}.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="assets/img/acheivements/${image1}.jpg" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
          </div>            
        </div>`;
        } else if (achievement == "EXPO_19" || achievement == "SAR_Tire2") {
          var carousel = `<div class="project-details-slider swiper">
          <div class="swiper-wrapper align-items-center">
          <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="assets/img/acheivements/${image1}.jpg" alt="">
            </div>
            <div class="carousel-item">
              <img src="assets/img/acheivements/${image3}.jpg" alt="">          
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
          </div>            
        </div>`;
        } else {
          var carousel = `<div class="project-details-slider swiper">
          <div class="swiper-wrapper align-items-center">
          <img src="assets/img/acheivements/${image1}.jpg" alt="">              
        </div>`;
        }

        // Build image gallery (Swiper)
        let imageGallery = "";
        const images = [
          image1,
          image2,
          image3,
          image4,
          image5,
          image6,
          image7,
          image8,
          image9,
          image10,
        ].filter((img) => img && img !== "Empty");
        images.forEach((img, idx) => {
          imageGallery += `<div class="swiper-slide"><img src="assets/img/acheivements/${img}.jpg" alt="${name} Achievement Image ${
            idx + 1
          }"></div>`;
        });
        let gallerySection = `
          <div class="project-gallery">
            <div class="swiper project-details-slider">
              <div class="swiper-wrapper align-items-center">
                ${imageGallery}
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>`;

        // Build info card
        let infoCard = `
          <div class="card glass-card h-100">
            <div class="card-body">
              <h3 class="card-title mb-4">
                <i class="bi bi-info-circle me-2"></i>Achievement Information
              </h3>
              <div class="project-info-list">
                <div class="info-item mb-3"><div class="info-label"><i class="bi bi-tag me-2"></i><strong>Category</strong></div><div class="info-value">${category}</div></div>
                <div class="info-item mb-3"><div class="info-label"><i class="bi bi-award me-2"></i><strong>Place</strong></div><div class="info-value">${place}</div></div>
                <div class="info-item mb-3"><div class="info-label"><i class="bi bi-calendar me-2"></i><strong>Date</strong></div><div class="info-value">${projectDate}</div></div>
                <div class="info-item mb-3"><div class="info-label"><i class="bi bi-clock me-2"></i><strong>Duration</strong></div><div class="info-value">${duration}</div></div>
                <div class="info-item mb-3"><div class="info-label"><i class="bi bi-hourglass-split me-2"></i><strong>Preparation</strong></div><div class="info-value">${preparationTime}</div></div>
                <div class="info-item mb-3"><div class="info-label"><i class="bi bi-people me-2"></i><strong>Team</strong></div><div class="info-value">${team}</div></div>
                <div class="info-item mb-3"><div class="info-label"><i class="bi bi-geo-alt me-2"></i><strong>Location</strong></div><div class="info-value">${location}</div></div>
                <div class="info-item mb-3"><div class="info-label"><i class="bi bi-building me-2"></i><strong>Organizers</strong></div><div class="info-value">${organizers}</div></div>
                <div class="info-item mb-3"><div class="info-label"><i class="bi bi-gift me-2"></i><strong>Prize</strong></div><div class="info-value">${prize}</div></div>
              </div>
            </div>
          </div>`;

        // Build description/sections
        let problemSection =
          problemStatement && problemStatement.trim() !== ""
            ? `
          <div class="card glass-card mb-4"><div class="card-body">
            <h3 class="card-title mb-4"><i class="bi bi-question-circle me-2"></i>Problem Statement</h3>
            <div class="project-description">${problemStatement}</div>
          </div></div>`
            : "";
        let aboutSection =
          aboutCompetition && aboutCompetition.trim() !== ""
            ? `
          <div class="card glass-card mb-4"><div class="card-body">
            <h3 class="card-title mb-4"><i class="bi bi-info-square me-2"></i>About Competition</h3>
            <div class="project-description">${aboutCompetition}</div>
          </div></div>`
            : "";
        let solutionSection =
          solution && solution.trim() !== ""
            ? `
          <div class="card glass-card mb-4"><div class="card-body">
            <h3 class="card-title mb-4"><i class="bi bi-lightbulb me-2"></i>Solution</h3>
            <div class="project-description">${solution}</div>
          </div></div>`
            : "";
        let videoSection =
          product.video && product.video !== "Empty"
            ? `
          <div class="card glass-card mb-4"><div class="card-body">
            <h3 class="card-title mb-4"><i class="bi bi-play-circle me-2"></i>Demo Video</h3>
            <div class="project-video"><div class="ratio ratio-16x9"><iframe src="${product.video}" frameborder="0" allowfullscreen></iframe></div></div>
          </div></div>`
            : "";

        result += `
          <section id="achievement-details" class="project-details section-bg">
            <div class="container" data-aos="fade-up">
              <div class="section-title">
                <h2>${name}</h2>
              </div>
              <div class="row gy-4">
                <div class="col-lg-8">${gallerySection}</div>
                <div class="col-lg-4">${infoCard}</div>
              </div>
              <div class="row mt-5">
                <div class="col-12">
                  ${problemSection}
                  ${aboutSection}
                  ${solutionSection}
                  ${videoSection}
                </div>
              </div>
            </div>
          </section>`;
      } else {
      }
    });
    try {
      allAchievementsDOM.innerHTML = result;
    } catch (e) {
      console.log("Error = " + e);
    }
  }
}

//Filter
function filter() {
  const achievements = new Achievements();
  //console.log(products);
  const ui = new AchievementsUI();
  achievements.getAchievements().then((achievements) => {
    ui.filter(achievements);
  });
}
filter();
