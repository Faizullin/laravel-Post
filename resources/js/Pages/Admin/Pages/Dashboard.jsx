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
export default function Dashboard(){
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

                <div className="notification blue">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                    <div>
                    <span className="icon"><i className="mdi mdi-buffer"></i></span>
                    <b>Responsive table</b>
                    </div>
                    <button type="button" className="button small textual --jb-notification-dismiss">Dismiss</button>
                </div>
                </div>

                <div className="card has-table">
                <header className="card-header">
                    <p className="card-header-title">
                    <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
                    Clients
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
                        <th>Company</th>
                        <th>City</th>
                        <th>Progress</th>
                        <th>Created</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="image-cell">
                        <div className="image">
                            <img src="https://avatars.dicebear.com/v2/initials/rebecca-bauch.svg" className="rounded-full"/>
                        </div>
                        </td>
                        <td data-label="Name">Rebecca Bauch</td>
                        <td data-label="Company">Daugherty-Daniel</td>
                        <td data-label="City">South Cory</td>
                        <td data-label="Progress" className="progress-cell">
                        <progress max="100" value="79">79</progress>
                        </td>
                        <td data-label="Created">
                        <small className="text-gray-500" title="Oct 25, 2021">Oct 25, 2021</small>
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
                    <tr>
                        <td className="image-cell">
                        <div className="image">
                            <img src="https://avatars.dicebear.com/v2/initials/felicita-yundt.svg" className="rounded-full"/>
                        </div>
                        </td>
                        <td data-label="Name">Felicita Yundt</td>
                        <td data-label="Company">Johns-Weissnat</td>
                        <td data-label="City">East Ariel</td>
                        <td data-label="Progress" className="progress-cell">
                        <progress max="100" value="67">67</progress>
                        </td>
                        <td data-label="Created">
                        <small className="text-gray-500" title="Jan 8, 2021">Jan 8, 2021</small>
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
                    <tr>
                        <td className="image-cell">
                        <div className="image">
                            <img src="https://avatars.dicebear.com/v2/initials/mr-larry-satterfield-v.svg" className="rounded-full"/>
                        </div>
                        </td>
                        <td data-label="Name">Mr. Larry Satterfield V</td>
                        <td data-label="Company">Hyatt Ltd</td>
                        <td data-label="City">Windlerburgh</td>
                        <td data-label="Progress" className="progress-cell">
                        <progress max="100" value="16">16</progress>
                        </td>
                        <td data-label="Created">
                        <small className="text-gray-500" title="Dec 18, 2021">Dec 18, 2021</small>
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
                    <tr>
                        <td className="image-cell">
                        <div className="image">
                            <img src="https://avatars.dicebear.com/v2/initials/mr-broderick-kub.svg" className="rounded-full"/>
                        </div>
                        </td>
                        <td data-label="Name">Mr. Broderick Kub</td>
                        <td data-label="Company">Kshlerin, Bauch and Ernser</td>
                        <td data-label="City">New Kirstenport</td>
                        <td data-label="Progress" className="progress-cell">
                        <progress max="100" value="71">71</progress>
                        </td>
                        <td data-label="Created">
                        <small className="text-gray-500" title="Sep 13, 2021">Sep 13, 2021</small>
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
                    <tr>
                        <td className="image-cell">
                        <div className="image">
                            <img src="https://avatars.dicebear.com/v2/initials/barry-weber.svg" className="rounded-full"/>
                        </div>
                        </td>
                        <td data-label="Name">Barry Weber</td>
                        <td data-label="Company">Schulist, Mosciski and Heidenreich</td>
                        <td data-label="City">East Violettestad</td>
                        <td data-label="Progress" className="progress-cell">
                        <progress max="100" value="80">80</progress>
                        </td>
                        <td data-label="Created">
                        <small className="text-gray-500" title="Jul 24, 2021">Jul 24, 2021</small>
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
                    <tr>
                        <td className="image-cell">
                        <div className="image">
                            <img src="https://avatars.dicebear.com/v2/initials/bert-kautzer-md.svg" className="rounded-full"/>
                        </div>
                        </td>
                        <td data-label="Name">Bert Kautzer MD</td>
                        <td data-label="Company">Gerhold and Sons</td>
                        <td data-label="City">Mayeport</td>
                        <td data-label="Progress" className="progress-cell">
                        <progress max="100" value="62">62</progress>
                        </td>
                        <td data-label="Created">
                        <small className="text-gray-500" title="Mar 30, 2021">Mar 30, 2021</small>
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
                    <tr>
                        <td className="image-cell">
                        <div className="image">
                            <img src="https://avatars.dicebear.com/v2/initials/lonzo-steuber.svg" className="rounded-full"/>
                        </div>
                        </td>
                        <td data-label="Name">Lonzo Steuber</td>
                        <td data-label="Company">Skiles Ltd</td>
                        <td data-label="City">Marilouville</td>
                        <td data-label="Progress" className="progress-cell">
                        <progress max="100" value="17">17</progress>
                        </td>
                        <td data-label="Created">
                        <small className="text-gray-500" title="Feb 12, 2021">Feb 12, 2021</small>
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
                    <tr>
                        <td className="image-cell">
                        <div className="image">
                            <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" className="rounded-full"/>
                        </div>
                        </td>
                        <td data-label="Name">Jonathon Hahn</td>
                        <td data-label="Company">Flatley Ltd</td>
                        <td data-label="City">Billiemouth</td>
                        <td data-label="Progress" className="progress-cell">
                        <progress max="100" value="74">74</progress>
                        </td>
                        <td data-label="Created">
                        <small className="text-gray-500" title="Dec 30, 2021">Dec 30, 2021</small>
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
                    <tr>
                        <td className="image-cell">
                        <div className="image">
                            <img src="https://avatars.dicebear.com/v2/initials/ryley-wuckert.svg" className="rounded-full"/>
                        </div>
                        </td>
                        <td data-label="Name">Ryley Wuckert</td>
                        <td data-label="Company">Heller-Little</td>
                        <td data-label="City">Emeraldtown</td>
                        <td data-label="Progress" className="progress-cell">
                        <progress max="100" value="54">54</progress>
                        </td>
                        <td data-label="Created">
                        <small className="text-gray-500" title="Jun 28, 2021">Jun 28, 2021</small>
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
                    <tr>
                        <td className="image-cell">
                        <div className="image">
                            <img src="https://avatars.dicebear.com/v2/initials/sienna-hayes.svg" className="rounded-full"/>
                        </div>
                        </td>
                        <td data-label="Name">Sienna Hayes</td>
                        <td data-label="Company">Conn, Jerde and Douglas</td>
                        <td data-label="City">Jonathanfort</td>
                        <td data-label="Progress" className="progress-cell">
                        <progress max="100" value="55">55</progress>
                        </td>
                        <td data-label="Created">
                        <small className="text-gray-500" title="Mar 7, 2021">Mar 7, 2021</small>
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
                    </tbody>
                    </table>
                    <div className="table-pagination">
                    <div className="flex items-center justify-between">
                        <div className="buttons">
                        <button type="button" className="button active">1</button>
                        <button type="button" className="button">2</button>
                        <button type="button" className="button">3</button>
                        </div>
                        <small>Page 1 of 3</small>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </Layout>
    );
}
