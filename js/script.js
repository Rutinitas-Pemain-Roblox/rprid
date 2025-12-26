/*
Configuration
------------------------
If something doesn't work please contact me on discord (Astronawta#0012).
*/

const config = {
    serverInfo: {
        serverLogoImageFileName: "logo.png", /*This is a file name for logo in /images/ (If you upload new logo with other name, you must change this value)*/
        serverName: "Rutinitas Pemain Roblox", /*Server name*/
        serverIp: "", /*Server IP (if you want to add online user counter, you must have true the enable-status and enable-query of server.properties)*/
        discordServerID: "1224228387032137768" /*Your server ID (if you want to add online user counter, you must have enabled Discord server widget)*/
    },

    /*Admin-Team
    ------------
    If you want to create new group, you must add this structure to adminTeamPage:
    <nameOfGroup>: [
        {
            inGameName: "Astronavta",
            rank: "Owner",
            skinUrlOrPathToFile: "",
            rankColor: ""
        },
    ]
    then you must add this group with same name to atGroupsDefaultColors and set the color you want for the group.
    You can also set a special color for a specific user, just put it in the rankColor of that user.

    All skins for original players are generate automaticaly. If you want to add skins to warez players, yout must add url for skin to skinUrlOrPathToFile
        {
            inGameName: "Astronavta",  <--- In-Game name
            rank: "Owner",  <-- rank
            skinUrlOrPathToFile: "",  <-- url or file path for skin image for warez players (if you have original minecraft leave it be empty)
            rankColor: "rgba(255, 3, 3, 1)"  <-- special rank color
        },

    If you want to change skin type replace userSKinTypeInAdminTeam with something you want from array in comments
    */
    userSKinTypeInAdminTeam: "bust", /*[full, bust, head, face, front, frontFull, skin]*/
    atGroupsDefaultColors: {
       pemimpin: "#fd4c3fff",
        developer: "#15f6dcff",
        admin: "rgba(0, 149, 255, 0.5)",
        moderator: "rgba(255, 217, 1, 0.5)",
    },

    /*
    Contact form
    ------------
    To activate, you need to send the first email via the contact form and confirm it in the email.
    Emails are sent via https://formsubmit.co/
    */
    contactPage: {
        email: "rutinitaspemainroblox@gmail.com"
    }
}

/*If you want to change website color go to /css/global.css and in :root {} is a color pallete (don't change names of variables, change only values)*/







/*Product Navbar*/
const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})








/*If you want everything to work as it should and you don't understand what is written here, don't touch it :D*/


/*Mobile navbar (open, close)*/
const navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelector(".links");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    navbarLinks.classList.toggle("active");
})

/*CS*/
const window_cs = document.querySelector(".contactoverlay");
const mail_line = document.getElementById("mail_line");
const close_line = document.getElementById("mail_line");
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
mail_line.style.display = "flex";
close_line.style.display = "none";
async function Buka_CS() {
    window_cs.classList.toggle("active");
    mail_line.style.display = "none";
    close_line.style.display = "flex";
    await sleep(1);
    window_cs.classList.toggle("anim");
};

async function Tutup_CS() {
    window_cs.classList.remove("anim");
    mail_line.style.display = "flex";
    close_line.style.display = "none";
    await sleep(5);
    window_cs.classList.remove("active");
};

/*FAQs*/
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", () => {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;

        if(accordionItemHeader.classList.contains("active")) accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        else accordionItemBody.style.maxHeight = "0px";
    });
});

/*Config navbar*/
const serverName = document.querySelector(".server-name");
const serverLogo = document.querySelector(".logo-img");
/*Config header*/
const serverIp = document.querySelector(".minecraft-server-ip");
const serverLogoHeader = document.querySelector(".logo-img-header");
const discordOnlineUsers = document.querySelector(".discord-online-users");
const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");
/*Config contact*/
const contactForm = document.querySelector(".contact-form");
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");

const getDiscordOnlineUsers = async () => {
    try {
        const discordServerId = config.serverInfo.discordServerID;

        const apiWidgetUrl = `https://discord.com/api/guilds/${discordServerId}/widget.json`;
        let response = await fetch(apiWidgetUrl);
        let data = await response.json();

        if(!data.presence_count) return "None";
        else return (await data.presence_count);
    } catch (e) {
        return "None";
    }
}

const setDataFromConfigToHtml = async () => {
    /*Set config data to navbar*/
    serverName.innerHTML = config.serverInfo.serverName;
    serverLogo.src = `images/` + config.serverInfo.serverLogoImageFileName;

    /*Set config data to header*/
    serverIp.innerHTML = config.serverInfo.serverIp;

    let locationPathname = location.pathname;

    if(locationPathname == "/" || locationPathname.includes("index")) {
        copyIp();
        /*Set config data to header*/
        serverLogoHeader.src = `images/` + config.serverInfo.serverLogoImageFileName;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayer();
    } else if(locationPathname.includes("rules")) {
        copyIp();
    }
    else if(locationPathname.includes("admin-team")) {
        for (let team in config.adminTeamPage) {
            const atContent = document.querySelector(".at-content");
            
            const group = document.createElement("div");
            group.classList.add("group");
            group.classList.add(team);

            const groupSchema = `
                <h2 class="rank-title">${team.charAt(0).toUpperCase() + team.slice(1)}</h2>
                <div class="users">
                </div>
            `;

            group.innerHTML = groupSchema;

            atContent.appendChild(group);

            for (let j = 0; j < config.adminTeamPage[team].length; j++) {
                let user = config.adminTeamPage[team][j];
                const group = document.querySelector("." + team + " .users");

                const userDiv = document.createElement("div");
                userDiv.classList.add("user");

                let userSkin = config.adminTeamPage[team][j].skinUrlOrPathToFile;

                if(userSkin == "") userSkin = await getSkinByUuid(user.inGameName);
                let rankColor = config.atGroupsDefaultColors[team];

                if(user.rankColor != "") {
                    rankColor = user.rankColor;
                }

                const userDivSchema = `
                    <img src="${await (userSkin)}" alt="${user.inGameName}">
                    <h5 class="name">${user.inGameName}</h5>
                    <p class="rank ${team}" style="background: ${rankColor}">${user.rank}</p>  
                `;

                userDiv.innerHTML = userDivSchema;
                group.appendChild(userDiv);
            }
        }
    } else if(locationPathname.includes("contact")) {
        contactForm.action = `https://formsubmit.co/${config.contactPage.email}`;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        inputWithLocationAfterSubmit.value = location.href;
    }
}

setDataFromConfigToHtml();

  /* ================= DATA ================= */
  const data = [
    { name: 'Founder', 
        img: 'images/Naufal.webp', 
        text: 'M Noufal Hermansah', 
        roblox: ['https://www.roblox.com/users/149241310/profile'],
        facebook: [''],
        discord: ['https://discordapp.com/users/505328349325950977'],
        website: ['']
    },
    { name: 'Ketua Founder', 
        img: 'https://picsum.photos/300/200?2', 
        text: 'Hafis Zaky Mahardika', 
        roblox: ['https://www.roblox.com/users/665901280/profile'],
        facebook: [''],
        discord: [''],
        website: ['']
    },
    { name: 'Developer', 
        img: 'images/Ata.webp', 
        text: 'Ata Halilintar', 
        roblox: ['https://www.roblox.com/users/1957220080/profile'],
        facebook: ['https://www.facebook.com/ata.254z/'],
        discord: ['https://discordapp.com/users/1159844857477615647'],
        website: ['']
    },
    { name: 'Developer', 
        img: 'images/Chaca.webp', 
        text: 'Chacaa Alyssa Silviaa', 
        roblox: ['https://www.roblox.com/users/9827550127/profile'],
        facebook: [''],
        discord: [''],
        website: ['']
    },
    { name: 'Admin FB', 
        img: 'images/Ilham.webp', 
        text: 'Illhamrifai', 
        roblox: ['https://www.roblox.com/users/717297130/profile'],
        facebook: [''],
        discord: [''],
        website: ['']
    },
    { name: 'Admin DC', 
        img: 'https://picsum.photos/300/200?6', 
        text: 'Rezi Kurniawan', 
        roblox: [''],
        facebook: [''],
        discord: [''],
        website: ['']
    },
    { name: 'Admin WA', 
        img: 'images/Angel.webp', 
        text: 'Maria Angelica', 
        roblox: ['https://www.roblox.com/users/1587001610/profile'],
        facebook: [''],
        discord: [''],
        website: ['']
    },
    { name: 'Admin', 
        img: 'https://picsum.photos/300/200?8', 
        text: 'Louis', 
        roblox: [''],
        facebook: [''],
        discord: [''],
        website: ['']
    },
    { name: 'Admin', 
        img: 'https://picsum.photos/300/200?9', 
        text: 'Muhammad Nandaka', 
        roblox: [''],
        facebook: [''],
        discord: [''],
        website: ['']
    },
    { name: 'Admin', 
        img: 'https://picsum.photos/300/200?10', 
        text: 'Sento', 
        roblox: [],
        facebook: [''],
        discord: [''],
        website: ['']
    },
    { name: 'Admin', 
        img: 'https://picsum.photos/300/200?11', 
        text: 'Gerald Vernandez', 
        roblox: [''],
        facebook: [''],
        discord: [''],
        website: ['']
    },
    { name: 'Admin', 
        img: 'https://picsum.photos/300/200?12', 
        text: 'Helion Pantheon', 
        roblox: [],
        facebook: [''],
        discord: [''],
        website: ['']
    },
    { name: 'Admin', 
        img: 'images/Rifa.webp', 
        text: 'Rifa Joestar', 
        roblox: ['https://www.roblox.com/users/1488585427/profile'],
        facebook: [''],
        discord: [''],
        website: ['']
    }
  ];

/* ============== GENERATE SLIDES ============== */
const carousel = document.getElementById('carousel');
data.forEach(item => {
    const slide = document.createElement('div');

    const socialMap = [
        { key: 'roblox', icon: 'images/roblox.png', alt: 'Roblox' },
        { key: 'facebook', icon: 'images/facebook.png', alt: 'Facebook' },
        { key: 'discord', icon: 'images/discord.png', alt: 'Discord' },
        { key: 'website', icon: 'images/browser.png', alt: 'Website' }
    ];


    const buttons = socialMap
        .filter(s => Array.isArray(item[s.key]) && item[s.key].length > 0 && item[s.key][0].trim() !== '')
        .map(s => `
            <a href="${item[s.key][0]}" target="_blank" class="social-btn">
            <img src="${s.icon}" alt="${s.alt}" class="social-icon">
            </a>
        `)
    .join('');

    slide.className = 'slide';
    slide.innerHTML = `
        <div class="card">
            <div class="name">${item.name}</div>
            <img src="${item.img}">
            <div class="text">${item.text}</div>
            ${buttons ? `<div class="social">${buttons}</div>` : ''}
        </div>
    `;
    carousel.appendChild(slide);
});

  const slides = document.querySelectorAll('.slide');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  let index = 0;
  let renderLock = false;
  let hideTimeout;
  let showTimeout;
  let interval;
  const autoDelay = 5000; // durasi slide tampil 5 detik
  const resetDelay = 4000;

  function slidesPerView() {
    return window.innerWidth < 768 ? 2 : 4;
  }

  function normalizeIndex() {
    const step = slidesPerView();
    index = Math.max(0, Math.floor(index / step) * step);
  }

  /* ============== CINEMATIC RENDER ============== */
  function render() {
    if (renderLock) return;
    renderLock = true;
    normalizeIndex();

    if (hideTimeout) clearTimeout(hideTimeout);
    if (showTimeout) clearTimeout(showTimeout);

    slides.forEach(s => {
      s.classList.remove('fade-in');
      s.classList.add('fade-out');
    });

    hideTimeout = setTimeout(() => {
      slides.forEach(s => (s.style.display = 'none'));
    }, 700);

    showTimeout = setTimeout(() => {
      const step = slidesPerView();
      const remaining = slides.length - index;
      const visible = Math.min(step, remaining);

      for (let i = 0; i < visible; i++) {
        const s = slides[index + i];
        s.style.display = 'block';
      }
      renderLock = false;
    }, 705);

    showTimeout = setTimeout(() => {
      const step = slidesPerView();
      const remaining = slides.length - index;
      const visible = Math.min(step, remaining);

      for (let i = 0; i < visible; i++) {
        const s = slides[index + i];
        requestAnimationFrame(() => {
          s.classList.remove('fade-out');
          s.classList.add('fade-in');
        });
      }
      renderLock = false;
    }, 710);
  }

  /* ============== AUTO SLIDE (FIXED) ============== */
  function startAutoSlide(delay = autoDelay) {
    stopAutoSlide();
    interval = setInterval(() => {
      const step = slidesPerView();
      index += step;
      if (index >= slides.length) index = 0;
      render();
    }, delay);
  }

  function stopAutoSlide() {
    if (interval) clearInterval(interval);
  }

  function resetAutoSlide() {
    stopAutoSlide();
    setTimeout(() => startAutoSlide(), resetDelay);
  }

  next.onclick = () => {
    index += slidesPerView();
    if (index >= slides.length) index = 0;
    render();
    resetAutoSlide();
  };

  prev.onclick = () => {
    const step = slidesPerView();
    index -= step;
    if (index < 0) {
      const remainder = slides.length % step || step;
      index = slides.length - remainder;
    }
    render();
    resetAutoSlide();
  };

  const wrapper = document.querySelector('.carousel-wrapper');
  wrapper.addEventListener('mouseenter', stopAutoSlide);
  wrapper.addEventListener('mouseleave', () => startAutoSlide());

  window.addEventListener('resize', () => {
    normalizeIndex();
    render();
  });

  /* ============== INIT ============== */
  render();
  startAutoSlide();
