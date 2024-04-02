const trackingConfigs: Dictionary<
  string,
  {
    getParams: (target: HTMLElement) => Dictionary<string, string>;
  }
> = {
  file_download: {
    getParams: (target) => ({
      file_extension: target.dataset.fileExtension || '',
      file_name: target.dataset.fileName || '',
      link_url: target.dataset.linkUrl || '',
      link_text: target.dataset.linkText || '',
    }),
  },
};

export default trackingConfigs;
