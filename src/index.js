const express = require('express');
const bodyParser = require('body-parser');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    // console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // const {City,Airport} = require('./models');
    // const bengaluru = await City.findByPk(1);
    // console.log(bengaluru);
    // const kempaPort = await bengaluru.createAirport({name:"kempegowda",code:'BLR',cityId:1})
    // console.log(kempaPort);
    // const airPortsInBlr = await bengaluru.getAirports();
    // console.log(airPortsInBlr);
    // const mangloreAirport = await Airport.findByPk(4);
    // console.log(mangloreAirport);
    // await bengaluru.removeAirport(mangloreAirport);
    // bengaluru.destroy({
    //     where : {
    //         id : 1
    //     }
    // })
});
