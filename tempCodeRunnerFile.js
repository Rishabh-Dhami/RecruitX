use('test'); // Change 'test' to your database name

db.jobs.insertMany([
    {
        jobTitle: "Software Engineer",
        companyName: "Tech Solutions Inc.",
        employmentType: "Full-time",
        location: "New York, NY",
        salary: 95000,
        description: "Develop and maintain web applications using modern technologies.",
        owner: ObjectId("67ade0182b91482bdac907bf"),
        applicants: []
    },
    {
        jobTitle: "Frontend Developer",
        companyName: "Creative Designs LLC",
        employmentType: "Part-time",
        location: "San Francisco, CA",
        salary: 60000,
        description: "Create engaging UI/UX for web applications.",
        owner: ObjectId("67ade0182b91482bdac907bf"),
        applicants: []
    },
    {
        jobTitle: "Data Scientist",
        companyName: "AI Innovators",
        employmentType: "Full-time",
        location: "Boston, MA",
        salary: 110000,
        description: "Analyze complex data sets and build predictive models.",
        owner: ObjectId("67ade0182b91482bdac907bf"),
        applicants: []
    },
    {
        jobTitle: "Project Manager",
        companyName: "Enterprise Corp",
        employmentType: "Contract",
        location: "Seattle, WA",
        salary: 85000,
        description: "Lead teams and manage project lifecycles.",
        owner: ObjectId("67ade0182b91482bdac907bf"),
        applicants: []
    },
    {
        jobTitle: "DevOps Engineer",
        companyName: "Cloud Solutions Ltd",
        employmentType: "Full-time",
        location: "Austin, TX",
        salary: 105000,
        description: "Implement CI/CD pipelines and manage cloud infrastructure.",
        owner: ObjectId("67ade0182b91482bdac907bf"),
        applicants: []
    },
    {
        jobTitle: "Cybersecurity Analyst",
        companyName: "SecureTech",
        employmentType: "Full-time",
        location: "Chicago, IL",
        salary: 95000,
        description: "Monitor and enhance security measures to protect company data.",
        owner: ObjectId("67ade0182b91482bdac907bf"),
        applicants: []
    },
    {
        jobTitle: "Marketing Specialist",
        companyName: "BrandBoost",
        employmentType: "Part-time",
        location: "Los Angeles, CA",
        salary: 55000,
        description: "Develop and execute digital marketing campaigns.",
        owner: ObjectId("67ade0182b91482bdac907bf"),
        applicants: []
    },
    {
        jobTitle: "UI/UX Designer",
        companyName: "DesignStudio",
        employmentType: "Freelance",
        location: "Remote",
        salary: 70000,
        description: "Design user-friendly interfaces and improve user experience.",
        owner: ObjectId("67ade0182b91482bdac907bf"),
        applicants: []
    },
    {
        jobTitle: "Backend Developer",
        companyName: "WebSolutions",
        employmentType: "Full-time",
        location: "Denver, CO",
        salary: 90000,
        description: "Develop scalable backend APIs and services.",
        owner: ObjectId("67ade0182b91482bdac907bf"),
        applicants: []
    },
    {
        jobTitle: "HR Manager",
        companyName: "PeopleFirst",
        employmentType: "Full-time",
        location: "Houston, TX",
        salary: 80000,
        description: "Manage hiring processes and employee relations.",
        owner: ObjectId("67ade0182b91482bdac907bf"),
        applicants: []
    }
]);
