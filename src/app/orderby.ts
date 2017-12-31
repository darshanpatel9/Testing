import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "orderby"
})

export class OrderByPipe implements PipeTransform {
  transform(array: Array<Object>, args: string): Array<Object> {

    if(array){
      var temp = args;
      array.sort((a: any, b: any) => {
        if(a[temp] < b[temp]) {
          return 1;
        } else if (a[temp] > b[temp]) {
          return -1;
        } else {
          return 0;
        }
      });
      return array;
    }
  }
}
