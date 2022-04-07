import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from "../shared/rest-api.service";
import { config_url } from '../shared/customer/constant';
@Component({
  selector: 'app-doughnutstackblitz',
  templateUrl: './doughnutstackblitz.component.html',
  styleUrls: ['./doughnutstackblitz.component.scss']
})
export class DoughnutstackblitzComponent implements OnInit {
  donutChart: any;
  columnChart: any;
  serviceDataOffers:any;
  serviceDataOffers1:any;
  NormalOfferPercentArr:any = [];
  servicenameArr:any = [];
  // sitePersonel = {};
  // employees = [];
  // sitePersonel.employees = employees;
// console.log(sitePersonel);
  constructor(public restApi: RestApiService,private http: HttpClient) { }

  ngOnInit(): void {
    this.loadServiceDataOffers();
    this.initColumn();
    // this.initDonut();
  }
  
  loadServiceDataOffers(){

    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.getServiceDataOffers(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.serviceDataOffers = data;
      // this.serviceDataOffers1 = this.serviceDataOffers.data.getcurrentOffersByShopid;
      this.serviceDataOffers1 = this.serviceDataOffers;
      const myJSON = JSON.stringify(this.serviceDataOffers1);
     console.log("stringify>>>",myJSON)
  
      for(let i=0;i<this.serviceDataOffers1.length;i++){
        this.NormalOfferPercentArr.push(Number(this.serviceDataOffers1[i].offer_percent));
       // this.ComboOfferFromDateTodate.push(this.currentOffer1[i].start_date + " - " + this.currentOffer1[i].end_date);
       this.servicenameArr.push((this.serviceDataOffers1[i].service_name + "<br>"+ "(" + this.serviceDataOffers1[i].model_name) + ")");
      }

      this.initDonut(this.serviceDataOffers1);
      
  
    })


  }

  initColumn() {
    const column = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Unique User'
      },
      credits: {
        enabled: false
      },

      // series: [{
      //   name: 'Line 1',
      //   data: [1, 52, 123, 90, 24, 67, 77],
      //   // type: undefined
      // }]
    });
    column.addPoint(12);
    this.columnChart = column;
    column.ref$.subscribe(console.log);
  }
  initDonut(serviceDataOffers1:any) {
    var obj  = {};



    var services ={};
    var json2 = [{}];
    var json3 = [{}];
    var json1;
    console.log("serviceDataOffers1>>>",serviceDataOffers1)
    for(let i=0;i<serviceDataOffers1.length;i++){
       json1 =
      {
        // + "<br>"+ "(" + serviceDataOffers1[i].model_name
     "name": serviceDataOffers1[i].service_name,
     "y": Number(serviceDataOffers1[i].offer_percent)
      }
      // Object.assign(obj, {"1":"aa", "2":"bb"})
      // services.assign(obj, {"1":"aa", "2":"bb"});
      // json3[i]["test"] = "4";
      // json3[i]["test"] = json1;
      json2.push(json1);
      // this.NormalOfferPercentArr.push(Number(this.serviceDataOffers1[i].offer_percent));
     // this.ComboOfferFromDateTodate.push(this.currentOffer1[i].start_date + " - " + this.currentOffer1[i].end_date);
    //  this.servicenameArr.push((this.serviceDataOffers1[i].service_name + "<br>"+ "(" + this.serviceDataOffers1[i].model_name) + ")");
    }
    // console.log("obj>>>",obj)
    var myArrayFiltered = json2.filter((ele) => {
      return ele.constructor === Object && Object.keys(ele).length > 0
    });

    let finaljson = JSON.stringify(myArrayFiltered);

    // let finaljson1 = finaljson.slice(1, -1);
// console.log(finaljson1);


var staticjson =  [{
    name: 'Chrome',
    y: 10
  },
  {
    name: 'Internet Explorer',
    y: 11.84,
  }, {
    name: 'Firefox',
    y: 10.85,
  }, {
    name: 'Edge',
    y: 4.67
  }, {
    name: 'Safari',
    y: 4.18
  }];
  
    // console.log("json3>>>",json3)
      
      let finaljson1 = JSON.stringify(staticjson);
      
      let finaljson2 = finaljson1.slice(1, -1);
      console.log("finaljson2>>>",finaljson2)
    const donut = new Chart({
      chart: {
        // plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      title: {
        text: '<strong>Service<br>Offers</strong>',
        align: 'center',
        verticalAlign: 'middle',
        y: 0
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}%</b>'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          // allowPointSelect: false,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            // distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          // startAngle: -90,
          // endAngle: -180,
          center: ['50%', '50%'],
          size: '90%',
          showInLegend: true
        }
      },
      series: [
        {
          name: 'Service',
          data: [
            finaljson2
            // {
            //   name: 'Chrome',
            //   y: 10
            // },
            // {
            //   name: 'Internet Explorer',
            //   y: 11.84,
            // }, {
            //   name: 'Firefox',
            //   y: 10.85,
            // }, {
            //   name: 'Edge',
            //   y: 4.67
            // }, {
            //   name: 'Safari',
            //   y: 4.18
            // },
          ],
          type: 'pie',
          innerSize: '50%',
        }]
    });
    this.donutChart = donut;

}

}
