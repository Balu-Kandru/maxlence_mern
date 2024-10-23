import { promises as fs } from 'fs';
import { argv } from 'process';
import initializeSequelize from '../../../loaders/sequelize.loader';
import { LinkActionNRole } from '../../models/linkActionNRole.model';
import { Action } from '../../models/action.model';
import { Role } from '../../models/role.model';
import syncModel from '../../models/index.model'


interface ActionInterface {
    name: string;
    description: string;
}

interface RoleInterface {
    name: string;
    description: string;
    actions: ActionInterface[];
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

async function createRolesNAction(seedData: RoleInterface[]) {
    try {
        for (const roleData of seedData) {
            const role = await Role.create({
                name: roleData.name,
                description: roleData.description,
            });
            for (const actionData of roleData.actions) {
                const action = await Action.create({
                    name: actionData.name,
                    description: actionData.description,
                });

                await LinkActionNRole.create({
                    roleId: role.id,
                    actionId: action.id,
                });
            }
        }

        console.log("Roles and actions created successfully.");
    } catch (error) {
        console.error("Failed to create roles and actions:", error);
    }
}

async function main(){
    //for checking
    console.log("here----------------")
    await initializeSequelize()
    await syncModel()
    const seedData: RoleInterface[] = await readFile();
    await createRolesNAction(seedData)
    return
}


main();