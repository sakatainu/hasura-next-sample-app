import { saveAs } from 'file-saver';
import { trackEvent } from '~/modules/EventTracker';

export default class FileDownloader {
  /**
   * CSVをダウンロードする
   */
  public static downloadCsv = (
    filename: string,
    csvData: Primitive[][],
    separator = ',',
    LF = '\n'
  ) => {
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const file = csvData.map((row) => row.join(separator)).join(LF);

    const blob = new Blob([bom, file], {
      type: 'text/csv',
    });

    trackEvent('file_download', {
      file_extension: '.csv',
      file_name: filename,
    });

    saveAs(blob, filename);
  };
}
