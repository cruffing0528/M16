import express from 'express';
import path from 'path';
import {getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee} from '../controllers/employees.js';

const router = express.Router()

router.route('/api/employees')
    .get(getAllEmployees)
    .post(createEmployee);

router.route('/api/employees/:id')
    .get(getEmployee)
    .patch(updateEmployee)
    .delete(deleteEmployee);

// Catch-all for unmatched routes - serve index.html for client-side routing
router.get(/.*/, (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

export default router