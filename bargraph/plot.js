//import plotly.express as px
var ems = {}
var total = {}
var fire = {}
var other = {}

var foo = [];
for (var i = 1; i <= 365; i++) {
   foo.push(i);
}

d3.csv("ACFR_Data_BCS.csv").then (function(data)
{
  data.forEach(function(input){
  
  Month = input[' Month']
if (Month <10) {
  Month = "0" + Month}

  Day = input['Day']
if (Day <10) {
  Day = "0" + Day}

  Year = input['Year']
  if (Year == '2019'){

    dt=Year+Month+Day
    

    if (dt in total){
      total[dt]+=1
    } else {
      total[dt] = 0,
      ems[dt] = 0,
      fire[dt] = 0,
      other[dt] = 0 
    } 

  if (input['Type Of Alarm'] == "EMS Call") {
    //if (dt in ems){
    ems[dt]+=1
    } //else {
    //ems[dt] = 0 
  
 
    else if (input['Type Of Alarm'] == "Fire Call"){
      //if (dt in fire){
      fire[dt]+=1
      //}//else {
    //fire[dt] = 0 
    }
  
    else if (input['Type Of Alarm'] == "Other Call"){
      //if (dt in other){
    other[dt]+=1
    //}// else {
    //other[dt] = 0 
    }
  }
}
)
var xlabel = []
var xticks = []
var count = 0 
var Cmonth = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"}

Object.keys(total).forEach(function(tt){
  count = count + 1 
  dy = tt.substring(6, 8)
  mo = tt.substring(4, 6)
  //console.log(dy, mo)
  if (dy == "01") {
    xlabel.push(Cmonth[mo])
    xticks.push(count)
  }
})
console.log(xlabel, xticks)
  var NewData = [
    {
      x: foo,
      y: Object.values(ems),
      name: 'Emergency Calls',
      type: 'bar' 
    },
    {
      x: foo, 
      y: Object.values(fire),
      name: 'Fire Calls',
      type: 'bar' 
    },
    {
      x: foo,
      y: Object.values(other),
      name: 'Other Calls',
      type: 'bar' 
    },
    
  ];
  
  var layout = {barmode: 'stack',
   xaxis: {
    tickvals: xticks,
    ticktext: xlabel
}}
  Plotly.newPlot('myDiv', NewData, layout);
})

