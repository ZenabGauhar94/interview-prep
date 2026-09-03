import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const roles = await Promise.all([
    prisma.role.create({ data: { name: 'Associate Software Engineer', description: 'Entry-level SWE roles focused on coding fundamentals and CS basics.' } }),
    prisma.role.create({ data: { name: 'AI/ML Engineer', description: 'Entry-level ML roles covering ML fundamentals, Python, and applied projects.' } }),
    prisma.role.create({ data: { name: 'Product Manager', description: 'PM roles covering product sense, metrics, and execution.' } }),
  ]);

  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Data Structures & Algorithms' } }),
    prisma.category.create({ data: { name: 'System Design' } }),
    prisma.category.create({ data: { name: 'Behavioral' } }),
    prisma.category.create({ data: { name: 'ML Fundamentals' } }),
    prisma.category.create({ data: { name: 'Product Sense' } }),
  ]);

  const [ase, ml, pm] = roles;
  const [dsa, sysdesign, behavioral, mlfund, productSense] = categories;

  const questions = [
    { text: 'Reverse a linked list, iteratively and recursively.', difficulty: 'Easy', roleId: ase.id, categoryId: dsa.id },
    { text: 'Given an array, find two numbers that add up to a target (Two Sum).', difficulty: 'Easy', roleId: ase.id, categoryId: dsa.id },
    { text: 'Implement a LRU cache with O(1) get and put.', difficulty: 'Medium', roleId: ase.id, categoryId: dsa.id },
    { text: 'Detect a cycle in a linked list.', difficulty: 'Easy', roleId: ase.id, categoryId: dsa.id },
    { text: 'Find the kth largest element in an unsorted array.', difficulty: 'Medium', roleId: ase.id, categoryId: dsa.id },
    { text: 'Explain the difference between a stack and a queue, and give a real use case for each.', difficulty: 'Easy', roleId: ase.id, categoryId: dsa.id },
    { text: 'Design a URL shortener (like bit.ly). Talk through the data model and how you would scale it.', difficulty: 'Medium', roleId: ase.id, categoryId: sysdesign.id },
    { text: 'Design a rate limiter for an API.', difficulty: 'Medium', roleId: ase.id, categoryId: sysdesign.id },
    { text: 'What happens when you type a URL into a browser and hit enter?', difficulty: 'Medium', roleId: ase.id, categoryId: sysdesign.id },
    { text: 'Tell me about a time you disagreed with a teammate or manager. How did you handle it?', difficulty: 'Easy', roleId: ase.id, categoryId: behavioral.id },
    { text: 'Tell me about a bug that was hard to track down. How did you debug it?', difficulty: 'Easy', roleId: ase.id, categoryId: behavioral.id },
    { text: 'Describe a project you are proud of and your specific contribution to it.', difficulty: 'Easy', roleId: ase.id, categoryId: behavioral.id },

    { text: 'Explain the bias-variance tradeoff.', difficulty: 'Medium', roleId: ml.id, categoryId: mlfund.id },
    { text: 'What is the difference between L1 and L2 regularization, and when would you use each?', difficulty: 'Medium', roleId: ml.id, categoryId: mlfund.id },
    { text: 'Explain how a decision tree decides where to split.', difficulty: 'Medium', roleId: ml.id, categoryId: mlfund.id },
    { text: 'Walk me through how gradient descent works.', difficulty: 'Medium', roleId: ml.id, categoryId: mlfund.id },
    { text: 'How would you handle a dataset with severe class imbalance?', difficulty: 'Medium', roleId: ml.id, categoryId: mlfund.id },
    { text: 'Explain overfitting and three ways to reduce it.', difficulty: 'Easy', roleId: ml.id, categoryId: mlfund.id },
    { text: 'Design a system to detect fraudulent transactions in real time.', difficulty: 'Hard', roleId: ml.id, categoryId: sysdesign.id },
    { text: 'Walk me through an ML project end-to-end, from data to deployment.', difficulty: 'Medium', roleId: ml.id, categoryId: behavioral.id },

    { text: 'How would you improve [a product you use daily]?', difficulty: 'Medium', roleId: pm.id, categoryId: productSense.id },
    { text: 'How would you measure the success of a new feature?', difficulty: 'Medium', roleId: pm.id, categoryId: productSense.id },
    { text: 'Walk me through how you would prioritize a backlog with limited engineering resources.', difficulty: 'Medium', roleId: pm.id, categoryId: productSense.id },
    { text: 'Tell me about a time you used data to change a product decision.', difficulty: 'Easy', roleId: pm.id, categoryId: behavioral.id },
  ];

  await prisma.question.createMany({ data: questions });
  console.log('Seed complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });