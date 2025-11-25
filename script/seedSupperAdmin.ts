import bcrypt from 'bcrypt';
import { db } from './db';
import adminRole from './adminRole';
import Chance from 'chance';
const chanceInstance = new Chance();


const createAdminRolesQuery = `
  INSERT INTO roles (name,  created_by, description,  permissions, reference)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *`;


const createSuperAdminQuery = `
  INSERT INTO admins (
    first_name, last_name, email, role, password, 
    hasChangedGeneratedPassword, created_at, updated_at,
    reference
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *;
`;

const getAllAdminsQuery = `SELECT * FROM admins;`;
const superAdminExistsQuery = `SELECT * FROM roles WHERE name = 'Super Admin';`;

/**
 * Seeds a Super Admin role if it does not exist.
 * @returns {Promise<void>}
 */
const createSuperAdminRole = async (): Promise<void> => {
  const superAdminExists = await db.oneOrNone(superAdminExistsQuery);

  if (!superAdminExists) {
    console.log('Seeding Super Admin role...');

    const rolePromises = adminRole.map(({ name, created_by, description, permissions }) =>
      db.one(createAdminRolesQuery, [
        name,
        created_by,
        description,
        permissions,
        chanceInstance.string({ length: 10, alpha: true, numeric: true }),
      ])
    );

    await Promise.all(rolePromises);
    console.log('Super Admin role seeded successfully!');
  }
};

/**
 * Seeds a Super Admin user if none exists.
 * @returns {Promise<void>}
 */
const createSuperAdmin = async (): Promise<void> => {
  const admins = await db.manyOrNone(getAllAdminsQuery);

  if (admins.length === 0) {
    console.log('Seeding Super Admin user...');

    const password = await bcrypt.hash('Paysmosmo@2023453545', 10);
    await db.one(createSuperAdminQuery, [
      'Sheriff',
      'Alubankudi',
      'sheriff@paysmosmo.com',
      'Super Admin',
      password,
      true,
      new Date(),                    // $7 - created_at
      new Date(),                    // $8 - updated_at
     chanceInstance.string({ length: 10, alpha: true, numeric: true }),
    ]);

    console.log('Super Admin user seeded successfully!');
  } else {
    console.log('Super Admin user already exists.');
  }
};

// Execute the seed functions
(async () => {
  await createSuperAdminRole();
  await createSuperAdmin();
})();
