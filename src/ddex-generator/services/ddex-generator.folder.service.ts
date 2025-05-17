import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';


@Injectable()
export class DdexGeneratorFolderService {
    constructor() {}

    async createFolder(folderPath: string): Promise<void> {
        try {
        await fs.mkdir(folderPath, { recursive: true });
        } catch (error) {
        throw new Error(`Failed to create folder ${folderPath}: ${error.message}`);
        }
    }

    async folderExists(folderPath: string): Promise<boolean> {
        try {
        const stat = await fs.stat(folderPath);
        return stat.isDirectory();
        } catch (error) {
        if (error.code === 'ENOENT') return false;
        throw error;
        }
    }

    async createFolderStructure(basePath: string, structure: Record<string, any>): Promise<void> {
        for (const folderName in structure) {
            const currentPath = path.join(basePath, folderName);
            await this.createFolder(currentPath);

            const nested = structure[folderName];

            if (typeof nested === 'object' && nested !== null) {
                await this.createFolderStructure(currentPath, nested);
            }
        }
    }
}
