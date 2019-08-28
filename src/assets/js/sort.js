export function sortByField(sortedby, order) {
  return function (o1, o2) {
    var f1 = o1[sortedby];
    var f2 = o2[sortedby];
    if (order == 'desc') {
      if (f2 < f1) {
        return -1;
      } else if (f2 > f1) {
        return 1;
      } else {
        return 0;
      }
    } else if (order == 'asc') {
      if (f2 < f1) {
        return 1;
      } else if (f2 > f1) {
        return -1;
      } else {
        return 0;
      }
    }
  }
}
