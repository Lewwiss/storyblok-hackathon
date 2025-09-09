import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const translate = async ({
  id,
  adapter,
}: {
  id: number;
  adapter: string;
}) => {
  const adapterFunction = (await import(`../adapters/${adapter}.ts`)).default;

  const {
    data: {
      space: { languages },
    },
  } = await axios.get(
    `https://mapi.storyblok.com/v1/spaces/${process.env.STORYBLOK_SPACE_ID}`,
    {
      headers: {
        Authorization: String(process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN),
      },
    }
  );

  const {
    data: { components },
  } = await axios.get(
    `https://mapi.storyblok.com/v1/spaces/${process.env.STORYBLOK_SPACE_ID}/components`,
    {
      headers: {
        Authorization: String(process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN),
      },
    }
  );

  const {
    data: {
      story: { content },
    },
  } = await axios.get(
    `https://mapi.storyblok.com/v1/spaces/${process.env.STORYBLOK_SPACE_ID}/stories/${id}`,
    {
      headers: {
        Authorization: String(process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN),
      },
    }
  );

  const inject = async (obj: Record<string, any>, path: string[] = []) => {
    const entries = Object.entries(obj);

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];

      if (
        obj["component"] &&
        !["component", "_uid"].includes(key) &&
        !key.includes("__i18n__")
      ) {
        const schema: any = components.find(
          (component) => component.name === obj.component
        )["schema"];
        const translatable =
          Object.keys(schema[key] || {}).includes("translatable") &&
          schema[key]["translatable"];

        if (!key.includes("__i18n__") && translatable) {
          for (const lanuage of languages) {
            obj[`${key}__i18n__${lanuage["code"]}`.replaceAll("-", "_")] = await adapterFunction(
              value,
              lanuage,
              schema[key]["type"]
            );
          }
        }
      }

      if (typeof value === "object" && value !== null) {
        await inject(value, [...path, key]);
      }
    }

    return { obj };
  };


  // fetch tags


  // create tag if it doesn't exist


  // add tag to story


  // await axios.put(
  //   `https://mapi.storyblok.com/v1/spaces/${process.env.STORYBLOK_SPACE_ID}/stories/${id}`,
  //   {
  //     story: {
  //       content: (await inject(content)).obj,
  //     },
  //   },
  //   {
  //     headers: {
  //       Authorization: String(process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN),
  //     },
  //   }
  // );
};

translate({ id: 665804672, adapter: "custom" });
