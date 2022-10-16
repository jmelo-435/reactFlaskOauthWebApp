import { AreaChart, Area, CartesianGrid, XAxis, YAxis,Tooltip,ResponsiveContainer } from 'recharts';



const Chart =({chartData})=>{
  const gradientOffset = () => {
    const dataMax = Math.max(...chartData.map((i) => i.lucro));
    const dataMin = Math.min(...chartData.map((i) => i.lucro));
  
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
  
    return dataMax / (dataMax - dataMin);
  };
  
  const off = gradientOffset();

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
    <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
    </defs>
    <Area type="monotone" dataKey="lucro" fill="url(#splitColor)" fillOpacity={0.5}/>
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