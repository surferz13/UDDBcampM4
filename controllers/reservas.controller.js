const moment = require("moment");
const { Reservas } = require('../models/Reservas')
const reg1 = new Reservas("Hotel Enjoy", "Single", "C1", 1, 1, "2024-07-07", "2024-07-13", "2024-08-05", 21, 2, "Si", "No");
const reg2 = new Reservas("Hotel Jojo", "Doble", "C2", 2, 53, "2024-07-11", "2024-09-17", "2024-09-22", 5, 3, "No", "No");
const reg3 = new Reservas("Hotel Cassie", "Suit", "C10", 3, 1001, "2024-07-12", "2024-12-23", "2024-12-30", 7, 2, "No", "No");
const reg4 = new Reservas("Hotel White Lotus", "Familiar", "C28", 4, 301, "2024-07-12", "2024-10-27", "2024-11-02", 6, 5, "Si", "No");
const reg5 = new Reservas("Hotel White Lotus", "VIP", "C45", 5, 902, "2024-07-10", "2024-10-20", "2024-10-30", 10, 1, "Si", "No");

const instanciasReservas = [reg1, reg2, reg3, reg4, reg5];


const crearReserva = (req, res) => {
    const name_hotel = req.body.name_hotel;
    const type_room = req.body.type_room;
    const id_guest = req.body.id_guest;
    const id_booking = Math.max(...instanciasReservas.map(booking => booking.id_booking))+1
    const id_room = req.body.id_room;
    const booking_date = moment().format('YYYY-MM-DD');
    const checkin_date = moment(req.body.checkin_date).format('YYYY-MM-DD');
    const checkout_date = moment(req.body.checkout_date).format('YYYY-MM-DD');
    const nights_qty = moment(req.body.departure_date).diff(moment(req.body.arrival_date), 'days');
    const guests_qty = req.body.guests_qty;
    const is_paidbooking = "No";
    const is_cancelbooking = "No";

    const Reg = new Reservas(name_hotel, type_room, id_guest, id_booking, id_room, booking_date, checkin_date, checkout_date, nights_qty, guests_qty, is_paidbooking, is_cancelbooking);
    console.log(Reg)
    instanciasReservas.push(Reg)
    res.send({ ok: true, description: 'Reserva generada correctamente' });
  };

const Hoy = (req, res) => {
    let diaHoy = moment().format('YYYY-MM-DD');
    let matchingReservas = instanciasReservas.filter(reservas => reservas.checkin_date === diaHoy).map(reservas => reservas.id_booking);
    if (matchingReservas.length > 0) {
        res.send(matchingReservas);     
    }
    else{
        res.status(404).send({ ok: false, description: 'No se encontraron reservas para hoy' });
    }   

}

const especificaReg =(req,res) => {
    
    let booking = instanciasReservas.find(b => b.id_booking ===  parseInt(req.params.id));
    if (booking) {
        res.send(booking);        
    }
    else{
        res.status(404).send({ ok: false, description: 'No se encontró ID de reserva' });
    }    
}

const actualizarRoom =(req,res) => {
    let booking = instanciasReservas.find(b => b.id_booking ===  parseInt(req.body.id));
    if (booking) {
        booking.type_room=req.body.type_room;
        console.log(booking)     
        res.send({ ok: true, description: 'Reserva actualizada correctamente' });       
    }
    else{
        res.status(404).send({ ok: false, description: 'No se encontró ID de reserva para actualizar datos' });
    }    
}

const eliminarReg =(req,res) => {
    let booking = instanciasReservas.find(b => b.id_booking ===  parseInt(req.params.id));
    if (booking) {
        booking.is_cancelbooking="Si";
        console.log(booking)
        res.send({ ok: true, description: 'Reserva cancelada correctamente' }); 
    }
    else{
        res.status(404).send({ ok: false, description: 'No se encontró ID de reserva a eliminar' });
    }    
}

const filtrarHotel =(req,res) =>{
    const hotel = req.query.hotel;
    const today = moment().format('YYYY-MM-DD');
    const futureDate = moment().add(30, 'days').format('YYYY-MM-DD');
    
    const matchReservas = instanciasReservas.filter(booking => {
        return booking.name_hotel === hotel &&
               moment(booking.checkin_date).isBetween(today, futureDate, 'day', '[]');
    });

    if (matchReservas.length > 0) {
        res.send(matchReservas);
    } else {
        res.status(404).send({ ok: false, description: `No se encontraron reservas para el ${hotel} en los próximos 30 días` });
    }

}   


const rangoFecha =(req,res) => {
    const { fecha_inicio, fecha_fin } = req.query;
    const filteredReservas = instanciasReservas.filter(reserva => {
        return reserva.checkin_date >= fecha_inicio && reserva.checkout_date <= fecha_fin;
    });

    if (filteredReservas.length > 0) {
        res.send(filteredReservas);
    } else {
        res.status(404).send({ ok: false, description: 'No se encontraron reservas en el rango de fechas proporcionado' });
    }
};

const porTipo=(req,res) =>{
    const room_class = req.query.tipo_habitacion;
    const today = moment().format('YYYY-MM-DD');
    const futureDate = moment().add(30, 'days').format('YYYY-MM-DD');
    
    const matchReservas = instanciasReservas.filter(booking => {
        return booking.type_room === room_class &&
               moment(booking.checkin_date).isBetween(today, futureDate, 'day', '[]');
    });
    

    if (matchReservas.length > 0) {
        res.send(matchReservas);
    } else {
        res.status(404).send({ ok: false, description: `No se encontraron reservas asociadas a la clase ${room_class} en los próximos 30 días` });
    }

}

const porPago =(req,res) => {
    const { estado } = req.query;
    let booking = instanciasReservas.filter(booking => booking.is_paidbooking === estado)
    if (booking) {
        res.send(booking);      
    }
    else{
        res.status(404).send({ ok: false, description: 'No se encontró reservas con ese estado de pago' });
    }    
}

const acompanantes =(req,res) => {
    const { num_huespedes } = req.query;
    let booking = instanciasReservas.find(b => b.guests_qty >=  parseInt(num_huespedes));
    if (booking) {
        res.send(booking);        
    }
    else{
        res.status(404).send({ ok: false, description: `No se encontraron reservas con al menos ${parseInt(num_huespedes)} huespedes` });
    }    
}
module.exports = { crearReserva, Hoy, especificaReg, actualizarRoom, eliminarReg, filtrarHotel, rangoFecha, porTipo, porPago, acompanantes };
