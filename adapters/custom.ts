const translate = async (
  text,
  language,
  type,
) => {
  if (type === "markdown") {
    return `Markdown value in ${language["name"]}`;
  }

  return `Text value in ${language["name"]}`;
};

export default translate;
