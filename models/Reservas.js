class Reservas {
    constructor(name_hotel, type_room, id_guest, id_booking, id_room, booking_date, checkin_date, checkout_date, nights_qty, guests_qty, is_paidbooking, is_cancelbooking) {
        this.name_hotel = name_hotel;
        this.type_room = type_room;
        this.id_guest = id_guest;
        this.id_booking = id_booking;
        this.id_room = id_room;
        this.booking_date = booking_date;
        this.checkin_date = checkin_date;
        this.checkout_date = checkout_date;
        this.nights_qty = nights_qty;
        this.guests_qty = guests_qty;
        this.is_paidbooking = is_paidbooking;
        this.is_cancelbooking = is_cancelbooking;

    }
    set setPaid(is_paidbooking){
        this.is_paidbooking = is_paidbooking;
    }
    set setCancel(is_cancelbooking){
        this.is_cancelbooking = is_cancelbooking;
    }
}

module.exports = { Reservas };
