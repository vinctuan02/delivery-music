import { Injectable } from '@nestjs/common';
import { create } from 'xmlbuilder2';
import * as fs from 'fs';

interface Track {
  title: string;
  artist: string;
  isrc: string;
  duration: number;
  genre?: string;
  language?: string;
}

interface Release {
  releaseId: string;
  title: string;
  labelName: string;
  releaseType: 'Album' | 'Single' | 'EP';
  releaseDate: string;
  mainArtist: string;
  tracks: Track[];
}

@Injectable()
export class DdexGeneratorFileService {

  constructor(){}

  generateDdexXml(release: Release, outputPath: string): void {
    const doc = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('ern:NewReleaseMessage', {
        xmlns: 'http://ddex.net/xml/ern/382',
        'xmlns:ern': 'http://ddex.net/xml/ern/382',
        MessageSchemaVersionId: 'ern/382',
        MessageCreatedDateTime: new Date().toISOString(),
      })
      .ele('MessageHeader')
        .ele('MessageId').txt(`MSG-${release.releaseId}`).up()
        .ele('MessageThreadId').txt(`THREAD-${release.releaseId}`).up()
        .ele('MessageSender')
          .ele('PartyId', { Type: 'DDEX' }).txt('YOUR_COMPANY_ID').up()
        .up()
        .ele('SentDateTime').txt(new Date().toISOString()).up()
      .up()
      .ele('NewRelease')
        .ele('ReleaseId').txt(release.releaseId).up()
        .ele('ReleaseType').txt(release.releaseType).up()
        .ele('ReleaseTitle')
          .ele('TitleText').txt(release.title).up()
        .up()
        .ele('ReleaseDate').txt(release.releaseDate).up()
        .ele('LabelName').txt(release.labelName).up()
        .ele('MainArtist').txt(release.mainArtist).up();

    release.tracks.forEach((track, idx) => {
      doc.ele('ReleaseTrack')
        .ele('TrackSequenceNumber').txt((idx + 1).toString()).up()
        .ele('TrackTitle')
          .ele('TitleText').txt(track.title).up()
        .up()
        .ele('Artist').txt(track.artist).up()
        .ele('ISRC').txt(track.isrc).up()
        .ele('Duration').txt(track.duration.toString()).up()
        .ele('Genre').txt(track.genre || '').up()
        .ele('Language').txt(track.language || '').up()
      .up();
    });

    const xmlString = doc.end({ prettyPrint: true });
    fs.writeFileSync(outputPath, xmlString, { encoding: 'utf8' });
  }
}
