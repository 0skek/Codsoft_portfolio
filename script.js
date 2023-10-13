gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
	el: document.querySelector("#main"),
	smooth: true
});

var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
document.addEventListener("mousemove", function(dets) {
	crsr.style.left = dets.x + "px"
	crsr.style.top = dets.y + "px"
})

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
	scrollTop(value) {
		return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
	}, getBoundingClientRect() {
		return {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight
		};
	},
});

ScrollTrigger.refresh();

locoScroll.stop()

function loadingAnimation() {
	var timer = document.querySelector("#timer h1");
	var timerButton = document.querySelector("#timer button");
	var grow = 0;
	var int = setInterval(function() {
		if (grow < 90) {
			grow += Math.floor(Math.random() * 20);
			timer.innerHTML = grow + "%";
		} else {
			grow = 100;
			timer.innerHTML = grow + "%";
			timer.style.transform = "translateY(-100%)";
			timerButton.style.transform = "translateY(-100%)";
			timerButton.style.opacity = "1";

			clearInterval(int);
		}
	}, Math.floor(0));

	var btn = document.querySelector("#page1 button")
	btn.addEventListener("click", function() {
		locoScroll.start()
		var tl = gsap.timeline()
		tl.to("#page1", {
			scale: 1,
			duration: 0.6
		}, "anim")
		tl.to("#main", {
			overflowY: "auto"
		}, "anim")
		tl.to("#ami", {
			opacity: 1,
		}, "anim");
		tl.to(btn, {
			opacity: 0
		}, "anim")
		tl.to("#nav", {
			y: 0
		})
	})

}

loadingAnimation()

var text = document.querySelector("#page2-part1 h1").textContent
var clutter = ""
text.split("").forEach(function(elem) {
	clutter += `<span>${elem}</span>`
})

document.querySelector("#page2-part1 h1").innerHTML = clutter

var tl = gsap.timeline({
	scrollTrigger: {
		trigger: "#page2",
		scroller: "#main",
		scrub: 2,
		pin: true,
		start: "top 0",
		end: "top -150%"
	}
})
tl.to("#page2 h1 span", {
	color: "#111",
	stagger: 0.2,
})
tl.to("#page2-part1", {
	transform: "translateX(-100vw)",
	duration: 10
}, "anim")
tl.to("#page2-part2", {
	transform: "translateX(-100vw)",
	duration: 30
}, "anim")

var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page3",
        scroller: "#main",
        start: "top 0",
        end: "top -500%",
        scrub: 2,
        pin: true
    }
})

textElements.forEach(text => {
	gsap.to(text, {
		backgroundSize: '100%',
		ease: 'none',
		scrollTrigger: {
			trigger: text,
			scrub: true,
		},
	});
});