
//  FILE INPUT + PREVIEW

const input = document.getElementById("imageInput");

input.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    document.getElementById("fileName").innerText = file.name;
    document.getElementById("preview").src = URL.createObjectURL(file);
});


// STATUS ANIMATION

function startStatusAnimation() {
  const messages = [
    "🔍 Reading image...",
    "🌿 Detecting leaf...",
    "🟡 Detecting chlorosis...",
    "📊 Calculating results..."
  ];

  let i = 0;
  const el = document.getElementById("statusText");

  const interval = setInterval(() => {
    el.innerText = messages[i];
    i = (i + 1) % messages.length;
  }, 1000);

  return interval;
}


// 🚀 ANALYZE FUNCTION

function analyzeImage() {
  const file = document.getElementById("imageInput").files[0];

  if (!file) {
    alert("Select an image first!");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  const messages = [
    "🔍 Reading image...",
    "🌿 Detecting leaf...",
    "🟡 Detecting chlorosis...",
    "📊 Calculating results..."
  ];

  const statusEl = document.getElementById("statusText");

  //  show messages one by one
  let step = 0;

  function showNextMessage() {
    if (step < messages.length) {
      statusEl.innerText = messages[step];
      step++;
      setTimeout(showNextMessage, 900); // speed
    }
  }

  showNextMessage();

  //  call backend
  fetch("/analyze", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {

    //  wait until messages finish
    const totalTime = messages.length * 900;

    setTimeout(() => {

      if (data.error) {
        statusEl.innerText = "❌ " + data.error;
        return;
      }

      statusEl.innerText = "✅ Analysis Complete";

      
      // 📊 RESULTS
      
      document.getElementById("green").innerText = data.green_pixels;
      document.getElementById("yellow").innerText = data.yellow_pixels;
      document.getElementById("index").innerText = data.index;
      document.getElementById("condition").innerText = data.condition;
      document.getElementById("recommendation").innerText = data.recommendation;

      //  color
      const conditionEl = document.getElementById("condition");
      if (data.index < 0.2) conditionEl.style.color = "green";
      else if (data.index < 0.5) conditionEl.style.color = "orange";
      else conditionEl.style.color = "red";

      
      //  LOADERS
      
      const severity = Math.round(data.severity ?? data.index * 100);
      animateLoader(severity);

      setTimeout(() => {
        animateCircle("affectedCircle", "affectedVal",
          Number(data.affected_area) || 0, "#2196f3");
      }, 200);

      setTimeout(() => {
        animateCircle("greenCircle", "greenVal",
          Number(data.green_ratio) || 0, "green");
      }, 400);

      setTimeout(() => {
        animateCircle("yellowCircle", "yellowVal",
          Number(data.yellow_ratio) || 0, "orange");
      }, 600);

      setTimeout(() => {
        animateCircle("confCircle", "confVal",
          Number(data.confidence) || 0, "purple");
      }, 800);

     
      //  IMAGES
      
      document.getElementById("leafImg").src =
        "http://127.0.0.1:5000/" + data.leaf_img;

      document.getElementById("yellowImg").src =
        "http://127.0.0.1:5000/" + data.yellow_img;

      document.getElementById("overlayImg").src =
        "http://127.0.0.1:5000/" + data.overlay_img;

      document.getElementById("histImg").src =
        "http://127.0.0.1:5000/" + data.hist_img;

    }, totalTime);

  })
  .catch(err => {
    statusEl.innerText = "❌ Backend Error";
    console.error(err);
  });
}


// 🎯 MAIN LOADER

function animateLoader(target) {
  const circle = document.getElementById("circle");
  const text = document.getElementById("severityText");

  let current = 0;

  const interval = setInterval(() => {
    if (current >= target) {
      clearInterval(interval);
      return;
    }

    current++;
    text.innerText = current + "%";

    const color =
      current >= 50 ? "red" :
      current >= 20 ? "orange" : "green";

    circle.style.background =
      `conic-gradient(${color} ${current * 3.6}deg, #ddd 0deg)`;

  }, 15);
}


// 🔥 MINI LOADER

function animateCircle(circleId, textId, target, color) {
  const circle = document.getElementById(circleId);
  const text = document.getElementById(textId);

  if (!circle || !text) return;

  target = Math.max(0, Math.min(100, target));

  let current = 0;

  const interval = setInterval(() => {
    if (current >= target) {
      clearInterval(interval);
      return;
    }

    current++;
    text.innerText = current + "%";

    circle.style.background =
      `conic-gradient(${color} ${current * 3.6}deg, #ddd 0deg)`;

  }, 15);
}



async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const green = document.getElementById("green").innerText;
  const yellow = document.getElementById("yellow").innerText;
  const index = document.getElementById("index").innerText;
  const condition = document.getElementById("condition").innerText;
  const recommendation = document.getElementById("recommendation").innerText;
  const severity = document.getElementById("severityText")?.innerText || "0%";

  const date = new Date().toLocaleString();

  //header
  doc.setFillColor(46, 125, 50);
  doc.rect(0, 0, 210, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("Leaf Chlorosis Report", 20, 15);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Date: ${date}`, 140, 20);

  // text
  doc.setFontSize(12);
  doc.text(`Green Pixels: ${green}`, 20, 40);
  doc.text(`Yellow Pixels: ${yellow}`, 20, 50);
  doc.text(`Index: ${index}`, 20, 60);
  doc.text(`Condition: ${condition}`, 20, 70);
  

  doc.text("Recommendation:", 20, 95);
  doc.text(recommendation, 20, 105, { maxWidth: 170 });

  
  function loadImage(img) {
    return new Promise((resolve) => {
      if (!img.src) return resolve(null);

      const temp = new Image();
      temp.crossOrigin = "anonymous";
      temp.src = img.src;

      temp.onload = () => resolve(temp);
      temp.onerror = () => resolve(null);
    });
  }

  
  const leafImg = await loadImage(document.getElementById("leafImg"));
  const overlayImg = await loadImage(document.getElementById("overlayImg"));
  const histImg = await loadImage(document.getElementById("histImg"));

  let y = 130;

  if (leafImg) {
    doc.addImage(leafImg, "PNG", 20, y, 50, 50);
    doc.text("Leaf", 30, y + 55);
  }

  if (overlayImg) {
    doc.addImage(overlayImg, "PNG", 80, y, 50, 50);
    doc.text("Overlay", 90, y + 55);
  }

  if (histImg) {
    doc.addImage(histImg, "PNG", 140, y, 50, 50);
    doc.text("Histogram", 145, y + 55);
  }

  
  doc.save("chlorosis_report.pdf");
}