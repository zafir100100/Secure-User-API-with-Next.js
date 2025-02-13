import fs from 'fs-extra';

const dbPath = 'db/db.json';

export const loadUsers = async () => {
    try {
        const data = await fs.readJson(dbPath);
        return data.users || [];
    } catch (error) {
        return [];
    }
};

export const saveUsers = async (users) => {
    if (!users || !Array.isArray(users)) {
        return;
    }
    await fs.writeJson(dbPath, { users });
};
