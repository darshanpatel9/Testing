import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'groupBy'
})

export class GroupByPipe implements PipeTransform {
  transform(array: Array<Object>, args: string): Array<Object> {

    const groupedObj = array.reduce((prev, cur)=> {
      if(!prev[cur[args]]) {
        prev[cur[args]] = [cur];
      } else {
        prev[cur[args]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({ key, array: groupedObj[key] }));
  }
}
