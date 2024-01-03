// En tu archivo de renderizado
document.addEventListener('DOMContentLoaded', async () => {
  const name = document.getElementById('username');
  const statusMonitoring = document.getElementById('statusMonitoring')
  const logoutBtn = document.getElementById('logoutBtn');

  obtenerYMostrarDatos(name, statusMonitoring);
  mostrarDashboardUltimaSesión()
  mostrarDashboardManias()
  mostrarDashboardMalosHabitos()

  //Buttons

  logoutBtn.addEventListener('click', async () => {
    await window.api.logout();
  });
});

async function obtenerYMostrarDatos(name, statusMonitoring) {
  try {
    const data = await window.api.userData();
    name.innerText = `Hola! ${data.user.nombre}`;
    statusMonitoring.innerText = `${data.estadoMonitoreo}`;
    return data
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

function mostrarDashboardUltimaSesión() {
  var options = {
    series: [11, 3, 2, 5],
    chart: {
      width: 330,
      type: 'pie',
    },
    labels: ['Onicofagia', 'Tricotilomanía', 'Dermatilomanía', 'Rinotilexomanía'],
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " veces";
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  var options1 = {
    series: [2, 5, 1],
    chart: {
      width: 330,
      type: 'pie',
    },
    labels: ['Morder Objetos', 'Mala Postura', 'Fatiga Visual'],
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " veces";
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };


  var options2 = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'Detecciones Acumuladas',
      data: [0, 2, 10, 17, 29]
    }],
    xaxis: {
      categories: ["Inicio", "1/4 Tiempo", "2/4 Tiempo", "3/4 Tiempo", "Final"]
    },
    yaxis: {
      title: {
        text: 'Cantidad de Detecciones'
      }
    }
  }
  var chart = new ApexCharts(document.getElementById('detallePorcentualManias'), options);
  chart.render();
  var chart2 = new ApexCharts(document.getElementById('detallePorcentualMalosHabitos'), options1);
  chart2.render();
  var chart3 = new ApexCharts(document.getElementById('myChart1'), options2);
  chart3.render();
}

function mostrarDashboardManias() {
  var options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 500]
    }],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  }
  var chart = new ApexCharts(document.getElementById('myChart2'), options);
  chart.render();
}

function mostrarDashboardMalosHabitos() {
  var options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'sales',
      data: [30, 90, 35, 50, 500, 60, 70, 91, 500]
    }],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  }
  var chart = new ApexCharts(document.getElementById('myChart3'), options);
  chart.render();
}