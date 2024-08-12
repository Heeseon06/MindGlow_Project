import express from 'express';
import * as reserveController from '../controller/reserve.js'


const router = express.Router();
// localhost:8080/management
router.put('/act/:chatName', reserveController.updateActive)

router.get('/Cli/:userid', reserveController.getByClient)

router.get('/Cou/:userid', reserveController.getByCounselor)

router.get('/:client/:counselor', reserveController.createReserve)



export default router;