import Layout from "../Layouts/Layout";
import { Link } from "@inertiajs/inertia-react";
import "../Components/Chart/ChartJsConfig";
import { Line } from "react-chartjs-2";

var randomChartData = function randomChartData(n) {
    var data = [];

    for (var i = 0; i < n; i++) {
      data.push(Math.round(Math.random() * 200));
    }

    return data;
  };

  var chartColors = {
    "default": {
      primary: '#00D1B2',
      info: '#209CEE',
      danger: '#FF3860'
    }
  };
export default function Dashboard({newUsers}){
    return (
        <Layout linkTitle="Dashboard">
            <section className="section main-section">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
                    <div className="card">
                        <div className="card-content">
                        <div className="flex items-center justify-between">
                            <div className="widget-label">
                            <h3>
                                Clients
                            </h3>
                            <h1>
                                512
                            </h1>
                            </div>
                            <span className="icon widget-icon text-green-500"><i className="mdi mdi-account-multiple mdi-48px"></i></span>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                    <div className="flex items-center justify-between">
                        <div className="widget-label">
                        <h3>
                            Sales
                        </h3>
                        <h1>
                            $7,770
                        </h1>
                        </div>
                        <span className="icon widget-icon text-blue-500"><i className="mdi mdi-cart-outline mdi-48px"></i></span>
                    </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content">
                    <div className="flex items-center justify-between">
                        <div className="widget-label">
                        <h3>
                            Performance
                        </h3>
                        <h1>
                            256%
                        </h1>
                        </div>
                        <span className="icon widget-icon text-red-500"><i className="mdi mdi-finance mdi-48px"></i></span>
                    </div>
                    </div>
                </div>
                </div>

                <div className="card mb-6">
                <header className="card-header">
                    <p className="card-header-title">
                    <span className="icon"><i className="mdi mdi-finance"></i></span>
                    Performance
                    </p>
                    <Link href="#" className="card-header-icon">
                    <span className="icon"><i className="mdi mdi-reload"></i></span>
                    </Link>
                </header>
                <div className="card-content">
                    <div className="chart-area">
                    <div className="h-full">
                        <div className="chartjs-size-monitor">
                        <div className="chartjs-size-monitor-expand">
                            <div></div>
                        </div>
                        <div className="chartjs-size-monitor-shrink">
                            <div></div>
                        </div>
                        </div>
                        <Line width="2992" height="1000" className="chartjs-render-monitor block" style={{height: "400px", width: "1197px"}}
                            data={{
                                datasets: [{
                                  fill: false,
                                  borderColor: chartColors["default"].primary,
                                  borderWidth: 2,
                                  borderDash: [],
                                  borderDashOffset: 0.0,
                                  pointBackgroundColor: chartColors["default"].primary,
                                  pointBorderColor: 'rgba(255,255,255,0)',
                                  pointHoverBackgroundColor: chartColors["default"].primary,
                                  pointBorderWidth: 20,
                                  pointHoverRadius: 4,
                                  pointHoverBorderWidth: 15,
                                  pointRadius: 4,
                                  data: randomChartData(9)
                                }, {
                                  fill: false,
                                  borderColor: chartColors["default"].info,
                                  borderWidth: 2,
                                  borderDash: [],
                                  borderDashOffset: 0.0,
                                  pointBackgroundColor: chartColors["default"].info,
                                  pointBorderColor: 'rgba(255,255,255,0)',
                                  pointHoverBackgroundColor: chartColors["default"].info,
                                  pointBorderWidth: 20,
                                  pointHoverRadius: 4,
                                  pointHoverBorderWidth: 15,
                                  pointRadius: 4,
                                  data: randomChartData(9)
                                }, {
                                  fill: false,
                                  borderColor: chartColors["default"].danger,
                                  borderWidth: 2,
                                  borderDash: [],
                                  borderDashOffset: 0.0,
                                  pointBackgroundColor: chartColors["default"].danger,
                                  pointBorderColor: 'rgba(255,255,255,0)',
                                  pointHoverBackgroundColor: chartColors["default"].danger,
                                  pointBorderWidth: 20,
                                  pointHoverRadius: 4,
                                  pointHoverBorderWidth: 15,
                                  pointRadius: 4,
                                  data: randomChartData(9)
                                }],
                                labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09'],

                            }}
                            options={{
                                maintainAspectRatio: false,
                                legend: {
                                  display: false
                                },
                                responsive: true,
                                tooltips: {
                                  backgroundColor: '#f5f5f5',
                                  titleFontColor: '#333',
                                  bodyFontColor: '#666',
                                  bodySpacing: 4,
                                  xPadding: 12,
                                  mode: 'nearest',
                                  intersect: 0,
                                  position: 'nearest'
                                },
                                scales: {
                                  yAxes: [{
                                    barPercentage: 1.6,
                                    gridLines: {
                                      drawBorder: false,
                                      color: 'rgba(29,140,248,0.0)',
                                      zeroLineColor: 'transparent'
                                    },
                                    ticks: {
                                      padding: 20,
                                      fontColor: '#9a9a9a'
                                    }
                                  }],
                                  xAxes: [{
                                    barPercentage: 1.6,
                                    gridLines: {
                                      drawBorder: false,
                                      color: 'rgba(225,78,202,0.1)',
                                      zeroLineColor: 'transparent'
                                    },
                                    ticks: {
                                      padding: 20,
                                      fontColor: '#9a9a9a'
                                    }
                                  }]
                                }
                            }} />
                    </div>
                    </div>
                </div>
                </div>


                <div className="card has-table">
                <header className="card-header">
                    <p className="card-header-title">
                    <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
                    New Users
                    </p>
                    <Link href="#" className="card-header-icon">
                    <span className="icon"><i className="mdi mdi-reload"></i></span>
                    </Link>
                </header>
                <div className="card-content">
                    <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Progress</th>
                        <th>Created</th>
                        <th>Last Updated</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        { newUsers.data.map((user,index) => (
                            <tr key={user.id}>
                                <td className="image-cell">
                                    <div className="image">
                                        <img src="https://avatars.dicebear.com/v2/initials/rebecca-bauch.svg" className="rounded-full"/>
                                    </div>
                                </td>
                                <td data-label="Name">{ user.name }</td>
                                <td data-label="Email">{ user.email }</td>
                                <td data-label="Progress" className="progress-cell">
                                <progress max="100" value="79">79</progress>
                                </td>
                                <td data-label="Created">
                                    <small className="text-gray-500" title="Oct 25, 2021">{ user.created_at }</small>
                                </td>
                                <td data-label="Updated">
                                    <small className="text-gray-500" title="Oct 25, 2021">{ user.updated_at }</small>
                                </td>
                                <td className="actions-cell">
                                <div className="buttons right nowrap">
                                    <button className="button small blue --jb-modal"  data-target="sample-modal-2" type="button">
                                        <span className="icon"><i className="mdi mdi-eye"></i></span>
                                    </button>
                                    <button className="button small red --jb-modal" data-target="sample-modal" type="button">
                                        <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                    </button>
                                </div>
                                </td>
                            </tr>
                        )) }

                    </tbody>
                    </table>
                </div>
                </div>
            </section>
        </Layout>
    );
}
