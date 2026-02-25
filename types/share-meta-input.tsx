export type ShareMetaInput =
  | {
      item_type: "file";
      file_name: string;
      file_type: string;
      title: string;
    }
  | {
      item_type: "code";
      language: string;
      content_text: string;
      title: string;
    }
  | {
      item_type: "text";
      content_text: string;
      title: string;
    }
  | {
      item_type: "link";
      content_text: string;
      title: string;
    };