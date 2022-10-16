import { AreaChart, Area, CartesianGrid, XAxis, YAxis,Tooltip,ResponsiveContainer } from 'recharts';



const Chart =({chartData})=>{
  const gradientOffset = () => {
    const dataMax = Math.max(...chartData.map((i) =>{
      if (isNaN(i?.lucro)){
        return 0
      }
      else{
        return i?.lucro

      }
    } ));
    const dataMin = Math.min(...chartData.map((i) =>{
      if (isNaN(i?.lucro)){
        return 0
      }
      else{
        return i?.lucro

      }
    }));
  
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    if(dataMax=="NaN"|| dataMin=="NaN"){
      return 0
    }
  
    return dataMax / (dataMax - dataMin);
  };
  
  const off = gradientOffset();

    return(
        <div>
<h3>Cotação</h3>
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
<h3>Lucro líquido</h3>
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