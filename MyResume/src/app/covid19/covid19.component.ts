import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label as ng2Chart } from 'ng2-charts';
import { ServerHttpService } from '../Services/server-http.service';
import * as _ from 'lodash';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.scss']
})
export class Covid19Component implements OnInit {
  constructor(
    private serverHttp: ServerHttpService
  ) { }
  public isVNDataOpened = false;
  public countriesData = [];
  public vnData = [];
  public chartIsReady = false;
  private chartOptions = {
    responsive: true,
  };

  public interestedData = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    title: {
      text: 'LIVE - Coronavirus - Covid 19',
      display: true,
      fontSize: 20,
    },
    scales: {
      xAxes: [{}],
      yAxes: [{}],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        // font: {
        //   size: 20,
        // },
        formatter(value, context) {
          //   return context.chart.data.labels[context.dataIndex];
          // return context.dataIndex + ': ' + Math.round(value * 100) + '%';
          return value.toLocaleString('en-US');
        },
      },
    },
  };
  public barChartLabels: ng2Chart[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [278, 148, 40, 19, 5, 27, 7], label: 'Series C' },
  ];
  public chartColors: Array<any> = [
    {
      // first color
      backgroundColor: 'rgba(61, 255, 36, 0.84)',
      borderColor: 'rgba(14, 117, 0, 1)',
      // pointBackgroundColor: 'rgba(225,10,24,0.2)',
      // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(225,10,24,0.2)',
    },
    {
      // second color
      backgroundColor: 'rgba(26, 219, 0, 0.84)',
      borderColor: 'rgba(14, 117, 0, 1)',
    },
    {
      backgroundColor: 'rgba(255, 162, 87, 0.8)',
      borderColor: 'rgba(163, 73, 0, 1)',
    },
    {
      backgroundColor: 'rgba(255, 134, 36, 1)',
      borderColor: 'rgba(117, 53, 0, 1)',
    },
    {
      backgroundColor: 'rgba(255, 46, 46, 0.78)',
      borderColor: 'rgba(255, 26, 26, 0.86)',
    },
    {
      backgroundColor: 'rgba(235, 0, 0, 1)',
      borderColor: 'rgba(255, 26, 26, 0.86)',
    },
  ];
  ngOnInit(): void {
    this.serverHttp.getCovid19Summary().subscribe((data) => {
      this.countriesData = [];
      const filteredData = {
        Country: "Global",
        CountryCode: "Global",
        NewConfirmed: data.Global.NewConfirmed,
        NewDeaths: data.Global.NewDeaths,
        NewRecovered: data.Global.NewRecovered,
        TotalConfirmed: data.Global.TotalConfirmed,
        TotalDeaths: data.Global.TotalDeaths,
        TotalRecovered: data.Global.TotalRecovered,
      };
      this.countriesData.push(filteredData);

      for (const row of data.Countries) {
        if (row.CountryCode === 'VN') {
          const filteredData = {
            Country: row.Country,
            CountryCode: row.CountryCode,
            NewConfirmed: row.NewConfirmed,
            NewDeaths: row.NewDeaths,
            NewRecovered: row.NewRecovered,
            TotalConfirmed: row.TotalConfirmed,
            TotalDeaths: row.TotalDeaths,
            TotalRecovered: row.TotalRecovered,
          };
          this.countriesData.push(filteredData);
          break;
        }
      }

      if (
        this.countriesData &&
        this.countriesData.length > 0 &&
        this.countriesData[0].hasOwnProperty('TotalConfirmed')
      ) {
        // TotalDeaths, TotalConfirmed
        this.countriesData = _.orderBy(
          this.countriesData,
          ['TotalConfirmed'],
          ['desc']
        );

        this.buildChart();
      }
    });
    this.serverHttp.getCovid19VN().subscribe((data) => {
      //console.log(data);
      this.vnData = _.orderBy(
        data,
        ['Date'],
        ['desc']
      );
    });
  }
  public getWord(key) {
    const map = {
      NewConfirmed: 'New Confirmed',
      TotalConfirmed: 'Total Confirmed',
      NewRecovered: 'New Recovered',
      TotalRecovered: 'Total Recovered',
      NewDeaths: 'New Deaths',
      TotalDeaths: 'Total Deaths',
      CountryCode: 'Country Code',
    };
    return map[key] || key;
  }
  public buildChart() {
    const key = 'Country';
    const keys = [
      'NewConfirmed',
      'TotalConfirmed',
      'NewRecovered',
      'TotalRecovered',
      'NewDeaths',
      'TotalDeaths',
    ];
    const countriesData = [];
    let records = 0;
    this.barChartLabels = [];
    for (const row of this.countriesData) {
      // row.hasOwnProperty(key)
      records++;
      this.barChartLabels.push(row[key]);
      for (const key2 of keys) {
        if (!countriesData[key2]) {
          countriesData[key2] = [];
        }
        countriesData[key2].push(row[key2]);
      }

    }
    this.barChartData = [];
    for (const key2 of keys) {
      this.barChartData.push({
        label: `${this.getWord(key2)}`,
        // backgroundColor: backgroundColor[i++],
        data: countriesData[key2],
        // borderColor: backgroundColor[i++],
        fill: false,
        // maxBarThickness: 8,
        // minBarLength: 2,
      });
    }
    this.chartIsReady = true;
  }
  public ViewVNDetail() {
    this.isVNDataOpened = !this.isVNDataOpened;
  }
}
