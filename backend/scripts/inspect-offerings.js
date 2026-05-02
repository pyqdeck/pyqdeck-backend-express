import '../src/config/index.js';
import database from '../src/config/database.js';
import subjectOfferingRepository from '../src/repositories/subjectOfferingRepository.js';

async function inspect() {
  try {
    await database.connect();
    console.log('Connected to database');

    const result =
      await subjectOfferingRepository.findByUniversityBranchSemester(
        null,
        null,
        null,
        { page: 1, limit: 10, skip: 0 }
      );

    console.log('Offerings found:', result.items.length);
    if (result.items.length > 0) {
      console.log('First offering:', JSON.stringify(result.items[0], null, 2));
    } else {
      console.log('No offerings found');
    }

    await database.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

inspect();
