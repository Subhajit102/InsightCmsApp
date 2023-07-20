import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/_services/user.service';
import { Chart, registerables} from 'node_modules/chart.js';
import { UserCourse } from 'src/app/_models/course';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { Router } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html',
  styleUrls: ['./my-learning.component.scss']
})
export class MyLearningComponent implements OnInit {
  small:boolean=false;
  userId: number = 0;
  userName: string = '';
  userCourses:any;

  public doughnutChartData: ChartData<'doughnut'> = {
    //labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 45,55 ] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private userService: UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.small = this.getIsMobile();
    window.onresize = () => {
      this.small = this.getIsMobile();
    };
    //this.renderChart();
    var user = localStorage.getItem('user');
    if (user) {
      this.userId = JSON.parse(user)?.userId;
      this.userName = JSON.parse(user)?.userName;
    }
    this.userService.getUserCourses(this.userId).subscribe(val=>{
      if(val){
        this.userCourses = val;
      }
      console.log(this.userCourses);
    });
  }
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 1024;
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }
  renderChart(){
    const myChart= new Chart('piechart', {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    const myChart1= new Chart('progressChart', {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [45,55],
          borderWidth: 1,
          backgroundColor: ["#0074D9", "#fff"]
        }]
      },
      options: {
        scales: {
          x: {display:false,
            grid: {
               drawOnChartArea: false,
               display:false
            }
         },
          y: {
            display:false,
            beginAtZero: true,
            ticks: {
              display: false,
            },
            grid: {
              drawOnChartArea: false
           }
          }
        },
        
      }
    });
  }
  goToCourse(courseId:number,courseName:string){
    this.router.navigateByUrl(`/course/${courseId}/` + courseName);
  }

  getProgressData(numberOfTopicsCompleted:number,numberOfTopics:number){
    var progress = numberOfTopics > 0 ? Math.round(numberOfTopicsCompleted*100/numberOfTopics):0;
    return {
      datasets: [
        { data: [ progress,(100-progress) ],
          backgroundColor: ["#004aad", "#fff"],
          borderColor: "#004aad" },
      ],
    };
  }
  getProgressPercentage(numberOfTopicsCompleted:number,numberOfTopics:number){
    var progress = numberOfTopics > 0 ? Math.round(numberOfTopicsCompleted*100/numberOfTopics):0;
    return progress;
  }
}
