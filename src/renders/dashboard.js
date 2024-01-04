// En tu archivo de renderizado
document.addEventListener('DOMContentLoaded', async () => {
   const name = document.getElementById('username');
   const statusMonitoring = document.getElementById('statusMonitoring')
   const logoutBtn = document.getElementById('logoutBtn');
   const setting = document.getElementById('setting');
   const perfil = document.getElementById('perfil');

   obtenerYMostrarDatos(name, statusMonitoring);
   mostrarDashboardUltimaSesión()
   mostrarDashboardManias()
   mostrarDashboardMalosHabitos()

   //Buttons

   logoutBtn.addEventListener('click', async () => {
      await window.api.logout();
   });
   
   setting.addEventListener('click', async () => {
      await window.api.openSetting();
   });

   perfil.addEventListener('click', async () => {
      await window.api.openPerfil();
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
      series: [
         {
            name: "Cantidad Total Detecciones",
            data: [170, 25, 20, 15],
         },
      ],
      chart: {
         type: 'bar',
         height: 300,
      },
      plotOptions: {
         bar: {
            borderRadius: 0,
            horizontal: true,
            barHeight: '50%',
            isFunnel: true,
         },
      },
      dataLabels: {
         enabled: true,
         formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
         },
         dropShadow: {
            enabled: true,
         },
      },
      xaxis: {
         categories: [
            'Onicofagia',
            'Tricotilomanía',
            'Dermatilomanía',
            'Rinotilexomanía',
         ],
      },
      legend: {
         show: false,
      },
   };

   var options2 = {
      series: [{
         name: 'Onicofagia',
         data: [10, 4, 12, 25, 5]
      }, {
         name: 'Tricotilomanía',
         data: [2, 3, 0, 2, 2]
      }, {
         name: 'Dermatilomanía',
         data: [2, 0, 0, 5, 2]
      }, {
         name: 'Rinotilexomanía',
         data: [0, 4, 2, 2, 0]
      }],
      chart: {
         type: 'bar',
         height: 300,
         width: 500,
         stacked: true,
         toolbar: {
            show: true
         },
         zoom: {
            enabled: false
         }
      },
      responsive: [{
         breakpoint: 480,
         options: {
            legend: {
               position: 'top',
               offsetX: -10,
               offsetY: 0
            }
         }
      }],
      plotOptions: {
         bar: {
            horizontal: false,
            borderRadius: 5,
            dataLabels: {
               total: {
                  enabled: true,
                  style: {
                     fontSize: '12px',
                     fontWeight: 800
                  }
               }
            }
         },
      },
      xaxis: {
         categories: [
            "02/12/2023",
            "04/12/2023",
            "15/12/2023",
            "20/12/2023",
            "27/12/2023"
         ],
      },
      legend: {
         position: 'top',
      },
      fill: {
         opacity: 1
      }
   };

   var chart2 = new ApexCharts(document.getElementById("tendenciaManias"), options2);
   chart2.render();
   var chart = new ApexCharts(document.getElementById("funnelManias"), options);
   chart.render();

}

function mostrarDashboardMalosHabitos() {
   var options = {
      series: [
         {
            name: "Cantidad Total Detecciones",
            data: [98, 50, 22],
         },
      ],
      chart: {
         type: 'bar',
         height: 300,
      },
      plotOptions: {
         bar: {
            borderRadius: 0,
            horizontal: true,
            barHeight: '50%',
            isFunnel: true,
         },
      },
      dataLabels: {
         enabled: true,
         formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
         },
         dropShadow: {
            enabled: true,
         },
      },
      xaxis: {
         categories: [
            'Mala Postura',
            'Fatiga Visual',
            'Morder Objetos',
         ],
      },
      legend: {
         show: false,
      },
      colors: ['#8B4513'], // Colores personalizados
   };

   var options2 = {
      series: [{
         name: 'Mala Postura',
         data: [8, 4, 7, 3, 5]
      }, {
         name: 'Fatiga Visual',
         data: [2, 2, 3, 4, 5]
      }, {
         name: 'Morder Objetos',
         data: [3, 4, 5, 0, 0]
      }],
      chart: {
         type: 'bar',
         height: 300,
         width: 500,
         stacked: true,
         toolbar: {
            show: true
         },
         zoom: {
            enabled: false
         }
      },
      responsive: [{
         breakpoint: 480,
         options: {
            legend: {
               position: 'top',
               offsetX: -10,
               offsetY: 0
            }
         }
      }],
      plotOptions: {
         bar: {
            horizontal: false,
            borderRadius: 5,
            dataLabels: {
               total: {
                  enabled: true,
                  style: {
                     fontSize: '12px',
                     fontWeight: 800
                  }
               }
            }
         },
      },
      xaxis: {
         categories: [
            "02/12/2023",
            "04/12/2023",
            "15/12/2023",
            "20/12/2023",
            "27/12/2023"
         ],
      },
      legend: {
         position: 'top',
      },
      fill: {
         opacity: 1
      }
   };

   var chart2 = new ApexCharts(document.getElementById("tendenciaHabitos"), options2);
   chart2.render();
   var chart = new ApexCharts(document.getElementById("funnelHabitos"), options);
   chart.render();
}