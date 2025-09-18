// This Seed script was written by ChatGPT-5 with my review and modifications.
import { faker } from "@faker-js/faker";
import { PrismaClient } from "../generated/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL! } },
});

function uniqueEmail(first: string, last: string) {
  const tag = faker.string.alphanumeric(6).toLowerCase();
  return `${first}.${last}.${tag}@example.edu`.toLowerCase();
}

async function main() {

  const professors: Array<Awaited<ReturnType<typeof prisma.users.create>>> = [];
  const students: Array<Awaited<ReturnType<typeof prisma.users.create>>> = [];

  for (let i = 0; i < 2; i++) {
    const first = faker.person.firstName();
    const last = faker.person.lastName();
    const user = await prisma.users.create({
      data: {
        role: "professor",
        first_name: first,
        last_name: last,
        email: uniqueEmail(first, last),
        password: faker.internet.password(),
      },
    });
    professors.push(user);
  }

  for (let i = 0; i < 8; i++) {
    const first = faker.person.firstName();
    const last = faker.person.lastName();
    const user = await prisma.users.create({
      data: {
        role: "student",
        first_name: first,
        last_name: last,
        email: uniqueEmail(first, last),
        password: faker.internet.password(),
      },
    });
    students.push(user);
  }

  const users = [...professors, ...students];

  const courses: Array<Awaited<ReturnType<typeof prisma.courses.create>>> = [];
  for (let i = 0; i < 3; i++) {
    const professor = faker.helpers.arrayElement(professors);
    const course = await prisma.courses.create({
      data: {
        users_id: professor.id,
        course_name: `${faker.company.buzzPhrase()} 10${i + 1}`,
        course_desc: faker.lorem.paragraph(),
      },
    });
    courses.push(course);
  }

  const sections: Array<Awaited<ReturnType<typeof prisma.sections.create>>> = [];
  for (const course of courses) {
    const count = faker.number.int({ min: 3, max: 5 });
    const sampleStudents = faker.helpers.arrayElements(students, count);
    for (const s of sampleStudents) {
      const section = await prisma.sections.create({
        data: {
          course_id: course.id,
          users_id: s.id,
          section_code: faker.string.alphanumeric({ length: 6, casing: "upper" }),
        },
      });
      sections.push(section);
    }
  }

  const assignments: Array<Awaited<ReturnType<typeof prisma.assignments.create>>> = [];
  for (const course of courses) {
    const num = faker.number.int({ min: 2, max: 4 });
    for (let i = 0; i < num; i++) {
      const due = faker.date.soon({ days: 21 });
      const assignment = await prisma.assignments.create({
        data: {
          courses_id: course.id,
          assign_name: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
          assign_desc: faker.lorem.sentences({ min: 1, max: 3 }),
          due_date: due,
          completed: false,
        },
      });
      assignments.push(assignment);
    }
  }

  const submissions: Array<Awaited<ReturnType<typeof prisma.submissions.create>>> = [];
  for (const assignment of assignments) {
    const submitters = faker.helpers.arrayElements(
      students,
      faker.number.int({ min: 0, max: 3 })
    );
    for (const st of submitters) {
      const subTime = faker.date.between({
        from: faker.date.recent({ days: 7 }),
        to: assignment.due_date,
      });
      const sub = await prisma.submissions.create({
        data: {
          assign_id: assignment.id,
          user_id: st.id,
          submission_desc: faker.lorem.sentence(),
          submission_time: subTime,
        },
      });
      submissions.push(sub);
    }
  }

  for (const submission of submissions) {
    const numComments = faker.number.int({ min: 0, max: 3 });
    for (let i = 0; i < numComments; i++) {
      const commenter = faker.helpers.arrayElement(users);
      await prisma.comments.create({
        data: {
          submission_id: submission.id,
          user_id: commenter.id,
          comment_desc: faker.lorem.sentence(),
          comment_time: faker.date.recent({ days: 5 }),
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
