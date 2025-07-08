import {
  useState,
  useRef,
  useEffect
} from "react";
import { useSelector } from "react-redux";
import {
  useNavigate,
  Navigate,
  useParams
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import imageCompression from "browser-image-compression";
import TextareaAutosize from "react-textarea-autosize";
import {
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import { httpClient } from "../../shared/api";
import { API_BASE_URL } from '../../shared/constants';
import { LoadingBar, Loader } from "../../shared/ui";
import { NotFoundPage } from "../../pages";

import styles from "./EditPostPage.module.css";

export function EditPostPage() {

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { t } = useTranslation();

  // post image preview
  const [databaseImageUrl, setDatabaseImageUrl] = useState();
  const [databaseImageUrlEditing, setDatabaseImageUrlEditing] = useState();
  const fileImagePreviewRef = useRef();
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [fileImagePreviewUrl, setFileImagePreviewUrl] = useState();
  const [fileImagePreview, setFileImagePreview] = useState();
  const [changeImageCheck, setChangeImageCheck] = useState(false);

  // compressed post image preview
  // preview image loading and error status
  const [imagePreviewLoadingStatus, setImagePreviewLoadingStatus] =
    useState(false);
  const [imagePreviewLoadingStatusError, setImagePreviewLoadingStatusError] =
    useState(false);
  useEffect(() => {
    if (imagePreviewLoadingStatus === 100) {
      setTimeout(() => {
        setImagePreviewLoadingStatus(false);
      }, "500");
    }
    if (imagePreviewLoadingStatusError) {
      setTimeout(() => {
        setImagePreviewLoadingStatusError(false);
      }, "3500");
    }
  }, [imagePreviewLoadingStatus, imagePreviewLoadingStatusError]);
  // /preview image loading and error status

  async function onChangeCompressedFileImagePreview(event) {
    setImagePreviewLoadingStatusError(false);
    const imageFile = event.target.files[0];
    const options = {
      // maxSizeMB: 1,
      maxSizeMB: 0.25,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: (loading) => {
        setImagePreviewLoadingStatus(loading);
      },
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const convertingBlobToFile = new File([compressedFile], "name.png", {
        type: "image/jpeg",
      });
      setFileImagePreview(convertingBlobToFile);
      setFileImagePreviewUrl(URL.createObjectURL(compressedFile));
      setChangeImageCheck(true)
      setImagePreviewUrl(null)
      setImagePreviewLoadingStatusError(false);
    } catch (error) {
      console.log(error);
      if (
        error != "Error: The file given is not an instance of Blob or File"
      ) {
        setImagePreviewLoadingStatusError(true);
      }
      setImagePreviewLoadingStatus(false);
    }
  }
  // /compressed post image preview
  // /post image preview

  // title
  const titleRef = useRef();
  const [title, setTitle] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [titleValueDatabase, setTitleValueDatabase] = useState();
  const [numberCharactersInTitle, setNumberCharactersInTitle] = useState();
  const onChangeTitle = (event) => {
    setNumberCharactersInTitle(event.target.value.length);
    setTitle(event.target.value);
    setEnteredTitle(event.target.value);
    setChangeTitleCheck(true)
  };
  // /title

  // text
  const textRef = useRef();
  const [text, setText] = useState("");
  const [enteredText, setEnteredText] = useState("");
  const [textValueDatabase, setTextValueDatabase] = useState();
  const [numberCharactersInText, setNumberCharactersInText] = useState();
  const onChangeText = (event) => {
    setNumberCharactersInText(event.target.value.length);
    setText(event.target.value);
    setEnteredText(event.target.value);
    setChangeTextCheck(true)
  };
  // /text

  const [changeTitleCheck, setChangeTitleCheck] = useState(false);
  const [changeTextCheck, setChangeTextCheck] = useState(false);

  useEffect(() => {
    if (title !== enteredTitle) {
      setChangeTitleCheck(false);
    }
    if (text !== enteredText) {
      setChangeTextCheck(false);
    }
    if (!imagePreviewUrl &&
      !fileImagePreviewUrl &&
      !databaseImageUrl &&
      !enteredTitle &&
      !enteredText
    ) {
      setChangeImageCheck(false)
    }
    if (titleValueDatabase === enteredTitle) {
      setEnteredTitle(null);
    }
    if (textValueDatabase === enteredText) {
      setEnteredText(null);
    }
    if (titleValueDatabase === title) {
      setNumberCharactersInTitle(null);
    }
    if (textValueDatabase === text) {
      setNumberCharactersInText(null);
    }
  }, [titleValueDatabase, title, textValueDatabase, text, enteredTitle, enteredText, databaseImageUrl, fileImagePreviewUrl, imagePreviewUrl, changeImageCheck, changeTitleCheck, changeTextCheck]);

  const onClickChangePost = async () => {
    try {
      const fields = {
        imageUrl: databaseImageUrlEditing,
        text,
        postId,
        title,
      };

      const formData = new FormData();
      const file = fileImagePreview;
      formData.append("image", file);
      fileImagePreview
        ? await httpClient
          .post(`/posts/${postId}/image`, formData)
          .then((response) => {
            const postId = response.postId;
            const imageUrl = response.url;
            const fields = {
              imageUrl,
              text,
              title,
            };
            return httpClient.patch(`/posts/${postId}`, fields);
          })
          .then((response) => {
            const postId = response.postId;
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            navigate("/posts/" + postId);
          })
        : await httpClient.patch(`/posts/${postId}`, fields);
      navigate("/posts/" + postId);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (err) {
      console.warn(err);
    }
  };

  const post = useQuery({
    queryKey: ['posts', "editPostPage", postId],
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    retry: false,
    queryFn: () =>
      httpClient
        .get(`/posts/${postId}/edit`)
        .then((response) => {
          return response;
        }),
  });

  useEffect(() => {
    setTitle(post.data?.title);
    setTitleValueDatabase(post.data?.title);
    setText(post.data?.text);
    setTextValueDatabase(post.data?.text);
    setDatabaseImageUrl(
      post.data?.imageUrl && API_BASE_URL + post.data.imageUrl,
    );
    setImagePreviewUrl(
      post.data?.imageUrl && API_BASE_URL + post.data.imageUrl,
    );
    setDatabaseImageUrlEditing(post.data?.imageUrl);
  }, [post.data]);

  const onClickRemoveImage = () => {
    setDatabaseImageUrlEditing(null);
    setFileImagePreviewUrl(null);
    setImagePreviewUrl(null);
    setFileImagePreview(null);
    (enteredTitle ||
      enteredText ||
      titleValueDatabase ||
      textValueDatabase
    ) ?
      setChangeImageCheck(true) :
      setChangeImageCheck(false)
    fileImagePreviewRef.current.value = null;
  };

  if (post.error?.message === "No access") {
    return <Navigate to="/" />;
  }

  return (
    <>
      {post.isPending &&
        <div className={styles.loader}>
          <Loader />
        </div>
      }
      <div
        className={styles.edit_post}
        data-edit-post-page-dark-theme={darkThemeStatus}
      >
        <div className={styles.title}>
          <h1>{t("EditPostPage.EditPost")}</h1>
        </div>

        {(post.error?.response?.message === "Post not found" || post.isError) && <NotFoundPage />}

        {post.isSuccess && (
          <>
            {(imagePreviewUrl || fileImagePreview) && (
              <div className={styles.image_preview}>
                <img alt="" src={imagePreviewUrl || fileImagePreviewUrl} />
              </div>
            )}
            {imagePreviewLoadingStatus && (
              <div className={styles.image_preview_loading_bar_wrap}>
                <div className={styles.image_preview_loading_bar}>
                  <LoadingBar value={imagePreviewLoadingStatus} />
                </div>
              </div>
            )}
            {imagePreviewLoadingStatusError && (
              <div
                className={styles.image_preview_loading_status_error_wrap}
              >
                <div className={styles.image_preview_loading_status_error}>
                  <p>{t("SystemMessages.Error")}</p>
                </div>
              </div>
            )}
            <div className={styles.add_delete_preview_buttons_wrap}>
              <button onClick={() => fileImagePreviewRef.current.click()}>
                {databaseImageUrl || fileImagePreviewUrl
                  ? t("EditPostPage.Change")
                  : t("EditPostPage.AddPreview")}
              </button>
              {(imagePreviewUrl || fileImagePreview) && (
                <button onClick={onClickRemoveImage}>{t("EditPostPage.Delete")}</button>
              )}
            </div>
            <div className={styles.post_title}>
              <TextareaAutosize
                type="text"
                maxLength={220}
                ref={titleRef}
                value={title}
                variant="standard"
                placeholder={t("EditPostPage.Title")}
                onChange={onChangeTitle}
              />
            </div>
            {numberCharactersInTitle > 0 && (
              <div className={styles.post_title_letter_counter}>
                <p>{numberCharactersInTitle}/220</p>
              </div>
            )}
            <div className={styles.text}>
              <TextareaAutosize
                // minRows={1}
                type="text"
                // maxRows={3}
                maxLength={75000}
                value={text}
                ref={textRef}
                onChange={onChangeText}
                variant="standard"
                placeholder={
                  (imagePreviewUrl || fileImagePreviewUrl ? "" : "* ") +
                  t("EditPostPage.Text")
                }
              />
            </div>
            {numberCharactersInText > 0 && (
              <div className={styles.text_letter_counter}>
                <p>{numberCharactersInText}/75000</p>
              </div>
            )}
            <div className={styles.publish_post_back_buttons_wrap}>
              <div className={styles.publish_post_back_buttons}>
                <div className={styles.back}>
                  <button onClick={() => navigate(-1)}>
                    {t("EditPostPage.Back")}
                  </button>
                </div>
                {(changeTitleCheck || changeTextCheck || changeImageCheck) && (
                  <div className={styles.publish_post}>
                    <button onClick={onClickChangePost}>
                      {t("EditPostPage.Publish")}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <input
              ref={fileImagePreviewRef}
              type="file"
              accept="image/*"
              onChange={(event) => onChangeCompressedFileImagePreview(event)}
              hidden
            />
          </>
        )}

      </div>
    </>
  );
}
