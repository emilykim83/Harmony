const db = require('../models');
const Users = db.users;

const Lessons = db.lessons;

const Progress = db.progress;

const Sections = db.sections;

const LessonsData = [
  {
    title: 'Twinkle Twinkle Little Star',

    description: 'Learn to play Twinkle Twinkle Little Star with easy steps.',

    // type code here for "relation_many" field
  },

  {
    title: 'Mary Had a Little Lamb',

    description: 'Step-by-step guide to play Mary Had a Little Lamb.',

    // type code here for "relation_many" field
  },

  {
    title: 'Old MacDonald Had a Farm',

    description: 'Practice Old MacDonald Had a Farm with visual aids.',

    // type code here for "relation_many" field
  },

  {
    title: 'Jingle Bells',

    description: 'Learn Jingle Bells for the holiday season.',

    // type code here for "relation_many" field
  },

  {
    title: 'Happy Birthday',

    description: 'Master the Happy Birthday song for celebrations.',

    // type code here for "relation_many" field
  },
];

const ProgressData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    completed: true,

    completed_at: new Date('2023-10-01T10:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    completed: false,

    completed_at: new Date(),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    completed: true,

    completed_at: new Date('2023-10-02T15:30:00Z'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    completed: true,

    completed_at: new Date(),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    completed: true,

    completed_at: new Date('2023-10-03T09:45:00Z'),
  },
];

const SectionsData = [
  {
    name: 'Intro',

    // type code here for "relation_one" field
  },

  {
    name: 'Verse 1',

    // type code here for "relation_one" field
  },

  {
    name: 'Chorus',

    // type code here for "relation_one" field
  },

  {
    name: 'Verse 2',

    // type code here for "relation_one" field
  },

  {
    name: 'Outro',

    // type code here for "relation_one" field
  },
];

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateProgressWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Progress0 = await Progress.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Progress0?.setUser) {
    await Progress0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Progress1 = await Progress.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Progress1?.setUser) {
    await Progress1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Progress2 = await Progress.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Progress2?.setUser) {
    await Progress2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Progress3 = await Progress.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Progress3?.setUser) {
    await Progress3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Progress4 = await Progress.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Progress4?.setUser) {
    await Progress4.setUser(relatedUser4);
  }
}

async function associateProgressWithSection() {
  const relatedSection0 = await Sections.findOne({
    offset: Math.floor(Math.random() * (await Sections.count())),
  });
  const Progress0 = await Progress.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Progress0?.setSection) {
    await Progress0.setSection(relatedSection0);
  }

  const relatedSection1 = await Sections.findOne({
    offset: Math.floor(Math.random() * (await Sections.count())),
  });
  const Progress1 = await Progress.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Progress1?.setSection) {
    await Progress1.setSection(relatedSection1);
  }

  const relatedSection2 = await Sections.findOne({
    offset: Math.floor(Math.random() * (await Sections.count())),
  });
  const Progress2 = await Progress.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Progress2?.setSection) {
    await Progress2.setSection(relatedSection2);
  }

  const relatedSection3 = await Sections.findOne({
    offset: Math.floor(Math.random() * (await Sections.count())),
  });
  const Progress3 = await Progress.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Progress3?.setSection) {
    await Progress3.setSection(relatedSection3);
  }

  const relatedSection4 = await Sections.findOne({
    offset: Math.floor(Math.random() * (await Sections.count())),
  });
  const Progress4 = await Progress.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Progress4?.setSection) {
    await Progress4.setSection(relatedSection4);
  }
}

async function associateSectionWithLesson() {
  const relatedLesson0 = await Lessons.findOne({
    offset: Math.floor(Math.random() * (await Lessons.count())),
  });
  const Section0 = await Sections.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Section0?.setLesson) {
    await Section0.setLesson(relatedLesson0);
  }

  const relatedLesson1 = await Lessons.findOne({
    offset: Math.floor(Math.random() * (await Lessons.count())),
  });
  const Section1 = await Sections.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Section1?.setLesson) {
    await Section1.setLesson(relatedLesson1);
  }

  const relatedLesson2 = await Lessons.findOne({
    offset: Math.floor(Math.random() * (await Lessons.count())),
  });
  const Section2 = await Sections.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Section2?.setLesson) {
    await Section2.setLesson(relatedLesson2);
  }

  const relatedLesson3 = await Lessons.findOne({
    offset: Math.floor(Math.random() * (await Lessons.count())),
  });
  const Section3 = await Sections.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Section3?.setLesson) {
    await Section3.setLesson(relatedLesson3);
  }

  const relatedLesson4 = await Lessons.findOne({
    offset: Math.floor(Math.random() * (await Lessons.count())),
  });
  const Section4 = await Sections.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Section4?.setLesson) {
    await Section4.setLesson(relatedLesson4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Lessons.bulkCreate(LessonsData);

    await Progress.bulkCreate(ProgressData);

    await Sections.bulkCreate(SectionsData);

    await Promise.all([
      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateProgressWithUser(),

      await associateProgressWithSection(),

      await associateSectionWithLesson(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lessons', null, {});

    await queryInterface.bulkDelete('progress', null, {});

    await queryInterface.bulkDelete('sections', null, {});
  },
};
