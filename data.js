const appData = {
    users: [
        { id: 'S001', role: 'student', name: 'Alice Johnson', email: 'alice@example.com', password: 'password123', dept: 'CS', year: '3rd', attendance: 85 },
        { id: 'T001', role: 'staff', name: 'Dr. Robert Smith', email: 'robert@example.com', password: 'password123', dept: 'CS' },
        { id: 'H001', role: 'hod', name: 'Dr. Sarah Wilson', email: 'sarah@example.com', password: 'password123', dept: 'CS' },
        { id: 'A001', role: 'admin', name: 'System Admin', email: 'admin@example.com', password: 'password123' }
    ],
    subjects: [
        { id: 101, name: 'Machine Learning', code: 'CS301', attendance: 90 },
        { id: 102, name: 'Database Systems', code: 'CS302', attendance: 75 },
        { id: 103, name: 'Web Dev', code: 'CS303', attendance: 92 }
    ],
    departments: ['CS', 'EE', 'ME', 'CE'],
    attendanceRecords: []
};
