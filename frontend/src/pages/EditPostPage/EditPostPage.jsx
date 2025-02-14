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
import { baseURL } from "../../requestManagement";
import { requestManager } from "../../requestManagement";
import imageCompression from "browser-image-compression";
import TextareaAutosize from "react-textarea-autosize";
import {
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import {
  NotFoundPage,
  LoadingBar
} from "../../components";
import styles from "./EditPostPage.module.css";
export function EditPostPage() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { t } = useTranslation();
  // Post image preview
  const [databaseImageUrl, setDatabaseImageUrl] = useState();
  const [databaseImageUrlEditing, setDatabaseImageUrlEditing] = useState();
  const fileImagePreviewRef = useRef();
  const [fileImagePreviewUrl, setFileImagePreviewUrl] = useState();
  const [fileImagePreview, setFileImagePreview] = useState();
  const [changeImageCheck, setChangeImageCheck] = useState(false);
  // Compressed post image preview
  // Preview image loading and error status
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
  // /Preview image loading and error status
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
      // setFileImagePreviewUrl(URL.createObjectURL(compressedFile)+'.webp')
      setChangeImageCheck(true);
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
  // /Compressed post image preview
  // /Post image preview
  // Title
  const titleRef = useRef();
  const [title, setTitle] = useState("");
  const [titleValueDatabase, setTitleValueDatabase] = useState();
  const [numberCharactersInTitle, setNumberCharactersInTitle] = useState();
  const onChangeTitle = (event) => {
    setNumberCharactersInTitle(event.target.value.length);
    setTitle(event.target.value);
  };
  // /Title
  // Text
  const textRef = useRef();
  const [text, setText] = useState("");
  const [textValueDatabase, setTextValueDatabase] = useState();
  const [numberCharactersInText, setNumberCharactersInText] = useState();
  const onChangeText = (event) => {
    setNumberCharactersInText(event.target.value.length);
    setText(event.target.value);
  };
  // /Text
  useEffect(() => {
    if (titleValueDatabase === title) {
      setNumberCharactersInTitle(undefined);
    }
    if (textValueDatabase === text) {
      setNumberCharactersInText(undefined);
    }
  }, [titleValueDatabase, title, textValueDatabase, text]);
  const onClickChangePost = async () => {
    try {
      const fields = {
        imageUrl: databaseImageUrlEditing,
        text: text,
        postId: postId,
        title: title,
      };
      const formData = new FormData();
      const fileS = fileImagePreview;
      const fileType = `posts/images`;
      formData.append("image", fileS);
      fileImagePreview
        ? await requestManager
          .post("/post/add/image/" + postId, formData, {
            params: {
              fileType,
            },
          })
          .then((response) => {
            const postId = response.data.postId;
            const imageUrl = response.data.url;
            const fields = {
              imageUrl: imageUrl,
              text: text,
              title: title,
            };
            return requestManager.patch("/post/edit/" + postId, fields);
          })
          .then((response) => {
            const postId = response.data.postId;
            queryClient.invalidateQueries({ queryKey: ["Posts"] });
            navigate("/post/" + postId);
          })
        : await requestManager.patch("/post/edit/" + postId, fields);
      navigate("/post/" + postId);
      queryClient.invalidateQueries({ queryKey: ["Posts"] });
    } catch (err) {
      console.warn(err);
    }
  };
  const postDataQuery = useQuery({
    queryKey: ["Posts", "EditPostPage", postId],
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    retry: false,
    queryFn: () =>
      requestManager
        .get("/post/get/one/from/post/edit/page/" + postId)
        .then((response) => {
          return response.data;
        }),
  });
  useEffect(() => {
    setTitle(postDataQuery.data?.title);
    setTitleValueDatabase(postDataQuery.data?.title);
    setText(postDataQuery.data?.text);
    setTextValueDatabase(postDataQuery.data?.text);
    setDatabaseImageUrl(
      postDataQuery.data?.imageUrl && baseURL + postDataQuery.data.imageUrl,
    );
    setFileImagePreviewUrl(
      postDataQuery.data?.imageUrl && baseURL + postDataQuery.data.imageUrl,
    );
    setDatabaseImageUrlEditing(postDataQuery.data?.imageUrl);
  }, [postDataQuery.data]);
  const onClickRemoveImage = () => {
    setDatabaseImageUrl(null);
    setDatabaseImageUrlEditing(null);
    setFileImagePreviewUrl(null);
    setFileImagePreview(null);
    fileImagePreviewRef.current.value = null;
    setChangeImageCheck(true);
  };
  const checkingPostChanges =
    titleValueDatabase !== title ||
    textValueDatabase !== text ||
    changeImageCheck;
  if (postDataQuery.error?.response.data.message === "No access") {
    return <Navigate to="/" />;
  }
  return (
    <div
      className={styles.edit_post}
      data-edit-post-page-dark-theme={darkThemeStatus}
    >
      <div className={styles.title}>
        <h1>{t("EditPostPage.EditPost")}</h1>
      </div>
      {(postDataQuery.error?.response.data.message === "Post not found" ||
        postDataQuery.error) && <NotFoundPage />}
      {postDataQuery.status === "success" && (
        <>
          {(databaseImageUrl || fileImagePreviewUrl) && (
            <div className={styles.image_preview}>
              <img alt="" src={fileImagePreviewUrl || databaseImageUrl} />
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
            {(databaseImageUrl || fileImagePreview) && (
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
                (fileImagePreviewUrl || databaseImageUrl ? "" : "* ") +
                t("AddPostPage.Text")
              }
            />
          </div>
          {numberCharactersInText > 0 && (
            <div className={styles.text_letter_counter}>
              <p>{numberCharactersInText}/75000</p>
            </div>
          )}
          {checkingPostChanges && (
            <div className={styles.publish_post}>
              <button onClick={onClickChangePost}>
                {t("AddPostPage.PublishButton")}
              </button>
            </div>
          )}
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
  );
}
