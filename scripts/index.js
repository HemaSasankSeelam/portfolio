let sidebarEle = document.getElementById("sidebar-links");
let changeSkillEle = document.getElementById("change-skill");

let skillsMap = new Map([
    ["HTML", "./images/html5_logo.webp"],
    ["CSS", "./images/css_logo.webp"],
    ["JAVA SCRIPT", "./images/javascript_logo.webp"],
    ["PYTHON", "./images/python_logo.webp"],
    ["POSTGRESQL", "./images/postgresql_logo.webp"],
    ["GIT", "./images/git_logo.webp"],
    ["DJANGO", "./images/django_logo.webp"],
    ["SELENIUM", "./images/selenium_logo.webp"]])




skillsMap.forEach((val, key) => {

    document.querySelectorAll("#skills .container .slider").forEach((ele) => {

        let newDiv = document.createElement("div")
        newDiv.className = "item";

        let newImage = document.createElement("img")
        newImage.src = val;

        let newP = document.createElement("p");
        newP.innerText = key;

        newDiv.appendChild(newImage);
        newDiv.appendChild(newP);

        ele.appendChild(newDiv);
    })
}
)


let cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
        else {
            entry.target.classList.remove("show")
        }
    })
},
    {
        threshold: 0.3,
        rootMargin: "0px 400px 0px 400px"

    })

document.querySelectorAll("#education .container").forEach((element) => {
    cardObserver.observe(element);
})
document.querySelectorAll("#projects div .project").forEach((element) => {
    cardObserver.observe(element);
})
cardObserver.observe(document.querySelector("#photo img"));
document.querySelectorAll("footer div").forEach((element) => {
    cardObserver.observe(element);
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function addSkillAndRemoveSkill() {

    let index = 0;
    const skillsArray = Array.from(skillsMap.keys());
    while (true) {
        const currentSkill = skillsArray.at(index);

        // Type letters
        changeSkillEle.innerText = " ";
        for (let letter of currentSkill) {
            changeSkillEle.innerText += letter;
            await sleep(250);  // speed
        }

        // Pause after typing
        await sleep(500);

        // delete letters
        for (let i = currentSkill.length; i >= 0; i--) {
            changeSkillEle.innerText = currentSkill.slice(0, i);
            await sleep(250);
        }

        // Next skill
        index = (index + 1) % skillsArray.length;
        await sleep(1000);
    }
}
addSkillAndRemoveSkill();

function openSideBar() {
    sidebarEle.style.display = "flex";
    sidebarEle.style.transform = "translateX(100%)";
    sidebarEle.style.transition = "all 10s ease-in-out";
}

function removeAllActiveClasses() {
    document.querySelectorAll("header a").forEach((ele) => {
        ele.classList.remove("active-link");
    })
}

document.querySelectorAll(".close-sidebar").forEach((ele) => {
    ele.addEventListener("click", (e) => sidebarEle.style.display = "none")
})

document.querySelectorAll("header a").forEach((ele) => {
    ele.addEventListener("click", (e) => {

        let hashTag = e.target.hash;
        removeAllActiveClasses();

        document.querySelector(`#links a[href="${hashTag}"]`).classList.add("active-link");

    })
})

function goToTop() {
    window.scrollTo({ top: 0 });

    document.getElementById("top-btn").classList.add("animate");

    setTimeout(() => {
        document.getElementById("top-btn").classList.remove("animate");
    }, 500);
}


