const fetch = require('node-fetch');

// barrels = [
//   { current: 70, code: 'F78SRI33FT76', currentTemp: 5 },
//   { current: 30, code: 'F78SRI33FT55', currentTemp: 6 },
//   { current: 90, code: 'F78SRI33FT55', currentTemp: 4 },
//   { current: 85, code: 'F78SRI33FT34', currentTemp: 4.6 },
// ];
const barrels = [
  { current: 60, code: 'barrel1', currentTemp: 5 },
  { current: 30, code: 'barrel2', currentTemp: 6 },
  { current: 60, code: 'barrel3', currentTemp: 4 },
  { current: 40, code: 'barrel4', currentTemp: 4.6 },
];
// https://wine-monitoring-fa.azurewebsites.net/api/AddData?cellar=cellar2&tempLevel=5.3&wineLevel=56&barrel=barrel5
var run = async function () {
  setInterval(async () => {
    console.log('sending data');
    await sendData();
  }, 5000);
};

var sendData = async () => {
  barrels.forEach(async (bar) => {
    var level = Math.floor(Math.random() * 500) / 100;
    level = Math.random() > 0.5 ? bar.current + level : bar.current - level;
    bar.current = level;

    var temp = Math.floor(Math.random() * 200) / 100;
    temp = Math.random() > 0.5 ? bar.currentTemp + temp : bar.currentTemp - temp;
    bar.currentTemp = temp;
    await setLevelAndTemp(bar.code, level, temp);
  });
};
var setLevelAndTemp = async (code, level, temp) => {
  console.log(code, temp, level);
  await fetch(
    `https://wine-monitoring-fa.azurewebsites.net/api/AddData?cellar=cellar2&tempLevel=${temp}&wineLevel=${level}&barrel=${code}`,
    {
      method: 'GET',
    }
  );
};
run();
