const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Slipknot'));
bands.addBand(new Band('Bon jovi'));
bands.addBand(new Band('Daft punk'));
console.log(bands);

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { console.log('Cliente desconectado'); });

    client.on('mensaje', (payload) => {
        console.log('MENSAJE!!!', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        bands.addBand(
            new Band(
                this.name = payload.name
            )
        );

        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id)
        // console.log(bands)
        io.emit('active-bands', bands.getBands());
    })

    client.on('emitir-mensaje', (payload) => {
        // io.emit('nuevo-mensaje', payload)
        // console.log(payload);
        client.broadcast.emit('nuevo-mensaje', payload);
    });

});