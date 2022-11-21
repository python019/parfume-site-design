E = new window.E();

window.onload = () => {
	const modal = document.querySelector(".modal");
	const navTl = gsap.timeline({ defaults: { duration: 1 } });

	let slides = [...document.querySelectorAll(".slider__slide")];
	let slideTl = [];

	// add all slide timelines
	for (let i = 0; i < slides.length; i++) {
		const slide = slides[i];
		const viewMore = slide.querySelectorAll(".slider__slide__more");
		const scene = slide.querySelectorAll(".slider__slide__scene span");
		const img = slide.querySelector(".slider__slide__img");
		const number = slide.querySelector(".slider__slide__number");
		const numbers = number.querySelectorAll("span");
		const tl = gsap.timeline({
			paused: true,
			defaults: { duration: 1.1, ease: "power2.inOut" }
		});

		tl
			.to(
				img,
				{
					clipPath: "inset(18%)",
					scale: 0.95
				},
				0
			)
			.to(viewMore[0], { x: "2rem" }, 0)
			.to(viewMore[1], { x: "-2rem" }, 0)
			.to(number, { y: "0rem", duration: 1 }, 0.3)
			.to(number, { opacity: 1 }, 0.4)
			.to(numbers, { rotateY: 0, duration: 1.6 }, 0)
			.to(
				scene,
				{
					x: "0%",
					y: 0,
					opacity: 1,
					duration: 1.2
				},
				0.2
			);

		slideTl.push(tl);
	}

	// hover interaction
	E.on("mouseenter mouseleave", ".slider__slide", (e) => {
		const slide = e.target;

		const tl = slideTl[slides.indexOf(slide)];

		if (e.type === "mouseenter") {
			tl.play();
		} else {
			tl.reverse();
		}
	});

	// Next button
	E.on("click", ".js-up, .js-down", (e) => {
		const sides = document.querySelectorAll(".slider__side");

		if (navTl.isActive() === false) {
			navTl.clear();

			sides.forEach((side, k) => {
				const slides = side.querySelectorAll(".slider__slide");
				let activeSlide, nextSlide, initialClip;

				if (e.target.classList.contains("js-up")) {
					initialClip = k === 0 ? "inset(100% 0 0%)" : "inset(0 0 100%)";
				} else {
					initialClip = k === 1 ? "inset(100% 0 0%)" : "inset(0 0 100%)";
				}

				for (let i = 0; i < slides.length; i++) {
					if (slides[i].classList.contains("active")) {
						activeSlide = slides[i];
						nextSlide = slides[i + 1] || slides[0];
						break;
					}
				}

				activeSlide.classList.remove("active");
				nextSlide.classList.add("active");

				gsap.set(nextSlide, {
					autoAlpha: 1,
					scale: 1.2,
					clipPath: initialClip
				});

				navTl.to(
					nextSlide,
					{
						clipPath: "inset(0% 0 0%)",
						scale: 1,
						ease: "power2.inOut",
						duration: 1,
						onComplete: () => {
							gsap.set(activeSlide, { autoAlpha: 0 });
						}
					},
					0
				);
			});
		}
	});

	// Modal
	E.on("click", ".js-trigger", (e) => modal.classList.add("active"));
	E.on("click", ".modal", (e) => modal.classList.remove("active"));
};
