const { faker } = require('@faker-js/faker');

function createLeadData() {
  const name = faker.person.fullName();
  const phone = `05${faker.string.numeric(8)}`;

  if (!/[A-Za-z]/.test(name) || /\d/.test(name)) {
    throw new Error(`Generated name must contain letters and no digits: "${name}"`);
  }

  if (!/^\d+$/.test(phone)) {
    throw new Error(`Generated phone must contain digits only: "${phone}"`);
  }

  return {
    name,
    email: faker.internet.email().toLowerCase(),
    phone,
    company: faker.company.name(),
    website: faker.internet.url({ protocol: 'https' }),
  };
}

module.exports = { createLeadData };
