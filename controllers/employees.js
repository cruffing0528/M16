import Employee from '../models/Employee.js';

// Retrieve all employees from the database
// Returns: Array of all employees with a count
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        // res.status(200).json({ employees });
        res.status(200).json({ employees, count: employees.length });
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
}

// Retrieve a single employee by ID
// Params: id (employee ID from URL)
// Returns: Single employee object or 404 if not found
const getEmployee = async (req, res) => {
    try {
        let { id: employeeID } = req.params;
        const employee = await Employee.findOne({ _id: employeeID });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ employee });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new employee in the database
// Body: Employee data (name, email, etc.)
// Returns: Newly created employee object with status 201
const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({ employee });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an existing employee by ID
// Params: id (employee ID from URL)
// Body: Updated employee data
// Returns: Updated employee object or 404 if not found
const updateEmployee = async (req, res) => {
    try {
        let { id: employeeID } = req.params;
        const employee = await Employee.findOneAndUpdate(
            { _id: employeeID },
            req.body,
            { new: true, runValidators: true }
        );
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ msg: 'Employee successfully updated', employee });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete an employee by ID
// Params: id (employee ID from URL)
// Returns: Success message or 404 if not found
const deleteEmployee = async (req, res) => {
    try {
        let { id: employeeID } = req.params;
        const employee = await Employee.findOneAndDelete({ _id: employeeID });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json('Employee successfully deleted');
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}