      // Hamburger Menu
      const menu_toggle = document.querySelector(".menu-toggle");
      const sidebar = document.querySelector(".sidebar");

      menu_toggle.addEventListener("click", () => {
        menu_toggle.classList.toggle("is-active");
        sidebar.classList.toggle("is-active");
      });

      const menuItems = document.querySelectorAll(".menu-item");
      menuItems.forEach((item) => {
        item.addEventListener("click", () => {
          let element;

          switch (item.textContent) {
            case "HOME":
              element = document.querySelector(".header");
              break;
            case "ABOUT":
              element = document.querySelector(".aboutUs");
              break;
            case "STORIES":
              element = document.querySelector(".storiesContainer");
              break;
            case "GALLERY":
              element = document.querySelector(".galleryContainer");
              break;
            case "CONTACT":
              element = document.querySelector(".contact");
              break;
          }

          menu_toggle.classList.toggle("is-active");
          sidebar.classList.toggle("is-active");
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "center",
          });
        });
      });

      //Slider
      const sliderContainer = document.querySelector(".sliderContainer");
      const slider = document.querySelector(".items");
      const box = document.querySelector(".box");
      const right = document.querySelector("#right");
      const left = document.querySelector("#left");

      const imageSources = [
        "01-comfortable-pillow-sofa-decoration-interiorKKK.jpg",
        "02-curtain-with-sunlightKKK.jpg",
        "03-window-curtainsKKK.jpg",
        "04-luxury-velvet-couch-room-pillowsKKK.jpg",
        "05-curtain-with-sunlight topntp26KKK.jpg",
        "06-empty-curtain-interior-decoration-living-roomKKK.jpg",
        "07-curtain-with-sunlight topntp26-02KKK.jpg",
        "08-living-elegance-room-clean-luxuryKKK.jpg",
        "09-window-curtains-lifeforstockKKK.jpg",
        "10-fabric-textured-layers-backgroundKKK.jpg",
      ];

      for (let i = 0; i < imageSources.length; i++) {
        let item = document.createElement("div");
        let itemImage = document.createElement("img");
        itemImage.src = `assets/images/curtains/${imageSources[i]}`;
        item.append(itemImage);
        item.classList.add("item");
        slider.append(item);
      }

      let currentIndex = 0;
      let displayedItem = slider.scrollLeft / box.offsetWidth;

      let sliderId;
      function moveSlider() {
        if (!sliderId) {
          sliderId = setInterval(() => {
            showSlide(currentIndex + 1);
          }, 3000);
        }
      }
      moveSlider();

      function stopSlider() {
        clearInterval(sliderId);
        sliderId = null;
      }
      window.addEventListener("resize", sweeperSliderResize);

      function sweeperSliderResize() {
        stopSlider();
        displayedItem = slider.scrollLeft / box.offsetWidth;
        if (displayedItem % 1 > 0.5) {
          displayedItem = Math.ceil(displayedItem);
        } else if (displayedItem % 1 <= 0.5) {
          displayedItem = Math.floor(displayedItem);
        }

        let boxWidthResponse;
        if (sliderContainer.offsetWidth > 768) {
          boxWidthResponse = 80;
        } else {
          boxWidthResponse = 90;
        }
        const currentWidth = sliderContainer.offsetWidth;
        let aspectWidth = currentWidth > 1440 ? 16 : 15;

        let aspectHeight = aspectWidth == 16 ? 9 : 10;

        box.style.width =
          Math.floor((sliderContainer.offsetWidth / 100) * boxWidthResponse) +
          "px";
        let boxWidth = box.offsetWidth;

        box.style.height = (boxWidth / aspectWidth) * aspectHeight + "px";
        slider.scrollLeft = displayedItem * boxWidth;

        moveSlider();
      }

      sweeperSliderResize();

      window.addEventListener("load", (event) => {
        document.querySelector(".loader").style.display = "none";
      });

      let isDown = false;
      let startX;
      let startY;
      let boxLeft;
      let walk;
      let verticalWalk;
      let insideUp = false;
      let sliderImageView = false;

      let boxWidth = box.offsetWidth;

      function showSlide(index) {
        const slides = document.querySelectorAll(".item");
        const slideWidth = slides[0].offsetWidth;

        if (index < 0) {
          index = slides.length - 1;
        } else if (index >= slides.length) {
          index = 0;
        }

        slider.scroll({
          left: index * slideWidth,
          behavior: "smooth",
        });

        currentIndex = index;
      }

      function startDrag(e) {
        stopSlider();
        let xValue;
        let yValue;
        if (e.type === "touchstart") {
          xValue = e.touches[0].pageX;
          yValue = e.touches[0].pageY;
        } else if (e.type === "mousedown") {
          xValue = e.pageX;
        }

        isDown = true;

        let boxWidth = box.offsetWidth;
        if (slider.scrollLeft % boxWidth !== 0) {
          slider.scroll({
            behavior: "auto",
          });
          insideUp = true;
        }

        startX = xValue - slider.offsetLeft;
        startY = yValue;
        boxLeft = slider.scrollLeft;
      }

      slider.addEventListener("mousedown", startDrag);

      slider.addEventListener("touchstart", startDrag);

      slider.addEventListener("mouseleave", endDrag);

      function endDrag(e) {
        isDown = false;

        if (walk == 0 && insideUp == false) {
          sliderImageView = true;
          return;
        } else {
          sliderImageView = false;
        }

        if (insideUp && walk <= 0) {
          let currentSliderLeft = slider.scrollLeft;
          let boxWidth = box.offsetWidth;
          slider.scroll({
            left:
              currentSliderLeft + (boxWidth - (currentSliderLeft % boxWidth)),
            behavior: "smooth",
          });

          currentIndex = Math.ceil(slider.scrollLeft / box.offsetWidth);
          insideUp = false;
        } else if (insideUp && walk > 0) {
          let currentSliderLeft = slider.scrollLeft;
          let boxWidth = box.offsetWidth;

          slider.scroll({
            left: currentSliderLeft - (currentSliderLeft % boxWidth),
            behavior: "smooth",
          });

          currentIndex = Math.floor(slider.scrollLeft / box.offsetWidth);

          insideUp = false;
        } else if (walk < 0 && walk > -50) {
          if (currentIndex == imageSources.length - 1) {
            return;
          }
          let currentSliderLeft = slider.scrollLeft;
          let boxWidth = box.offsetWidth;
          slider.scroll({
            left: currentSliderLeft + walk,
            behavior: "smooth",
          });
        } else if (walk < -50) {
          showSlide(currentIndex + 1);
        } else if (walk > 50) {
          showSlide(currentIndex - 1);
        } else if (walk > 0 && walk <= 50) {
          if (currentIndex == 0) {
            return;
          }
          let currentSliderLeft = slider.scrollLeft;
          let boxWidth = box.offsetWidth;
          slider.scroll({
            left: currentSliderLeft + walk,
            behavior: "smooth",
          });
        }
        walk = 0;
        setTimeout(moveSlider, 5000);
      }

      slider.addEventListener("mouseup", endDrag);
      slider.addEventListener("touchend", endDrag);

      function drag(e) {
        let xValue;
        let yValue;
        if (e.type === "touchmove") {
          xValue = e.touches[0].pageX;
          yValue = e.touches[0].pageY;
        } else if (e.type === "mousemove") {
          xValue = e.pageX;
        }

        if (!isDown) {
          return;
        }
        e.preventDefault();

        const x = xValue - slider.offsetLeft;

        walk = x - startX;

        if (e.type === "touchmove") {
          const y = yValue;
          verticalWalk = startY - y;
          if (walk < 20 && walk > -20) {
            if (verticalWalk > 7 || verticalWalk < -7) {
              isDown = false;
              setTimeout(moveSlider, 5000);
            }
          }
        }

        slider.scrollLeft = boxLeft - walk;
      }

      slider.addEventListener("mousemove", drag);

      slider.addEventListener("touchmove", drag);

      right.addEventListener("click", (e) => {
        stopSlider();
        showSlide(currentIndex + 1);
        setTimeout(moveSlider, 5000);
      });

      left.addEventListener("click", (e) => {
        stopSlider();
        showSlide(currentIndex - 1);
        setTimeout(moveSlider, 5000);
      });

      right.addEventListener("mouseover", stopSlider);
      left.addEventListener("mouseover", stopSlider);

      right.addEventListener("mouseout", moveSlider);
      left.addEventListener("mouseout", moveSlider);


      //Stories
      const storiesBox = document.querySelector(".stories");
      const addStoryModal = document.querySelector(".addStoryModal");
      const addUserStory = document.querySelector("#addUserStory");
      const submitUserStory = document.querySelector("#submitUserStory");
      const closeStoryModal = document.querySelector("#closeStoryModal");
      const userStoryName = document.querySelector("#userStoryName");
      const userStory = document.querySelector("#userStory");

      let modalActive = false;
      addUserStory.addEventListener("click", () => {
        addStoryModal.style.display = "flex";
        modalActive = true;
        history.pushState({ modal: true }, "", "#modal");
      });

      closeStoryModal.addEventListener("click", () => {
        addStoryModal.style.display = "none";
        history.replaceState(
          {},
          document.title,
          window.location.pathname + window.location.search
        );

        modalActive = false;
      });

      function closeModalWindow() {
        const addStoryModal = document.querySelector(".addStoryModal");

        addStoryModal.style.display = "none";
      }

      submitUserStory.addEventListener("click", (event) => {
        event.preventDefault();

        if (userStoryName.checkValidity() && userStory.checkValidity()) {
          let storyBox = document.createElement("div");
          storyBox.classList.add("storyBox");

          let name = document.createElement("p");
          name.textContent = `- ${userStoryName.value}`;

          let story = document.createElement("p");
          story.textContent = `"${userStory.value}"`;

          storyBox.append(story);
          storyBox.append(name);
          storiesBox.append(storyBox);
          userStoryName.value = "";
          userStory.value = "";
          closeModalWindow();
        } else {
          userStoryName.reportValidity();
          userStory.reportValidity();
        }
        history.replaceState(
          {},
          document.title,
          window.location.pathname + window.location.search
        );
        modalActive = false;
      });

      // Gallery
      const gallery = document.querySelector(".gallery");
      const closeimageModal = document.querySelector("#closeimageModal");

      function galleryMaker() {
        for (let i = 0; i < imageSources.length; i++) {
          let img = document.createElement("img");
          img.src = `assets/images/curtains/${imageSources[i]}`;
          gallery.append(img);
        }
      }

      galleryMaker();

      const galleryImages = gallery.querySelectorAll("img");

      const imageModal = document.querySelector(".imageModal");

      galleryImages.forEach((image) => {
        image.addEventListener("click", (e) => {
          imageModal.append(image.cloneNode());
          imageModal.style.display = "flex";

          modalActive = true;
          history.pushState({ modal: true }, "", "#modal");

          closeimageModal.addEventListener("click", () => {
            const modalImage = imageModal.querySelector("img");
            if (modalImage) {
              modalImage.remove();
            }
            imageModal.style.display = "none";
            history.replaceState(
              {},
              document.title,
              window.location.pathname + window.location.search
            );
          });
        });
      });

      const sliderImages = document.querySelectorAll(".item");

      sliderImages.forEach((image) => {
        image.addEventListener("click", (e) => {
          if (sliderImageView) {
            imageModal.append(image.firstChild.cloneNode());
            imageModal.style.display = "flex";
            modalActive = true;
            history.pushState({ modal: true }, "", "#modal");

            closeimageModal.addEventListener("click", () => {
              const modalImage = imageModal.querySelector("img");
              if (modalImage) {
                modalImage.remove();
              }
              imageModal.style.display = "none";
              history.replaceState(
                {},
                document.title,
                window.location.pathname + window.location.search
              );
              modalActive = false;
              setTimeout(moveSlider, 5000);
            });
          } else {
            e.preventDefault();
          }
        });
      });

      // Mobile back button
      window.addEventListener("popstate", function (event) {
        if (modalActive) {
          addStoryModal.style.display = "none";
          imageModal.style.display = "none";
          history.replaceState(
            {},
            document.title,
            window.location.pathname + window.location.search
          );
          modalActive = false;
          setTimeout(moveSlider, 5000);
        } else {
          return;
        }
      });