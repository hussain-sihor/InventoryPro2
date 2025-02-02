import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


const COLORS = ['#7fff35', '#ffa673', '#edff28', '#ff4141'];

export default class StatusChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

  render() {
    const { data } = this.props
    return (
      <PieChart width={500} height={300} className='' onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={120}
          outerRadius={180}
          fill="#1c159a"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
      </PieChart>
    );
  }
}
