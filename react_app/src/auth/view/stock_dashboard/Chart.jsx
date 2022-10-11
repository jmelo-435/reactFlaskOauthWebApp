import { AreaChart, Area, CartesianGrid, XAxis, YAxis,Tooltip,ResponsiveContainer } from 'recharts';



const Chart =({chartData})=>{


    return(
        <div>
       <ResponsiveContainer width="95%" height={200}>
       <AreaChart  syncId="id" data={chartData}
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
        </ResponsiveContainer>
<ResponsiveContainer width="95%" height={200}>
  <AreaChart  syncId="id" data={chartData} margin={{top: 10,right: 30,left: 0,bottom: 0,}}>
    <Area type="monotone" dataKey="lucro" fill="black" fillOpacity={0.5}/>
    <Tooltip/>
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="date" />
    <YAxis />
  </AreaChart>
</ResponsiveContainer>     


        </div>
    )

}

export default Chart