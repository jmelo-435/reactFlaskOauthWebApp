import { AreaChart, Area, CartesianGrid, XAxis, YAxis,Tooltip } from 'recharts';



const Chart =({chartData})=>{


    return(
        <div>
            
  <AreaChart width={600} height={300} data={chartData}
  margin={{
    top: 10,
    right: 30,
    left: 0,
    bottom: 0,
  }}>
    <Area type="monotone" dataKey="close" fill="#8884d8" fillOpacity={0.5}/>
    <CartesianGrid stroke="#ccc" />
    <Tooltip/>
    <XAxis dataKey="date" />
    <YAxis />
  </AreaChart>
  <AreaChart width={600} height={300} data={chartData}
  margin={{
    top: 10,
    right: 30,
    left: 0,
    bottom: 0,
  }}>
    <Area type="monotone" dataKey="lucro" fill="black" fillOpacity={0.5}/>
    <Tooltip/>
    <XAxis dataKey="date" />
    <YAxis />
  </AreaChart>

        </div>
    )

}

export default Chart