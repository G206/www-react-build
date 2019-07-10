//Variables. m variables will hold all media image collections. media var will be an array of all the media image
var m_count = 9; // Total # of media files counting from 0
var m_current = -1; // Var to track current place in array
var m0 =  {
  pic: new Image(),
  caption: "Apple Mac Pro - All 4 Generations together side by side. Large vs. Small",
};
var m1 =  {
  pic: new Image(),
  caption: "HP Blackbird 002. This is what happened when HP and Voodoo got together.",
};
var m2 =  {
  pic: new Image(),
  caption: "HP Blackbird 002 Front / Side View - Huge budgets do make a difference.",
};
var m3 =  {
  pic: new Image(),
  caption: "Thermaltake Level 10 Titanium Edition. This is what happens when you let someone like BMW design your product.",
};
var m4 =  {
  pic: new Image(),
  caption: "HP Spectre 13. At 10.4mm, one of the thinest full powered laptops PERIOD.",
};
var m5 =  {
  pic: new Image(),
  caption: "2017 Ford F-150 Raptor. With 450HP Twin-Turbo V6 and 10 Speed Auto, you have both innovation and brawn.",
};
var m6 =  {
  pic: new Image(),
  caption: "2017 Ford GT. The Glory Days of the 60's are back for Ford.",
};
var m7 =  {
  pic: new Image(),
  caption: "Mercedes-Benz G63 AMG 6x6. By far the biggest and baddest of all trucks.",
};
var m8 =  {
  pic: new Image(),
  caption: "Breitling Navitimer. A Marvel is micro engineering. How do they fit 200+ parts into that case.",
};
var m9 =  {
  pic: new Image(),
  caption: "Oakley X-Metal XX. Too bad Oakley just don't make glasses like these any more.",
};
//Assign m variables to their image files
m0.pic.src = "img/apple_mac_pro_2.jpg";
m1.pic.src = "img/hp_blackbird_002_2.jpg";
m2.pic.src = "img/hp_blackbird_002_3.jpg";
m3.pic.src = "img/thermaltake_level10_case_2.jpg";
m4.pic.src = "img/hp_spectre_13_3.jpg";
m5.pic.src = "img/ford_f-150_raptor_2017.jpg";
m6.pic.src = "img/ford_gt_2017.jpg";
m7.pic.src = "img/mercedes_benz_g63_amg_6x6.jpg";
m8.pic.src = "img/breitling_navitimer_1461.jpg";
m9.pic.src = "img/oakley_x-metal_4.jpg";
var media = [m0,m1,m2,m3,m4,m5,m6,m7,m8,m9];
//Variables for linking to HTML document
var displayImg = document.querySelector(".classimg");
var displayCaption = document.querySelector(".msgframe");
var buttonNext = document.getElementById("button_next");
var buttonPrev = document.getElementById("button_prev");
var buttonAuto = document.getElementById("button_auto");
var buttonStop = document.getElementById("button_stop");

//Function to move media selected to the next choice. If at the end, then to the begining
function media_next() {
  m_current +=1;
  if (m_current > m_count) {
    m_current = 0;
  }
  displayImg.src = media[m_current].pic.src;
  displayCaption.textContent = media[m_current].caption;
}
//Function to move media selected to the previous choice. If at the begining, then to the end
function media_prev() {
  m_current -=1;
  if (m_current < 0) {
    m_current = m_count;
  }
  displayImg.src = media[m_current].pic.src;
  displayCaption.textContent = media[m_current].caption;
}
//Function to play next media
function media_auto () {
  var play = setInterval(media_next,2000);
  function media_stop (){
    clearInterval (play);
  }
  buttonStop.onclick = media_stop;
}

//Click handlers for next and pre buttons
buttonNext.onclick = media_next;
buttonPrev.onclick = media_prev;
buttonAuto.onclick = media_auto;
