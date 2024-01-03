// En tu archivo de renderizado
document.addEventListener('DOMContentLoaded', async () => {
   const name = document.getElementById('username');
   const statusMonitoring = document.getElementById('statusMonitoring')
   const logoutBtn = document.getElementById('logoutBtn');

   obtenerYMostrarDatos(name, statusMonitoring);

   var options = {
      chart: {
        type: 'line'
      },
      series: [{
        name: 'sales',
        data: [30,40,35,50,49,60,70,91,125]
      }],
      xaxis: {
        categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
      }
    }
    var chart = new ApexCharts(document.getElementById('myChart'), options);
    chart.render();

    var options2 = {
      chart: {
        type: 'line'
      },
      series: [{
        name: 'sales',
        data: [30,40,35,50,49,60,70,91,500]
      }],
      xaxis: {
        categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
      }
    }
    var chart2 = new ApexCharts(document.getElementById('myChart2'), options2);
    chart2.render();

    var options3 = {
      chart: {
        type: 'line'
      },
      series: [{
        name: 'sales',
        data: [30,90,35,50,500,60,70,91,500]
      }],
      xaxis: {
        categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
      }
    }
    var chart3 = new ApexCharts(document.getElementById('myChart3'), options3);
    chart3.render();

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
