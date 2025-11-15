import { readDatabase } from '../utils.js';

class StudentsController {
  static async getAllStudents(req, res) {
    const dbFile = process.argv[2]; 
    try {
      const data = await readDatabase(dbFile);

      const fields = Object.keys(data);

      const total = fields.reduce((acc, f) => acc + data[f].length, 0);

      let output = 'This is the list of our students\n';
      fields
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .forEach((field) => {
          const names = data[field].join(', ');
          output += `Number of students in ${field}: ${data[field].length}. List: ${names}\n`;
        });
      return res.status(200).send(output.trim());
    } catch (err) {
      return res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const major = req.params.major;
    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    const dbFile = process.argv[2];
    try {
      const data = await readDatabase(dbFile);
      const list = data[major] || [];
      const names = list.join(', ');
      return res.status(200).send(`List: ${names}`);
    } catch (err) {
      return res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
