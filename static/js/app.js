
d3.csv("incident-type-and-response-times.csv").then(function(data){
    console.log(data)

    buildPlots()
    
    function buildPlots(){
        // var incidentType = data[0]["Basic Type Of Alarm (FD1.50)"]
        var incidentType = ["EMS Call", "Fire Call", "Other Call", "Total Calls"]
        for (var i =0; i<incidentType.length; i++){
        dropdown = d3.select("#selDataset").append("option").text(incidentType[i])
        }
      

    // d3.selectAll("#selDataset").on("change", dropDownRefresh)
    // var sampleNums = data.names
    // for (var i =0; i<sampleNums.length; i++){
    //     dropdown = d3.select("#selDataset").append("option").text(sampleNums[i])
    // }
    // function dropDownRefresh(){
    //     var selectionID = d3.select("#selDataset").property("value");
    //   for (var i = 0; i < incidentType.length; i++) {
    //     if (selectionID === sampleNums[i]) {
    //       buildPlots(i);
    //       return
    //         }
//         }  
    
//     }
// }
   
// })
}
})
