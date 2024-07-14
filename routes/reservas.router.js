const express = require("express");
const router = express.Router();

const { crearReserva, Hoy, especificaReg, actualizarRoom, eliminarReg, filtrarHotel, rangoFecha, porTipo, porPago, acompanantes } = require("../controllers/reservas.controller");

const handleQueryParams = (req, res, next) => {
    const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query;

    if (hotel) {
        return filtrarHotel(req, res, next);
    } else if (fecha_inicio && fecha_fin) {
        return rangoFecha(req, res, next);
    } else if (tipo_habitacion) {
        return porTipo(req, res, next);
    } else if (estado) {
        return porPago(req, res, next);
    } else if (num_huespedes) {
        return acompanantes(req, res, next);
    } else {
        return Hoy(req, res, next);
    }
};

router.post("/", crearReserva);
router.get("/", handleQueryParams);
router.get("/:id", especificaReg);
router.put("/", actualizarRoom);
router.delete("/:id", eliminarReg);

module.exports = router;