import { promises as fs } from 'fs';
import { argv } from 'process';
import { assignRole, createUser, getRoleByName } from '../../../services/user-management.service';
import { Roles } from '../../../enums/roles.enum';
import initializeSequelize from '../../../loaders/sequelize.loader';
import syncModel from '../../models/index.model'


interface UserInterface {
    name: string,
    email: string,
    password: string,

}


async function readFile() {
    try {
        const bufferFileData = await fs.readFile(`${__dirname}/index.json`);
        const jsonString = bufferFileData.toString();
        return JSON.parse(jsonString);
    } catch (error) {
        throw new Error(error.message);
    }
}
async function creatAdmin(seedData: UserInterface[]) {
    try {
        const isValidated = true;
        for(let user of seedData){

            const userInfo = await createUser({ ...user, isValidated });
            
            const roleName = Roles.admin;
            const roleInfo = await getRoleByName(roleName);
            await assignRole(userInfo.id, roleInfo.id)
        }
        console.log("Admin created successfully.")
    } catch (error) {
        throw new Error(error.message);
    }
}

async function main() {
    //for checking
    await initializeSequelize()
    await syncModel()
    const seedData: UserInterface[] = await readFile();
    await creatAdmin(seedData)
}

main();