import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { getStateCities, getStates } from "../controllers/location.controller.js";


const router = Router()

/**
 * @route GET /api/location/india/states
 * @description Get all states in India
 * @access Private
 */

router.get('/states' , authenticateUser , getStates)


/**
 * @route GET /api/location/india/cities/:stateName
 * @description Get all cities in a state
 * @access Private
 * @param stateName
 */
router.get('/cities/:stateName' , authenticateUser , getStateCities )



export default router