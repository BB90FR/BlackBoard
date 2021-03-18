// Gender bar

var ctx = document.getElementById("genderBar");
const females = ctx.dataset.females;
const males = ctx.dataset.males;

var genderBar = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Femmes", "Hommes"],
        datasets: [{
            label: '',
            data: [females, males],
            backgroundColor: [
                '#FC427B',
                '#25CCF7',
            ]
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        legend: {
              display: false,
          }
    },
});


// Messages doughnut

var chart2 = document.getElementById("msgDoughnut");
const read = chart2.dataset.read;
const unread = chart2.dataset.unread;

var msgDoughnut = new Chart(chart2, {
    type: 'doughnut',
    data: {
        labels: ["Lus", "Non-lus"],
        datasets: [{
            label: '',
            data: [read, unread],
            backgroundColor: [
                '#26de81',
                '#fd9644',
            ],

        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});



// Sent orders doughnut

var chart3 = document.getElementById("sentOrders");
const sent = chart3.dataset.sent;
const unsent = chart3.dataset.unsent;

var msgDoughnut = new Chart(chart3, {
    type: 'pie',
    data: {
        labels: ["Envoyés", "En attente"],
        datasets: [{
            label: '',
            data: [sent, unsent],
            backgroundColor: [
                '#706fd3',
                '#ff5252',
            ],

        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});




// Profits line

var chart4 = document.getElementById("chiffre");
let totalCA = JSON.parse(chart4.dataset.figure);
let dataLabels = [];
let dataValues = [];

var profits = new Chart(chart4, {
    type: 'line',
    data: {
        labels: dataLabels,
        datasets: [{
            label: '',
            data: dataValues,
            backgroundColor: '#f8c291',
            borderColor: '#e55039'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        legend: {
          display: false,
      }
    }
});

totalCA.forEach(element => {
    let date = new Date((element._id.year), (element._id.month - 1), 1)
    let month = date.toLocaleString('default', {month: 'long'})
    dataLabels.push(month);
    dataValues.push(element.CA);
});
profits.update();

