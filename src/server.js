require('dotenv').config();
const express=require('express'); const path=require('path');
const app=express(); const PORT=process.env.PORT||3000;
app.use(express.json()); app.use(express.static(path.join(__dirname,'..','public')));
app.get('/api/health',(req,res)=>res.json({status:'ok',service:'sangeetha-portfolio-api',timestamp:new Date().toISOString()}));
app.get('/api/profile',(req,res)=>res.json({name:'Sangeetha A S',title:'Software Engineer',focus:'Backend Development',experienceYears:4,location:'Trivandrum, Kerala, India',highlights:['Multi-tenant SaaS platform serving 22 clients','10+ enterprise modules','Led and mentored 7 developers','Reduced a critical dashboard from approximately 6 minutes to 12 seconds']}));
app.get('/api/projects',(req,res)=>res.json([{id:1,name:'Portfolio API',description:'Node.js REST API forming the backend of this portfolio.',technologies:['Node.js','Express','REST API']} ]));
app.listen(PORT,()=>console.log(`Portfolio running at http://localhost:${PORT}`));
