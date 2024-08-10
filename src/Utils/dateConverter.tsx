export const aggregateByWeek = (data: { [date: string]: number }) => {
    const aggregated: { [week: string]: number } = {};
  
    for (const date in data) {
      const dateObj = new Date(date);
      const firstDayOfYear = new Date(dateObj.getFullYear(), 0, 1);
      const dayOfYear = ((dateObj.getTime() - firstDayOfYear.getTime()) / 86400000) + 1;
      const week = Math.ceil(dayOfYear / 7);
      const weekKey = `${dateObj.getFullYear()}-W${String(week).padStart(2, '0')}`;
      if (!aggregated[weekKey]) {
        aggregated[weekKey] = 0;
      }
      aggregated[weekKey] += data[date];
    }
  
    return aggregated;
  };

 export const aggregateByMonth = (data: { [date: string]: number }) => {
    const aggregated: { [month: string]: number } = {};
  
    for (const date in data) {
      const dateObj = new Date(date);
      const month = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
      if (!aggregated[month]) {
        aggregated[month] = 0;
      }
      aggregated[month] += data[date];
    }
  
    return aggregated;
  };