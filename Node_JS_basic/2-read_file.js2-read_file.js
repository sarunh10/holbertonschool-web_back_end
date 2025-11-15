const fs = require('fs');

function countStudents(path) {
  try {
    
    const data = fs.readFileSync(path, 'utf8');
    
 
    const lines = data
      .trim()
      .split('\n')
      .filter((line) => line.trim() !== '');

  
    lines.shift();

    const fields = {};

    for (const line of lines) {
      const parts = line.split(',');
      const firstname = parts[0];
      const field = parts[3];

      if (!fields[field]) fields[field] = [];
      fields[field].push(firstname);
    }

    
    console.log(`Number of students: ${lines.length}`);

   
    for (const field in fields) {
      const list = fields[field].join(', ');
      console.log(
        `Number of students in ${field}: ${fields[field].length}. List: ${list}`
      );
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
