const { Router } = require('express');

// const {  } = require('../controllers/usuarios');
const { agregarCalificacion } = require('../controllers/CalificacionController')
const {obtenerCalificacionPorPelicula} = require('../controllers/CalificacionController');

const router = Router();

router.post('/calificar/:id', agregarCalificacion);
router.get('/obtenerCalificacion', obtenerCalificacionPorPelicula);


module.exports = router;