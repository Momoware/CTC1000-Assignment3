let apiKey = "MKAMhqxNra8twx4BzVGOO5XJMPS6T7Ni";
let apiKey2 = "0jMJsZ5XamnYGnlMLoOwAmsvaWKGE9NJ";
let keyword, page, input, yearInput1, yearInput2;
let year1;
let year2;

//let url1 = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword 
//+ "&page=1&begin_date=20100101&end_date=20150301" + "&api-key=" + apiKey;
//let url2 = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword 
//+ "&page=2&begin_date=20100101&end_date=20150301" + "&api-key=" + apiKey2;
let result = [];
let result2 = [];
// a = 3; b = 1; c = 2; d = 3; e = 1; f = 1
let testArray;
let testArray2 = ["a", "b", "b", "a", "b", "c"];
let myDict = [];
let myDict2 = [];

function preload() {
  neueHaasReg = loadFont('NHaasGroteskTXPro-55Rg.ttf');
  neueHaasMed = loadFont('NHaasGroteskTXPro-65Md.ttf')
  testArray = ["a", "b", "c", "d", "a", "c", "d", "e", "a", "d", "f"];
}


function setup() {
  // put setup code here
  createCanvas(1920, 1080);
  background(240);
//  retrieveData("election");
//  textSize(50);
  input = createInput('search term');
  input.position(width/2, height - 125);
  input.size(100);
  input.changed(newInput);

  yearInput1 = createInput('year1');
  yearInput1.position(width/2, height - 100);
  yearInput1.size(100);
  yearInput1.changed(yearInp1);

  yearInput2 = createInput('year2');
  yearInput2.position(width/2, height - 75);
  yearInput2.size(100);
  yearInput2.changed(yearInp2);

  button = createButton('confirm');
  button.position(990, height - 50);
  button.mouseReleased(dataInitiate);
}

function newInput() {
  result = [];
  myDict = [];
  result2 = [];
  myDict2 = [];
  console.log(input.value());
  keyword = input.value();
}

function yearInp1() {
  result = [];
  myDict = [];
  result2 = [];
  myDict2 = [];
  console.log(yearInput1.value());
  year1 = yearInput1.value()
}

function yearInp2() {
  result = [];
  myDict = [];
  result2 = [];
  myDict2 = [];
  console.log(yearInput2.value());
  year2 = yearInput2.value()
}

function dataInitiate() {
//  result = [];
//  myDict = [];
  retrieveData(keyword)
  dataSort(); 
  retrieveData2(keyword)
  dataSort2(); 
}

function dataSort() {
  addDict(result, myDict);
  mySort(myDict)
}

function dataSort2() {
  addDict(result2, myDict2);
  mySort(myDict2)
}

function draw() {
  drawSorted(myDict, myDict2);

  drawTitleLeft(keyword, year1);
  drawTitleRight(keyword, year2)
  bottomBar();
}


function drawSorted(sorted, sorted2) {
  let leftC = color(9, 13, 32);
  background(leftC);
  let lastX = 30;
  //let maxSize = 5000 / sorted.length;
  let maxSize = 50;
  textSize(maxSize);
  let lastY = 30 + textAscent();
  let c = color(32, 229, 178, 255);
  let margin = 30;
  drawTexts(sorted, lastX, lastY, maxSize, width / 2, c);
  

  let rightC = color(203, 188, 178);
  noStroke();
  fill(leftC);
  rect(width / 2 - margin, 0, margin + 10, height);
//  rect(0, height - margin, width / 2, margin);
  fill(rightC);
  rect(1920 / 2 + 10, 0, 970, 1080);
  lastX = 1920 / 2 + 30;
  //maxSize = 5000 / sorted2.length;
  //maxSize = 70;
  textSize(maxSize);
  lastY = 30 + textAscent(); 
  c = color(242, 76, 0);
  drawTexts(sorted2, lastX, lastY, maxSize, width - 30, c);

  fill(rightC);
  rect(width / 2, height - margin, width / 2, margin);
  rect(width / 2, 0, margin, height);
  rect(width - margin, 0, margin, height)
}

function drawTitleLeft(keyw, year) {
  let tc = color(5, 5, 5);
  let bc = color(243, 213, 63);

  textSize(100);
  let curStr =  keyw + " " + year;
  let curWidth = textWidth(curStr);
  let curHeight = textAscent();
  
  let tX = width / 4 - curWidth / 2; 
  let tY = height - 2 * curHeight;
  
  fill(bc);
  rect(tX - 25, tY - curHeight - 10, curWidth + 50, curHeight + 40)
  fill(tc);
  text(curStr, tX, tY);
}

function drawTitleRight(keyw, year) {
  let tc = color(5, 5, 5);
  let bc = color(243, 213, 63);
  textSize(100);
  let curStr = keyw + " " + year;
  let curWidth = textWidth(curStr);
  let curHeight = textAscent();
  
  let tX = width * 0.75 - curWidth / 2; 
  let tY = height - 2 * curHeight;
  
  fill(bc);
  rect(tX - 25, tY - curHeight - 10, curWidth + 50, curHeight + 40)
  fill(tc);
  text(curStr, tX, tY);
}

function bottomBar() {
  fill(255, 255, 255);
  textSize(100);
  rect(0, height - 1.5 * textAscent(), width, 2 * textAscent())
}


function drawTexts(texts, initialX, initialY, tSize, maxWidth, tColor) {
  let lastWidth, lastHeight, maxCount, lastCount, lastSize, lastAlpha;
  let gotX = initialX;
  let gotY = initialY;
  for (i = 0; i < texts.length; i ++) {
    if (i == 0) {
      textFont(neueHaasReg);
      textSize(tSize);
      lastSize = tSize;
      maxCount = texts[i].count;
      lastCount = maxCount;
      lastAlpha = 255;
      fill(tColor);
      text(texts[i].content + " & ", gotX, gotY);
      lastWidth = textWidth(texts[i].content + " & ");
      lastHeight = textAscent();
    } else {
      if (gotX + lastWidth > maxWidth) {
        gotY += (lastHeight * 0.9);
        gotX = initialX;
      } else {
        gotX += lastWidth;
      }
      let currentCount = texts[i].count;
      textFont(neueHaasReg);
      if (currentCount < lastCount) {
        lastAlpha = lastAlpha - 5;
      }
      tColor = color(red(tColor), green(tColor), blue(tColor), lastAlpha);
      fill(tColor);
      text(texts[i].content + " & ", gotX, gotY);
      lastWidth = textWidth(texts[i].content + " & ");
      lastHeight = textAscent();
    }
  }
}

function Record(str, num) {
  this.content = str;
  this.count = num;
}

function keyPressed() {
  if (keyCode == 83) {
    save()
  }
}

function keyReleased() {
  
}


function retrieveData(key) {
  keyword = key;
  let page = 1;
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword 
  + "&page=" + str(page) + "&begin_date=" + year1 +"0101&end_date=" + year1 + "1231" + "&api-key=" + apiKey;
  loadJSON(url, gotData);
//  page = 2;
//  loadJSON(url, gotData);
  page = 3;
  loadJSON(url, gotData);
  url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword 
  + "&page=" + str(page) + "&begin_date=" + year1 + "0101&end_date=" + year1 + "1231" + "&api-key=" + apiKey2;
  page = 2;
  loadJSON(url, gotData);
//  page = 4;
//  loadJSON(url, gotData);
//  page = 6;
//  loadJSON(url, gotData);
}


function retrieveData2(key) {
  keyword = key;
  let page = 1;
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword 
  + "&page=" + str(page) + "&begin_date=" + year2 +"0101&end_date=" + year2 + "1231" + "&api-key=" + apiKey;
  loadJSON(url, gotData2);
//  page = 2;
//  loadJSON(url, gotData2);
//  page = 3;
//  loadJSON(url, gotData);
  url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword 
  + "&page=" + str(page) + "&begin_date=" + year2 + "0101&end_date=" + year2 + "1231" + "&api-key=" + apiKey2;
  page = 2;
  loadJSON(url, gotData2);
  page = 3;
//  loadJSON(url, gotData2);
//  page = 6;
//  loadJSON(url, gotData);
}

/*
function retrieveData(keyword) {
  let page = 1;
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword 
  + "&page=" + str(page) + "&begin_date=20100101&end_date=20100301" + "&api-key=" + apiKey;
  loadJSON(url, gotData);
  page = 2;
  loadJSON(url, gotData);
  url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword 
  + "&page=" + str(page) + "&begin_date=20100101&end_date=20100301" + "&api-key=" + apiKey2;
  page = 3;
  loadJSON(url, gotData);
  page = 4;
  loadJSON(url, gotData);

  console.log(result)
}
*/

function gotData(data) {
  let articles = data.response.docs;
  let resultTemp = [];
  let keywordsTemp;
  for (let i = 0; i < 10; i ++) {
    keywordsTemp = articles[i].keywords;
    for (let j = 0; j < keywordsTemp.length; j ++) {
      keywordsTemp[j] = keywordsTemp[j].value;
    }
    resultTemp = concat(resultTemp, keywordsTemp); 
  }
  result = concat(result, resultTemp);
}

function gotData2(data) {
  let articles = data.response.docs;
  let resultTemp = [];
  let keywordsTemp;
  for (let i = 0; i < 10; i ++) {
    keywordsTemp = articles[i].keywords;
    for (let j = 0; j < keywordsTemp.length; j ++) {
      keywordsTemp[j] = keywordsTemp[j].value;
    }
    resultTemp = concat(resultTemp, keywordsTemp); 
  }
  result2 = concat(result2, resultTemp);
}

function addDict(alos, adic) {
  console.log("is executed!");
  console.log(alos);
  let counter = 1;
  let sorted = alos.sort(); 
  for (i = 0; i < (sorted.length - 1); i ++) {
      let current = sorted[i];
      let next = sorted[i + 1];
      if (current == next) {
          counter += 1;
      } else {
          if (i == (sorted.length - 2)) {
              append(adic, new Record(current, counter));
              append(adic, new Record(sorted[i + 1], 1));
          } else {
              append(adic, new Record(current, counter));
              counter = 1;
          }
      }
  }
}

function mySort(records) {
  records.sort(function(a, b) {
      return b.count - a.count;
  } )
}

