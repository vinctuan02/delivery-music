import { Injectable } from "@nestjs/common";
import * as ftp from "basic-ftp";

@Injectable()
export class DeliverySoundCloudService {
  async testConnection(): Promise<boolean> {
    const client = new ftp.Client();
    client.ftp.verbose = false;

    try {
      await client.access({
        host: "ftp.merlinnetwork.org",
        port: 21,
        user: "bombshelter-digital-services-llc",
        password: "Bolaaight@2344",
        secure: true
      });
      return true;
    } catch (error) {
      console.error('FTP connection error:', error);
      return false;
    } finally {
      client.close();
    }
  }

  async uploadFile(
    localPath: string, remotePath: string
  ): Promise<void> {
    const client = new ftp.Client();
    client.ftp.verbose = false; // bật true nếu cần debug

    try {
      await client.access({
        host: "ftp.merlinnetwork.org",
        port: 21,
        user: "bombshelter-digital-services-llc",
        password: "Bolaaight@2344",
        secure: true
      });

     const result = await client.uploadFrom(localPath, remotePath);
      console.log(`Uploaded ${localPath} to ${remotePath} successfully.`);
      console.log(result);
    } catch (error) {
      console.error('FTP upload error:', error);
      throw error;
    } finally {
      client.close();
    }
  }
}
