let mic, fft, amp;
let rotation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT(0.8, 512);
  fft.setInput(mic);

  amp = new p5.Amplitude();
  amp.setInput(mic);

  textAlign(CENTER, CENTER);
  textFont('Princess Sofia');
}

function draw() {
    background(0, 10); // 완전한 덮개가 아니라 반투명으로 덮음
  
    let vol = amp.getLevel();
    let waveform = fft.waveform();
    rotation += map(vol, 0, 1, 0, 70);
  
    const labelSize = height * 0.2;
  
    push();
    translate(width / 2, height / 2);
    rotate(rotation);
  
    // 외곽 Glow 링
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    ellipse(0, 0, height * 0.8);
  
    // FFT 파장 라인
    noFill();
    stroke(255, 255, 255, 150);
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      let angle = map(i, 0, waveform.length, 0, 360);
      let radius = height * 0.4 + waveform[i] * 800; // multiplier 늘림!
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
  
    // 중앙 그라데이션 디스크
    noStroke();
    for (let r = labelSize; r >= 0; r--) {
      let t = r / labelSize;
      let c;
      if (t <= 0.10) {
        c = lerpColor(color('#000000'), color('#FFFB00'), t / 0.10);
      } else if (t <= 0.22) {
        c = lerpColor(color('#FFFB00'), color('#F1FB02'), (t - 0.10) / 0.12);
      } else if (t <= 0.36) {
        c = lerpColor(color('#F1FB02'), color('#00FF2B'), (t - 0.22) / 0.14);
      } else if (t <= 0.47) {
        c = lerpColor(color('#00FF2B'), color('#00D664'), (t - 0.36) / 0.11);
      } else if (t <= 0.65) {
        c = lerpColor(color('#00D664'), color('#0145FF'), (t - 0.47) / 0.18);
      } else if (t <= 0.93) {
        c = lerpColor(color('#0145FF'), color('#6F4E1D'), (t - 0.65) / 0.28);
      } else {
        c = lerpColor(color('#6F4E1D'), color('#FFFFFF'), (t - 0.93) / 0.07);
      }
      fill(c);
      ellipse(0, 0, r * 2, r * 2);
    }
  
    // 테두리
    noFill();
    stroke(255);
    strokeWeight(2);
    ellipse(0, 0, labelSize * 2);
  
    // 텍스트
    noStroke();
    fill(255);
    let titleSize = labelSize * 0.15;
    let creditSize = labelSize * 0.14;
  
    textSize(titleSize);
    text("The Sounds\nof\nEarth", 0, -labelSize * 0.5);
  
    textSize(creditSize);
    text("Choi soo bin\nfrom\nPlanet Earth", 0, labelSize * 0.53);
  
    pop();
  }
  

function mousePressed() {
  getAudioContext().resume();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
