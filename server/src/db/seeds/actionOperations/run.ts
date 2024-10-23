import { promises as fs } from 'fs';
import { getAction } from '../../../services/user-management.service';
import initializeSequelize from '../../../loaders/sequelize.loader';
import syncModel from '../../models/index.model'
import { ActionOperation } from '../../models/ActionOperation';


interface OperationInterface {
    actionName: string,
    fetch: string,
    edit: string,
    post: string,
    delete: string
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
async function saveActionOperations(seedData: OperationInterface[]) {
    try {
        for (let act of seedData) {
            let { id } = await getAction({ name: act.actionName });
            await ActionOperation.create({
                actionId: id,
                fetch: act.fetch,
                post: act.post,
                edit: act.edit,
                delete: act.delete,
            })
        }
        console.log("created successfully.")
    } catch (error) {
        throw new Error(error.message);
    }
}

async function main() {
    //for checking
    await initializeSequelize()
    await syncModel()
    const seedData: OperationInterface[] = await readFile();
    await saveActionOperations(seedData)
}

main();