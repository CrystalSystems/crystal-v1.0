import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import styles from "./AboutCrystalPage.module.css";

export function AboutCrystalPage() {
  const { i18n } = useTranslation();
  return (
    <div className={styles.about_crystal}>
      {i18n.language === "ru" ? (
        <>
          <h1>О CRYSTAL</h1>
          <p>
            CRYSTAL - это социальная сеть с <a href="https://github.com/CrystalSystems" target="_blank" rel="noreferrer noopener" aria-label="ссылка на исходный код CRYSTAL">открытым</a> исходным кодом, находящаяся в стадии разработки. Постепенно будут появляться новые функции: личные сообщения, комментарии, фото/видео альбомы, поиск и т.д. На заключительных этапах разработки, будут добавлены уникальные возможности, которых нет в других социальных сетях.
          </p>
          <p>
            Следите за проектом и оставляйте коммментарии в <Link
              to={"https://discord.com/invite/ENB7RbxVZE"}
              target="_blank"
              rel="noreferrer noopener"
            >discord</Link> и <Link
              to={"https://t.me/AndrewShedovChat"}
              target="_blank"
              rel="noreferrer noopener"
            >telegram</Link>.
          </p>
        </>
      ) : (
        <>
          <h1>About CRYSTAL</h1>
          <p>
            CRYSTAL - is an <a href="https://github.com/CrystalSystems" target="_blank" rel="noreferrer noopener" aria-label="link to crystal source code">open</a> source social network under development. New functions will gradually appear: personal messages, comments, photo/video albums, search, etc. At the final stages of development, unique features that are not available in other social networks will be added.
          </p>
          <p>
            Follow the project and leave comments on <Link
              to={"https://discord.com/invite/ENB7RbxVZE"}
              target="_blank"
              rel="noreferrer noopener"
            >discord</Link> and <Link
              to={"https://t.me/AndrewShedovChat"}
              target="_blank"
              rel="noreferrer noopener"
            >telegram</Link>.
          </p>
        </>
      )}
    </div>
  );
};
